"use client";
import { createContext, useEffect, useState } from "react";

type State = {
    name: string;
    abbreviation: string;
};

type StateWithCities = {
    state: State;
    cities: string[];
};

type LocalizationContextType = {
    statesWithCities: StateWithCities[];
};

export const LocalizationContext = createContext({} as LocalizationContextType);

export function LocalizationProvider({ children }: any) {
    const [statesWithCities, setStatesWithCities] = useState<StateWithCities[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseStates = await fetch("http://localhost:3000/localization/states", {
                    cache: "no-store",
                });

                if (!responseStates.ok) {
                    throw new Error("Erro na solicitação");
                }

                const responseDataStates = await responseStates.json();
                const states: State[] = responseDataStates.states;

                const promises = states.map(async (state) => {
                    const responseCities = await fetch("http://localhost:3000/localization/city/" + state.name, {
                        cache: "no-store",
                    });

                    if (!responseCities.ok) {
                        throw new Error("Erro na solicitação");
                    }

                    const responseDataCities = await responseCities.json();
                    return responseDataCities as StateWithCities;
                });

                const citiesData = await Promise.all(promises);
                setStatesWithCities(citiesData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <LocalizationContext.Provider value={{ statesWithCities }}>
            {children}
        </LocalizationContext.Provider>
    );
}

