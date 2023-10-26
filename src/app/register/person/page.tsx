"use client";
import Link from "next/link";
import { useState } from "react";

export default function Person() {
    const [email, setEmail] = useState("");
    const [full_name, setFullName] = useState("");
    const [date_birth, setDateBirth] = useState("");
    const [cpf, setCpf] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [form, setForm] = useState({ user: "box", account: "hidden" });

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const url = "http://localhost:3000/person";
        const data = {
            email,
            username,
            name,
            cpf,
            date_birth,
            full_name,
            password,
            city,
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
                const { id } = responseData;
                console.log(id);
            });
    };

    const handleUser = async (e: any) => {
        e.preventDefault();
        setForm({ user: "hidden", account: "box" });
    };

    return (
        <div className="flex flex-col h-screen bg-beige-normal">
            <nav className="bg-darkblue-normal h-20">
                <div className="flex items-center justify-between px-16 lg:px-32 h-20">
                    <Link href="/" className="cursor-pointer">
                        <img
                            src="../../logo-login.svg"
                            alt=""
                            className="w-[75%]"
                        />
                    </Link>
                    <Link href="/login">
                        <p className="text-lighttext-normal text-md font-semibold">
                            Já possui conta?{" "}
                            <span className="text-lime-normal">Entrar</span>
                        </p>
                    </Link>
                </div>
                <div className={`h-2 bg-orangee-normal ${form.user === "box" ? "w-[50%]" : ""}`}></div>
                <a
                    href=""
                    className="flex items-center gap-2 px-14 lg:px-32 py-4"
                >
                    <img src="../../arrow_back.svg" alt="" />
                    <p className="text-lg font-semibold text-gray-700">
                        Cancelar
                    </p>
                </a>
            </nav>
            <main className="grow flex flex-col items-center justify-center">
                <p className="text-2xl lg:text-3xl font-bold mb-8 mt-24">
                    Bem-vindo a Bichos
                </p>
                <div className="grow flex w-full justify-center items-center justify-evenly">
                    <form
                        onSubmit={handleUser}
                        className={`
                            flex flex-col px-4 py-6 bg-lighttext-normal rounded-md justify-center items-center shadow-btn border border-black
                            w-2/6 gap-6
                            ${form.user}
                        `}
                    >
                        <h1 className="w-full text-xl font-bold">
                            Informações
                        </h1>
                        <div className="min-w-full">
                            <input
                                type="text"
                                id="full_name"
                                placeholder="Nome completo"
                                name="full_name"
                                value={full_name}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                                className={`
                                bg-lighttext-normal
                                border-b-2 border-gray-500
                                min-w-full h-12
                                placeholder-gray-700
                                text-md font-semibold
                            `}
                            />
                        </div>
                        <div className="min-w-full">
                            <input
                                type="email"
                                placeholder="E-mail"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className={`
                                bg-lighttext-normal
                                border-b-2 border-gray-500
                                min-w-full h-12
                                placeholder-gray-700
                                text-md font-semibold
                            `}
                            />
                        </div>
                        <div className="w-full flex gap-[4%] ">
                            <div className="min-w-[48%]">
                                <input
                                    type="text"
                                    id="cpf"
                                    placeholder="CPF"
                                    name="cpf"
                                    value={cpf}
                                    onChange={(e) => setCpf(e.target.value)}
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
                            <div className="min-w-[48%]">
                                <input
                                    type="date"
                                    id="date_birth"
                                    placeholder="Data de nascimento"
                                    name="date_birth"
                                    value={date_birth}
                                    onChange={(e) =>
                                        setDateBirth(e.target.value)
                                    }
                                    required
                                    className={`
                                    bg-lighttext-normal
                                    border-b-2 border-gray-500
                                    min-w-full h-12
                                    text-gray-700
                                    text-md font-semibold
                                `}
                                />
                            </div>
                        </div>
                        <div className="w-full flex gap-4">
                            <select
                                id="states"
                                name="state"
                                value={state}
                                required
                                onChange={(e) => setState(e.target.value)}
                                className={`
                                bg-lighttext-normal
                                border-b-2 border-gray-500
                                grow h-12
                                text-gray-700
                                text-md font-semibold
                            `}
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
                            <select
                                id="cities"
                                name="city"
                                value={city}
                                required
                                onChange={(e) => setCity(e.target.value)}
                                className={`
                                bg-lighttext-normal
                                border-b-2 border-gray-500
                                grow h-12
                                text-gray-700
                                text-md font-semibold
                            `}
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
                        onSubmit={handleSubmit}
                        className={`
                            flex flex-col px-4 py-3 bg-lighttext-normal rounded-md justify-center items-center shadow-btn border border-black
                            w-min gap-6
                            ${form.account}
                        `}
                    >
                        <h1 className="w-full text-xl font-bold">
                            Criar conta
                        </h1>
                        <div className="min-w-full">
                            <input
                                type="name"
                                id="name"
                                placeholder="Nome"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className={`
                                bg-lighttext-normal
                                border-b-2 border-gray-500
                                min-w-full h-12
                                placeholder-gray-700
                                text-md font-semibold
                            `}
                            />
                        </div>
                        <div className="min-w-full">
                            <input
                                type="text"
                                placeholder="Nome de usuário"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className={`
                                bg-lighttext-normal
                                border-b-2 border-gray-500
                                min-w-full h-12
                                placeholder-gray-700
                                text-md font-semibold
                            `}
                            />
                        </div>
                        <div className="w-full flex gap-4">
                            <div className="">
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Senha"
                                    name="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                    className={`
                                    bg-lighttext-normal
                                    border-b-2 border-gray-500
                                    grow h-12
                                    placeholder-gray-700
                                    text-md font-semibold
                                `}
                                />
                            </div>

                            <div className="">
                                <input
                                    type="password"
                                    id="passwordConfirm"
                                    placeholder="Confirme a senha"
                                    name="passwordConfirm"
                                    value={passwordConfirm}
                                    onChange={(e) =>
                                        setPasswordConfirm(e.target.value)
                                    }
                                    required
                                    className={`
                                    bg-lighttext-normal
                                    border-b-2 border-gray-500
                                    grow h-12
                                    placeholder-gray-700
                                    text-md font-semibold
                                `}
                                />
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
                    <div className='flex items-center sm:w-[75%] md:w-[30%] h-full'>
                        <img src="../../doggie.svg" alt=""  />
                    </div>
                </div>
            </main>
        </div>
    );
}
