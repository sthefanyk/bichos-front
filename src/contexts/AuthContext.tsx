"use client";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie, parseCookies, destroyCookie } from "nookies";

type User = {
    name: string;
    email: string;
};

type SignInData = {
    email: string;
    password: string;
};

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    signIn: (data: SignInData) => Promise<void>;
	logOut: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState<User | null>(null);
    const isAuthenticated = !!user;
    const { push } = useRouter();

	useEffect( () => {
		const { 'bichos.token': token } = parseCookies();
		me(token);	
	}, []);

	async function me(token: string) {
        const url = "http://localhost:3000/auth/me";

		if (token) {
			fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify({}),
			})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Erro na solicitação");
				}
				return response.json();
			})
			.then((responseData) => {
				const userData = responseData.user;
				setUser({
					email: userData.email,
					name: userData.username
				});

				
			})
		}
    }

    async function signIn({ email, password }: SignInData) {
        const url = "http://localhost:3000/auth/login";
        const data = {
            email,
            password: password,
        };

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
		.then((response) => {
			if (!response.ok) {
				throw new Error("Erro na solicitação");
			}
			return response.json();
		})
		.then((responseData) => {
			console.log("Resposta da API:", responseData);

			const token: string = responseData.accessToken;
			setCookie(undefined, "bichos.token", token, {
				maxAge: 60 * 60 * 1,
			});

			me(token);

			push("/");
		})
		.catch((error) => {
			console.error("Erro:", error);
		});
    }

	function logOut() {
		destroyCookie(undefined, 'bichos.token');
		setUser(null);

		push("/");
	}

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}
