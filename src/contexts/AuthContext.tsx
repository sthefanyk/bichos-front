"use client";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie, parseCookies, destroyCookie } from "nookies";

type User = {
    id: string;
    name: string;
    username: string;
    role: number;
    description: string;
    email: string;
    date_birth: string;
    created_at: Date;
    city: {
        name: string;
        state: {
            name: string;
            abbreviation: string;
        }
    }
    profile_picture: {
        id: string;
        url: string;
    }
};

type SignInData = {
    email: string;
    password: string;
};

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    signIn: (data: SignInData) => Promise<void>;
    errorSignIn: string;
    logOut: () => void;
    getUser: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState<User | null>(null);
    const [errorSignIn, setErrorSignIn] = useState('');
    const isAuthenticated = !!user;
    const { push } = useRouter();

    useEffect(() => {
        const { "bichos.token": token } = parseCookies();
        load(token);
    }, []);

    async function load(token: string){
        await me(token);
        await getUser();
    }

    async function me(token: string) {
        const url = "http://localhost:3000/auth/me";

        if (token) {
            await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Erro na solicitação");
                    }
                    return response.json();
                })
                .then((responseData) => {
                    const data = responseData.user;
                    setUser({...data})
                });
        }
    }

    async function getUser() {
        const { "bichos.token": token } = parseCookies();

        if (user) {
            let roleName = '';

            if(user.role === 1){
                roleName = 'person'
            } else if(user.role === 2){
                roleName = 'shelter'
            }else{
                roleName = 'ngo'
            }
            const url = `http://localhost:3000/${roleName}/${user.id}`;
        
            await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro na solicitação");
                }
                return response.json();
            })
            .then((responseData) => {
                setUser({...responseData});
            });
        }
    }

    async function signIn({ email, password }: SignInData) {
		const url = "http://localhost:3000/auth/login";
		const data = {
			email,
			password,
		};
	
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
	
		const responseData = await response.json();
	
		console.log("Resposta da API:", responseData.message);
	
		if (responseData.error && typeof responseData.message === "string") {
			setErrorSignIn(responseData.message);
		} else if (responseData.error) {
			const values: any[] = Object.values(responseData.message);
			for (const value of values) {
				if (value[0]) {
					setErrorSignIn(value[0]);
				}
			}
		} else {
			const token: string = responseData.accessToken;
			setCookie(undefined, "bichos.token", token, {
				maxAge: 60 * 60 * 1,
			});
	
			// Atualizar o estado de errorSignIn antes de usar push
			setErrorSignIn("");
	
			await load(token);
	
			push("/");
		}
	}

    function logOut() {
        destroyCookie(undefined, "bichos.token");
        setUser(null);

        push("/");
    }

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated, signIn, errorSignIn, logOut, getUser }}
        >
            {children}
        </AuthContext.Provider>
    );
}
