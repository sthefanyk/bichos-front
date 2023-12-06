"use client";
import Link from "next/link";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const createNGOSchema = z.object({
    email: z
        .string()
        .min(1, "Por favor, insira o e-mail.")
        .email("E-mail inválido."),
    full_name: z.string().min(1, "Por favor, insira o nome completo."),
    date_birth: z
        .string()
        .refine(
            (date) => date !== "",
            "Por favor, insira a data de nascimento."
        )
        .refine(
            (date) => new Date(date) < new Date(),
            "Por favor, insira uma data válida."
        ),
    cpf: z.string().min(11, "Por favor, insira o cpf."),
    state: z.string().min(1, "Por favor, informe o estado."),
    city: z.string().min(1, "Por favor, informe a cidade."),
});

const createUserSchema = z
    .object({
        name: z.string().min(1, "Por favor, insira o nickname."),
        username: z.string().min(1, "Por favor, insira o username."),
        password: z.string().min(1, "Por favor, insira a senha."),
        passwordConfirm: z.string().min(1, "Por favor, confirme a senha."),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: "As senhas não coincidem.",
        path: ["passwordConfirm"],
    });

type CreateNGOData = z.infer<typeof createNGOSchema>;
type CreateUserData = z.infer<typeof createUserSchema>;

export default function NGOPage() {
    const ngo = useForm<CreateNGOData>({
        resolver: zodResolver(createNGOSchema),
    });

    const user = useForm<CreateUserData>({
        resolver: zodResolver(createUserSchema),
    });

    const [form, setForm] = useState({ user: "box", account: "hidden" });
    const [ngoData, setNGOData] = useState({});

    const createUser = (data: CreateUserData) => {
        console.log({ ...data, ...ngoData });

        const url = `${process.env.NEXT_PUBLIC_URL_API}/ngo`;
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...data, ...ngoData }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro na solicitação");
                }
                return response.json();
            })
            .then((responseData) => {
                const { id } = responseData;
                console.log(id);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const handleUser = (data: CreateNGOData) => {
        setNGOData(data);
        setForm({ user: "hidden", account: "box" });
    };

    return (<div>
        {
            form.user === "box" ? (
                <Link
                    href="/register"
                    className="absolute flex gap-2 py-2 pr-2 mt-4 lg:ml-32 ml-14"
                >
                    <img src="../../arrow_back.svg" alt="" />
                    <p className="text-lg font-semibold text-gray-700">
                        Voltar
                    </p>
                </Link>
            ) : (
                <button
                    className="absolute flex gap-2 py-2 pr-2 mt-4 lg:ml-32 ml-14"
                    onClick={() => setForm({ user: "box", account: "hidden" })}
                >
                    <img src="../../arrow_back.svg" alt="" />
                    <p className="text-lg font-semibold text-gray-700">
                        Voltar
                    </p>
                </button>
            )
        }
        <div className={`h-2 bg-orangee-normal ${form.user === "box" ? "w-[50%]" : ""}`}></div>
        <main className="grow flex flex-col items-center justify-center">
            <p className="text-2xl lg:text-3xl font-bold mb-8 mt-24">
                Bem-vindo a Bichos
            </p>
            <div className="grow flex w-full justify-center items-center justify-evenly">
                <form
                    onSubmit={ngo.handleSubmit(handleUser)}
                    className={`
                            flex flex-col px-4 py-6 bg-lighttext-normal rounded-md justify-center items-center shadow-btn border border-black
                            w-2/6 gap-6
                            ${form.user}
                        `}
                >
                    <h1 className="w-full text-xl font-bold">Informações</h1>
                    <div className="min-w-full">
                        <input
                            type="text"
                            placeholder="Nome completo"
                            className={`
                                    bg-lighttext-normal
                                    border-b-2 border-gray-500
                                    min-w-full h-12
                                    placeholder-gray-700
                                    text-md font-semibold
                                `}
                            {...ngo.register("full_name")}
                        />
                        {ngo.formState.errors.full_name && (
                            <span className="text-sm text-red-600">
                                {ngo.formState.errors.full_name.message}
                            </span>
                        )}
                    </div>
                    <div className="min-w-full">
                        <input
                            type="email"
                            placeholder="E-mail"
                            className={`
                                    bg-lighttext-normal
                                    border-b-2 border-gray-500
                                    min-w-full h-12
                                    placeholder-gray-700
                                    text-md font-semibold
                                `}
                            {...ngo.register("email")}
                        />
                        {ngo.formState.errors.email && (
                            <span className="text-sm text-red-600">
                                {ngo.formState.errors.email.message}
                            </span>
                        )}
                    </div>
                    <div className="w-full flex gap-[4%] ">
                        <div className="min-w-[48%]">
                            <input
                                type="text"
                                placeholder="CPF"
                                className={`
                                        bg-lighttext-normal
                                        border-b-2 border-gray-500
                                        w-full h-12
                                        placeholder-gray-700
                                        text-md font-semibold
                                    `}
                                {...ngo.register("cpf")}
                            />
                            {ngo.formState.errors.cpf && (
                                <span className="text-sm text-red-600">
                                    {ngo.formState.errors.cpf.message}
                                </span>
                            )}
                        </div>
                        <div className="min-w-[48%]">
                            <input
                                type="date"
                                placeholder="Data de nascimento"
                                className={`
                                        bg-lighttext-normal
                                        border-b-2 border-gray-500
                                        min-w-full h-12
                                        text-gray-700
                                        text-md font-semibold
                                    `}
                                {...ngo.register("date_birth")}
                            />
                            {ngo.formState.errors.date_birth && (
                                <span className="text-sm text-red-600">
                                    {
                                        ngo.formState.errors.date_birth
                                            .message
                                    }
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="w-full flex gap-4">
                        <select
                            defaultValue=""
                            className={`
                                    bg-lighttext-normal
                                    border-b-2 border-gray-500
                                    grow h-12
                                    text-gray-700
                                    text-md font-semibold
                                `}
                            {...ngo.register("state")}
                        >
                            <option key="" value="" disabled>
                                Estado
                            </option>
                            <option key="Paraná" value="Paraná">
                                Paraná
                            </option>
                            <option key="São Paulo" value="São Paulo">
                                São Paulo
                            </option>
                        </select>
                        {ngo.formState.errors.state && (
                            <span className="text-sm text-red-600">
                                {ngo.formState.errors.state.message}
                            </span>
                        )}
                        <select
                            defaultValue=""
                            className={`
                                    bg-lighttext-normal
                                    border-b-2 border-gray-500
                                    grow h-12
                                    text-gray-700
                                    text-md font-semibold
                                `}
                            {...ngo.register("city")}
                        >
                            <option key="" value="" disabled>
                                Cidade
                            </option>
                            <option key="Paranaguá" value="Paranaguá">
                                Paranaguá
                            </option>
                            <option key="Curitiba" value="Curitiba">
                                Curitiba
                            </option>
                            <option key="Matinhos" value="Matinhos">
                                Matinhos
                            </option>
                            <option key="Antônina" value="Antônina">
                                Antônina
                            </option>
                        </select>
                        {ngo.formState.errors.city && (
                            <span className="text-sm text-red-600">
                                {ngo.formState.errors.city.message}
                            </span>
                        )}
                    </div>
                    <div className="w-full">
                        <button
                            type="submit"
                            className={`
                                    inline-flex w-full px-8 py-3 h-12 bg-orangee-normal rounded-md justify-center items-center shadow-btn border border-darktext-normal
                                    text-md font-semibold text-lighttext-normal
                                `}
                        >
                            Continuar
                        </button>
                    </div>
                </form>

                <form
                    onSubmit={user.handleSubmit(createUser)}
                    className={`
                            flex flex-col px-4 py-3 bg-lighttext-normal rounded-md justify-center items-center shadow-btn border border-black
                            w-min gap-6
                            ${form.account}
                        `}
                >
                    <h1 className="w-full text-xl font-bold">Criar conta</h1>
                    <div className="min-w-full">
                        <input
                            type="text"
                            placeholder="Nome"
                            className={`
                                    bg-lighttext-normal
                                    border-b-2 border-gray-500
                                    min-w-full h-12
                                    placeholder-gray-700
                                    text-md font-semibold
                                `}
                            {...user.register("name")}
                        />
                        {user.formState.errors.name && (
                            <span className="text-sm text-red-600">
                                {user.formState.errors.name.message}
                            </span>
                        )}
                    </div>
                    <div className="min-w-full">
                        <input
                            type="text"
                            placeholder="Nome de usuário"
                            className={`
                                    bg-lighttext-normal
                                    border-b-2 border-gray-500
                                    min-w-full h-12
                                    placeholder-gray-700
                                    text-md font-semibold
                                `}
                            {...user.register("username")}
                        />
                        {user.formState.errors.username && (
                            <span className="text-sm text-red-600">
                                {user.formState.errors.username.message}
                            </span>
                        )}
                    </div>
                    <div className="w-full flex gap-4">
                        <div className="">
                            <input
                                type="password"
                                placeholder="Senha"
                                className={`
                                        bg-lighttext-normal
                                        border-b-2 border-gray-500
                                        grow h-12
                                        placeholder-gray-700
                                        text-md font-semibold
                                    `}
                                {...user.register("password")}
                            />
                            {user.formState.errors.password && (
                                <span className="text-sm text-red-600">
                                    {user.formState.errors.password.message}
                                </span>
                            )}
                        </div>

                        <div className="">
                            <input
                                type="password"
                                placeholder="Confirme a senha"
                                className={`
                                        bg-lighttext-normal
                                        border-b-2 border-gray-500
                                        grow h-12
                                        placeholder-gray-700
                                        text-md font-semibold
                                    `}
                                {...user.register("passwordConfirm")}
                            />
                            {user.formState.errors.passwordConfirm && (
                                <span className="text-sm text-red-600">
                                    {
                                        user.formState.errors.passwordConfirm
                                            .message
                                    }
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="w-full">
                        <button
                            type="submit"
                            className={`
                            inline-flex w-full px-8 py-3 h-12 bg-orangee-normal rounded-md justify-center items-center shadow-btn border border-darktext-normal
                            text-md font-semibold text-lighttext-normal
                        `}
                        >
                            Criar conta
                        </button>
                    </div>
                </form>
                <div className="flex items-center sm:w-[75%] md:w-[30%] h-full">
                    <img src="../../doggie.svg" alt="" />
                </div>
            </div>
        </main>
    </div>);
}
