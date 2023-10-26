"use client";

import { useState } from "react";


import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Filter = ({handleFilter} : any) => {
    const [isOpenModalFilter, setIsOpenModalFilter] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm();

    const filter = (data: any) => {
        handleFilter(data);
        setIsOpenModalFilter((isOpen) => !isOpen);
    };

    const selectedType = watch("type");

    return (
        <>
            <div
                className="relative inline-flex max-w-max px-8 py-3 h-12 bg-darkblue-normal rounded-md justify-center items-center shadow-btn border border-darktext-normal"
                onClick={() => setIsOpenModalFilter((isOpen) => !isOpen)}
            >
                <span className="text-lg lg:text-xl font-semibold text-lighttext-normal shadow-sm">
                    Filtrar
                </span>

                {isOpenModalFilter && (
                    <form
                        onClick={() =>
                            setIsOpenModalFilter((isOpen) => !isOpen)
                        }
                        onSubmit={handleSubmit(filter)}
                        className="absolute flex flex-col gap-2 right-0 top-full z-51 bg-white p-3 mt-4 rounded-lg w-[250px] border border-darkblue-normal"
                    >
                        <div className="flex flex-col gap-2">
                            <p className="text-md font-semibold">Tipo: </p>
                            <div className="flex gap-2">
                                <label
                                    className={`grow flex justify-center border border-black rounded-md p-2 h-10 w-10 cursor-pointer ${selectedType === "dog" ? "bg-lime-normal" : ""}`}
                                >
                                    <input
                                        {...register("type")}
                                        type="radio"
                                        value="dog"
                                        className="sr-only"
                                    />
                                    C
                                </label>
                                <label
                                    className={`grow flex justify-center border border-black rounded-md p-2 h-10 w-10 cursor-pointer ${selectedType === "cat" ? "bg-lime-normal" : ""}`}
                                >
                                    <input
                                        {...register("type")}
                                        type="radio"
                                        value="cat"
                                        className="sr-only"
                                    />
                                    G
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="text-md font-semibold">Nome: </p>
                            <input
                                type="text"
                                placeholder="Nome do bicho"
                                className={`
                                    resize-none border border-black rounded-md bg-white
                                    p-2 h-10
                                    focus:outline-none focus:ring-2 focus:border-lightblue-normal focus:ring-lightblue-normal
                                `}
                                {...register("name_animal")}
                            />
                        </div>

                        <div className="flex gap-2 justify-between">
                            <button type="button"
                                className="relative inline-flex px-3 py-2 grow bg-darkblue-normal rounded-md justify-center items-center shadow-btn border border-black"
                                onClick={() => reset()}
                            >
                                <span className="text-sm lg:text-md font-semibold text-lighttext-normal shadow-sm">
                                    Limpar
                                </span>
                            </button>

                            <button type="submit"
                                className="relative inline-flex px-3 py-2 grow bg-darkblue-normal rounded-md justify-center items-center shadow-btn border border-black"
                            >
                                <span className="text-sm lg:text-md font-semibold text-lighttext-normal shadow-sm">
                                    Aplicar
                                </span>
                            </button>
                        </div>

                        
                    </form>
                )}
            </div>
        </>
    );
};

export default Filter;
