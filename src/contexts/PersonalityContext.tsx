"use client";
import { createContext, useEffect, useState } from "react";

type Personality = {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
};

type PersonalityContextType = {
    personalitiesData: Personality[];
};

export const PersonalityContext = createContext({} as PersonalityContextType);

export function PersonalityProvider({ children }: any) {
    const [personalitiesData, setPersonalities] = useState<Personality[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/personality/active", {
                    cache: "no-store",
                });

                if (!response.ok) {
                    throw new Error("Erro na solicitação");
                }

                const responseDataPersonalities = await response.json();
                const personalities: Personality[] = responseDataPersonalities.data;

                setPersonalities(personalities);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <PersonalityContext.Provider value={{ personalitiesData }}>
            {children}
        </PersonalityContext.Provider>
    );
}

