"use client";
import Button from "@/components/Button";
import Link from "next/link";
import React from "react";

const Register = () => {
    const handle = (event: any) => {
        console.log(event.target.name);
    };

    return (
        <div className="flex flex-col h-screen bg-beige-normal">
            <div className="h-2 bg-orangee-normal w-[30%]"></div>
            <Link
                href="/"
                className="absolute flex gap-2 py-2 pr-2 mt-4 lg:ml-32 ml-14"
            >
                <img src="../../arrow_back.svg" alt="" />
                <p className="text-lg font-semibold text-gray-700">
                    Cancelar
                </p>
            </Link>
            <main className="grow flex flex-col gap-8 items-center justify-center">
                <p className="text-2xl lg:text-3xl font-bold ">Quem é você?</p>
                <div className="flex justify-center sm:w-[75%] md:w-[60%] ">
                    <img src="doguinho nerd 2.svg" alt="" />
                </div>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 w-[80%] md:w-[95%] lg:w-[75%] xl:w-[60%] place-items-center">
                    <Link
                        href="/register/person"
                        className="inline-flex w-full px-8 py-3 h-20 xl:h-[80px] bg-lighttext-normal rounded-md justify-center items-center shadow-btn-orange border border-orangee-normal"
                    >
                        <span className="text-center text-md font-semibold text-orangee-normal">
                            Pessoa física
                        </span>
                    </Link>
                    <Link
                        href="/register/shelter"
                        className="inline-flex w-full px-8 py-3 h-20 xl:h-[80px] bg-lighttext-normal rounded-md justify-center items-center shadow-btn-orange border border-orangee-normal"
                    >
                        <span className="text-center text-md font-semibold text-orangee-normal">
                            Abrigo de animais
                        </span>
                    </Link>
                    <Link
                        href="/register/ngo"
                        className="inline-flex w-full px-8 py-3 h-20 xl:h-[80px] bg-lighttext-normal rounded-md justify-center items-center shadow-btn-orange border border-orangee-normal"
                    >
                        <span className="text-center text-md font-semibold text-orangee-normal">
                            ONG
                        </span>
                    </Link>
                </ul>
            </main>
        </div>
    );
};

export default Register;
