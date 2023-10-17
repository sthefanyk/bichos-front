"use client";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import Link from "next/link";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { signIn } = useContext(AuthContext);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await signIn({ email, password });
    };

    return (
        <div className="flex flex-col h-screen bg-beige-normal">
            <nav className="bg-darkblue-normal h-20">
                <div className="flex items-center justify-between px-16 lg:px-32 h-20">
                    <Link href="/" className="cursor-pointer">
                        <img
                            src="../logo-login.svg"
                            alt=""
                            className="w-[75%]"
                        />
                    </Link>
                    <Link href="/register">
                        <p className="text-lighttext-normal text-md font-semibold">
                            Não possui conta?{" "}
                            <span className="text-lime-normal">
                                Cadastre-se
                            </span>
                        </p>
                    </Link>
                </div>
                <div className="h-2 bg-orangee-normal"></div>
                <Link
                    href="/"
                    className="flex items-center gap-2 px-14 lg:px-32 py-4"
                >
                    <img src="../arrow_back.svg" alt="" />
                    <p className="text-lg font-semibold text-gray-700">
                        Cancelar
                    </p>
                </Link>
            </nav>
            <main className="grow flex flex-col items-center justify-center w-screen ">
                <p className="text-2xl lg:text-3xl font-bold mb-8 mt-24">
                    É bom te ver de novo!
                </p>
                <div className="grow flex w-full justify-center items-center justify-evenly">
                    <div className="flex flex-col w-1/4 gap-2">
                        <form
                            onSubmit={handleSubmit}
                            className={`
                                flex flex-col px-4 py-3 bg-lighttext-normal rounded-md justify-center items-center shadow-btn border border-black
                                gap-6 h-min
                            `}
                        >
                            <h1 className="w-full text-xl font-bold">Entrar</h1>
                            <div className="min-w-full">
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="E-mail"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className={`
                                    bg-lighttext-normal
                                    border-b-2 border-gray-500
                                    w-full h-12
                                    placeholder-gray-700
                                    text-md font-semibold
                                `}
                                />
                            </div>
                            <div className="min-w-full">
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Senha"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className={`
                                    bg-lighttext-normal
                                    border-b-2 border-gray-500
                                    w-full h-12
                                    placeholder-gray-700
                                    text-md font-semibold
                                `}
                                />
                            </div>
                            <div className="w-full">
                                <button
                                    type="submit"
                                    className={`
                                inline-flex w-full px-8 py-3 h-12 bg-orangee-normal rounded-md justify-center items-center shadow-btn border border-darktext-normal
                                text-md font-semibold text-lighttext-normal
                            `}
                                >
                                    Entrar
                                </button>
                            </div>
                        </form>
                        <p className="ml-2 text-darkblue-normal text-md font-semibold">Esqueceu a senha?</p>
                    </div>
                    <div className='flex items-end sm:w-[75%] md:w-[30%] h-full'>
                        <img src="dog_login.svg" alt=""  />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Login;
