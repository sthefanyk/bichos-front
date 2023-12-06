"use client";
import { createContext, useEffect, useState } from "react";

type Breed = {
    id: string;
    name: string;
    specie: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
};

type BreedContextType = {
    breeds: Breed[];
};

export const BreedContext = createContext({} as BreedContextType);

export function BreedProvider({ children }: any) {
    const [breeds, setBreeds] = useState<Breed[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/breed`, {
                    cache: "no-store",
                });

                if (!response.ok) {
                    throw new Error("Erro na solicitação");
                }

                const responseDataBreeds = await response.json();
                const breedsData: Breed[] = responseDataBreeds.data;

                setBreeds(breedsData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <BreedContext.Provider value={{ breeds }}>
            {children}
        </BreedContext.Provider>
    );
}

