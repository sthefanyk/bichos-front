"use client";
import Link from "next/link";
import { useContext, useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BsCaretDownFill } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { LocalizationContext } from "@/contexts/LocalizationContext";
import { AuthContext } from "@/contexts/AuthContext";

const createPersonSchema = z.object({
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

type CreatePersonData = z.infer<typeof createPersonSchema>;
type CreateUserData = z.infer<typeof createUserSchema>;

export default function PersonPage() {
    const person = useForm<CreatePersonData>({
        resolver: zodResolver(createPersonSchema),
    });

    const user = useForm<CreateUserData>({
        resolver: zodResolver(createUserSchema),
    });

    const [form, setForm] = useState({ user: "box", account: "hidden" });
    const [personData, setPersonData] = useState({});
    const [error, setError] = useState('');
    const { statesWithCities } = useContext(LocalizationContext);
    const { addToken } = useContext(AuthContext);

    const selectedState = person.watch("state");

    const createUser = async (data: CreateUserData) => {
        console.log({ ...data, ...personData });

        const url = `${process.env.NEXT_PUBLIC_URL_API}/person`;
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...data, ...personData, profile_picture: "45c43add-a624-4746-8ae5-eb0b166cd1e6" }),
        })
        .then((response) => {
            if (!response.ok) {
                // throw new Error("Erro na solicitação");
            }
            return response.json();
        })
        .then((responseData) => {
            console.log(responseData);
            
            if (responseData.error && typeof responseData.message === "string") {
                setError(responseData.message);
            }else if(responseData.error){
                const values: any[] = Object.values(responseData.message);
                for (const value of values) {
                    if(value[0]){
                        setError(value[0]);
                    }
                }
            }else{
                const token: string = responseData.accessToken;
                login(token);
            }
        });
    };
    
    const login = async (token: string) => {
        await addToken(token);
    };

    const handleUser = (data: CreatePersonData) => {
        setPersonData(data);
        setForm({ user: "hidden", account: "box" });
    };

    return (<div className="relative">
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
            <p className="text-2xl lg:text-3xl font-bold mb-8 mt-14">
                Bem-vindo a Bichos
            </p>
            <div className="grow flex w-full justify-center items-center justify-evenly">
                <form
                    onSubmit={person.handleSubmit(handleUser)}
                    className={`
                            flex flex-col px-4 py-6 bg-lighttext-normal rounded-md justify-center items-center shadow-btn border border-black
                            w-2/6 gap-2
                            ${form.user}
                        `}
                >
                    <h1 className="w-full text-xl font-bold">Informações</h1>
                    <div className="min-w-full">
                        <label className="text-xs text-gray-600 font-bold">Nome completo</label>
                        <input
                            type="text"
                            placeholder="Digite seu nome completo"
                            className={`
                                bg-lighttext-normal
                                border-b-2 border-gray-500
                                min-w-full h-10 p-2
                                placeholder-gray-500
                                text-md font-semibold
                                resize-none
                                focus:outline-none focus:ring-b-2 focus:border-lightblue-normal focus:ring-lightblue-normal
                            `}
                            {...person.register("full_name")}
                        />
                        {person.formState.errors.full_name && (
                            <span className="text-xs text-red-600 font-semibold">
                                {person.formState.errors.full_name.message}
                            </span>
                        )}
                    </div>
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
                            {...person.register("email")}
                        />
                        {person.formState.errors.email && (
                            <span className="text-xs text-red-600 font-semibold">
                                {person.formState.errors.email.message}
                            </span>
                        )}
                    </div>
                    <div className="w-full flex gap-[4%] ">
                        <div className="min-w-[48%]">
                            <label className="text-xs text-gray-600 font-bold">CPF</label>
                            <input
                                type="text"
                                placeholder="000.000.000-00"
                                className={`
                                    bg-lighttext-normal
                                    border-b-2 border-gray-500
                                    min-w-full h-10 p-2
                                    placeholder-gray-500
                                    text-md font-semibold
                                    resize-none
                                    focus:outline-none focus:ring-b-2 focus:border-lightblue-normal focus:ring-lightblue-normal
                                `}
                                {...person.register("cpf")}
                            />
                            {person.formState.errors.cpf && (
                                <span className="text-xs text-red-600 font-semibold">
                                    {person.formState.errors.cpf.message}
                                </span>
                            )}
                        </div>
                        <div className="min-w-[48%]">
                            <label className="text-xs text-gray-600 font-bold">Data de nascimento</label>
                            <input
                                type="date"
                                placeholder="Data de nascimento"
                                className={`
                                    bg-lighttext-normal
                                    border-b-2 border-gray-500
                                    min-w-full h-10 p-2
                                    placeholder-gray-500
                                    text-md font-semibold
                                    resize-none
                                    focus:outline-none focus:ring-b-2 focus:border-lightblue-normal focus:ring-lightblue-normal
                                `}
                                {...person.register("date_birth")}
                            />
                            {person.formState.errors.date_birth && (
                                <span className="text-xs text-red-600 font-semibold">
                                    {
                                        person.formState.errors.date_birth
                                            .message
                                    }
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="w-full flex gap-4">
                        <div className="flex flex-col w-full">
                            <label className="text-xs text-gray-600 font-bold">Estado</label>
                            <div className="relative inline-flex items-center grow">
                                <select
                                    defaultValue=""
                                    className={`
                                        appearance-none
                                        bg-lighttext-normal border-b-2 border-gray-500 placeholder-gray-500
                                        text-md font-semibold
                                        resize-none leading-tight
                                        h-10 py-2 px-4 pr-8
                                        focus:outline-none focus:ring-b-2 focus:border-lightblue-normal focus:ring-lightblue-normal
                                        peer grow
                                    `}
                                    {...person.register("state")}
                                >
                                    <option key="" value="" disabled>
                                        Estado
                                    </option>
                                    {
                                        statesWithCities.map((state) => (
                                            <option key={state.state.name} value={state.state.name}>
                                                {state.state.name}
                                            </option>
                                        ))
                                    }
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 peer-focus:text-lightblue-normal">
                                    <BsCaretDownFill className="w-4" />
                                </div>
                            </div>
                            {person.formState.errors.state && (
                                <span className="text-xs text-red-600 font-semibold">
                                    {person.formState.errors.state.message}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="text-xs text-gray-600 font-bold">Cidade</label>
                            <div className="relative inline-flex items-center grow">
                                <select
                                    defaultValue=""
                                    className={`
                                        appearance-none
                                        bg-lighttext-normal border-b-2 border-gray-500 placeholder-gray-500
                                        text-md font-semibold
                                        resize-none leading-tight
                                        h-10 py-2 px-4 pr-8
                                        focus:outline-none focus:ring-b-2 focus:border-lightblue-normal focus:ring-lightblue-normal
                                        peer grow
                                    `}
                                    {...person.register("city")}
                                    disabled={selectedState === ''}
                                >
                                    <option key="" value="" disabled>Cidade</option>
                                    {
                                        statesWithCities.map((state) => {
                                            if(state.state.name === selectedState){
                                                return state.cities.map((city) => (
                                                    <option key={city} value={city}>
                                                        {city}
                                                    </option>
                                                ))
                                            }
                                            return null;
                                        })
                                    }
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 peer-focus:text-lightblue-normal">
                                    <BsCaretDownFill className="w-4" />
                                </div>
                            </div>
                            {person.formState.errors.city && (
                                <span className="text-xs text-red-600 font-semibold">
                                    {person.formState.errors.city.message}
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
                            Continuar
                        </button>
                    </div>
                </form>

                <form
                    onSubmit={user.handleSubmit(createUser)}
                    className={`
                            flex flex-col px-4 py-3 bg-lighttext-normal rounded-md justify-center items-center shadow-btn border border-black
                            w-min gap-6 mt-6
                            ${form.account}
                        `}
                >
                    <h1 className="w-full text-xl font-bold">Criar conta</h1>
                    <div className="min-w-full">
                        <label className="text-xs text-gray-600 font-bold">Nickname</label>
                        <input
                            type="text"
                            placeholder="Nome"
                            className={`
                                bg-lighttext-normal
                                border-b-2 border-gray-500
                                min-w-full h-10 p-2
                                placeholder-gray-500
                                text-md font-semibold
                                resize-none
                                focus:outline-none focus:ring-b-2 focus:border-lightblue-normal focus:ring-lightblue-normal
                            `}
                            {...user.register("name")}
                        />
                        {user.formState.errors.name && (
                            <span className="text-xs text-red-600 font-semibold">
                                {user.formState.errors.name.message}
                            </span>
                        )}
                    </div>
                    <div className="min-w-full">
                        <label className="text-xs text-gray-600 font-bold">Username</label>
                        <input
                            type="text"
                            placeholder="Nome de usuário"
                            className={`
                                bg-lighttext-normal
                                border-b-2 border-gray-500
                                min-w-full h-10 p-2
                                placeholder-gray-500
                                text-md font-semibold
                                resize-none
                                focus:outline-none focus:ring-b-2 focus:border-lightblue-normal focus:ring-lightblue-normal
                            `}
                            {...user.register("username")}
                        />
                        {user.formState.errors.username && (
                            <span className="text-xs text-red-600 font-semibold">
                                {user.formState.errors.username.message}
                            </span>
                        )}
                    </div>
                    <div className="w-full flex gap-4">
                        <div className="">
                            <label className="text-xs text-gray-600 font-bold">Senha</label>
                            <input
                                type="password"
                                placeholder="Senha"
                                className={`
                                    bg-lighttext-normal
                                    border-b-2 border-gray-500
                                    min-w-full h-10 p-2
                                    placeholder-gray-500
                                    text-md font-semibold
                                    resize-none
                                    focus:outline-none focus:ring-b-2 focus:border-lightblue-normal focus:ring-lightblue-normal
                                `}
                                {...user.register("password")}
                            />
                            {user.formState.errors.password && (
                                <span className="text-xs text-red-600 font-semibold">
                                    {user.formState.errors.password.message}
                                </span>
                            )}
                        </div>

                        <div className="">
                            <label className="text-xs text-gray-600 font-bold">Confirmar senha</label>
                            <input
                                type="password"
                                placeholder="Confirme a senha"
                                className={`
                                    bg-lighttext-normal
                                    border-b-2 border-gray-500
                                    min-w-full h-10 p-2
                                    placeholder-gray-500
                                    text-md font-semibold
                                    resize-none
                                    focus:outline-none focus:ring-b-2 focus:border-lightblue-normal focus:ring-lightblue-normal
                                `}
                                {...user.register("passwordConfirm")}
                            />
                            {user.formState.errors.passwordConfirm && (
                                <span className="text-xs text-red-600 font-semibold">
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
                                text-md font-semibold text-lighttext-normal disabled:shadow-btn-disable disabled:bg-orange-400
                            `}
                            disabled={user.formState.isSubmitting}
                        >
                            {user.formState.isSubmitting ? "Criando...": 'Criar conta'}
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
