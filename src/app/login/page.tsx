"use client";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiOutlineCloseCircle } from "react-icons/ai";

const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Por favor, insira o e-mail.")
        .email("E-mail inválido."),
    password: z.string().min(1, "Por favor, insira a senha.")
});

type LoginData = z.infer<typeof loginSchema>;

const Login = () => {

    const { 
        register, 
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
    });

    const { push } = useRouter();
    const { signIn, errorSignIn } = useContext(AuthContext);
    const [error, setError] = useState('Senha incorreta!');

    const login = async (data: LoginData) => {
        await signIn(data);
        console.log("error",errorSignIn);
        setError(errorSignIn);
    };

    return (
        <div className="relative flex flex-col h-screen bg-beige-normal">
            <nav className="bg-darkblue-normal h-20">
                <div className="flex items-center justify-between px-16 lg:px-32 h-20">
                    <Link href="/" className="cursor-pointer">
                        <picture>
                            <img
                                src="../logo-login.svg"
                                alt=""
                                className="w-[75%]"
                            />
                        </picture>
                    </Link>
                    <Link href="/register">
                        <p className="text-lighttext-normal text-md font-semibold">
                            Não possui conta?{" "}
                            <span className="text-lime-normal hover:text-white">
                                Cadastre-se
                            </span>
                        </p>
                    </Link>
                </div>
                <div className="h-2 bg-orangee-normal"></div>
            </nav>
            
            <main className="relative grow flex flex-col items-center justify-center w-screen ">
                <Link
                    href="/"
                    className="absolute top-4 left-0 flex gap-2 py-2 pr-2 lg:ml-32 ml-14"
                >
                    {/* <IoIosArrowBack /> */}
                    <img src="../../arrow_back.svg" alt="" />
                    <p className="text-lg font-semibold text-gray-700">
                        Cancelar
                    </p>
                </Link>
                {error && (
                    <div className="absolute top-4 right-2 px-4 py-2 border-2 rounded-lg border-red-600 bg-red-600 bg-opacity-30 flex gap-2 items-center">
                        <span className="text-md text-red-600 font-semibold">
                            {error}
                        </span>
                        <button onClick={() => setError('')}>
                            <AiOutlineCloseCircle className="text-red-600 w-6 h-6"/>
                        </button>
                    </div>
                )}
                <p className="text-2xl lg:text-3xl font-bold mb-8 mt-24">
                    É bom te ver de novo!
                </p>
                <div className="grow flex w-full items-center justify-evenly">
                    <div className="flex flex-col w-1/4 gap-2">
                        <form
                            onSubmit={handleSubmit(login)}
                            className={`
                                flex flex-col px-4 py-3 bg-lighttext-normal rounded-md justify-center items-center shadow-btn border border-black
                                gap-6 h-min
                            `}
                        >
                            <h1 className="w-full text-xl font-bold">Entrar</h1>
                            <div className="min-w-full">
                                <label className="text-xs text-gray-600 font-bold">E-mail</label>
                                <input
                                    type="email"
                                    placeholder="Digite o e-mail"
                                    className={`
                                        bg-lighttext-normal
                                        border-b-2 border-gray-500
                                        min-w-full h-10 p-2
                                        placeholder-gray-500
                                        text-md font-semibold
                                        resize-none
                                        focus:outline-none focus:ring-b-2 focus:border-lightblue-normal focus:ring-lightblue-normal
                                    `}
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <span className="text-xs text-red-600 font-semibold">
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>
                            <div className="min-w-full">
                                <label className="text-xs text-gray-600 font-bold">Senha</label>
                                <input
                                    type="password"
                                    placeholder="Digite a senha"
                                    className={`
                                        bg-lighttext-normal
                                        border-b-2 border-gray-500
                                        min-w-full h-10 p-2
                                        placeholder-gray-500
                                        text-md font-semibold
                                        resize-none
                                        focus:outline-none focus:ring-b-2 focus:border-lightblue-normal focus:ring-lightblue-normal
                                    `}
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <span className="text-xs text-red-600 font-semibold">
                                        {errors.password.message}
                                    </span>
                                )}
                            </div>
                            <div className="w-full">
                                <button
                                    type="submit"
                                    className={`
                                        inline-flex w-full px-8 py-3 h-12 bg-orangee-normal rounded-md justify-center items-center shadow-btn border border-darktext-normal
                                        text-md font-semibold text-lighttext-normal disabled:shadow-btn-disable disabled:bg-orange-400
                                    `}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Entrando...": 'Entrar'}
                                </button>
                            </div>
                        </form>
                        <p className="ml-2 text-darkblue-normal text-md font-semibold">Esqueceu a senha?</p>
                    </div>
                    <div className='flex items-end sm:w-[75%] md:w-[30%] h-full'>
                        <picture>
                            <img src="dog_login.svg" alt=""  />
                        </picture>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Login;
