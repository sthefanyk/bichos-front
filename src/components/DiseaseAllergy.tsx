"use client";
import { useState } from "react";
import { AiOutlineCloseCircle, AiOutlinePlus } from "react-icons/ai";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

interface DiseaseAllergyProps {
    name: string;
    description: string;
    type: string;
}

interface DiseaseAllergy {
    diseaseAllergy: DiseaseAllergyProps[];
    setDiseaseAllergy: any;
}

const createDiseaseAllergyFormSchema = z.object({
    name: z.string().min(1, 'Por favor, insira o nome.'),
    description: z.string().min(1, 'Por favor, insira a descrição.'),
    type: z.string().min(1, 'Por favor, informe o tipo.'),
});

type CreateDiseaseAllergyFormData = z.infer<typeof createDiseaseAllergyFormSchema>;

const DiseaseAllergy = ({diseaseAllergy, setDiseaseAllergy }: DiseaseAllergy) => {

    const { 
        register, 
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<CreateDiseaseAllergyFormData>({
        resolver: zodResolver(createDiseaseAllergyFormSchema)
    });

    const [isModalOpenDiseaseAllergy, setIsModalOpenDiseaseAllergy] = useState(false);

    const handleRemoveDiseaseAllergy = (index: number) => {
        const updatedOptions = [...diseaseAllergy];
        updatedOptions.splice(index, 1);
        setDiseaseAllergy(updatedOptions);
    };

    const handleDiseaseAllergy = () => {
        setIsModalOpenDiseaseAllergy(true);
    };

    const handleModalDiseaseAllergyConfirm = (data: DiseaseAllergyProps) => {
        setDiseaseAllergy([...diseaseAllergy, data]);
        setIsModalOpenDiseaseAllergy(false);
        reset();
    };

    const handleModalDiseaseAllergyCancel = () => {
        setIsModalOpenDiseaseAllergy(false);
        reset();
    };

    return (
        <>
            <div className="flex gap-2 flex-wrap ml-6">
                {diseaseAllergy.map((value, index) => (
                    <div key={index} className="flex flex-col gap-2 w-full">
                        <div className="flex gap-2 justify-between items-center w-full">
                            <span className="uppercase text-sm text-black font-medium">
                                {value.name}
                            </span>
                            <div className="flex gap-2">
                                <div className="flex justify-center bg-darkblue-normal w-[75px] rounded">
                                    <span className="text-white">
                                        {value.type === 'doença' ? 'Doença' : 'Alergia'}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveDiseaseAllergy(index)}
                                >
                                    <AiOutlineCloseCircle className="text-black w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div>
                            <span className="text-sm text-gray-600 font-medium ml-6">
                                {value.description}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <button
                type="button"
                className="flex items-center gap-1"
                onClick={handleDiseaseAllergy}
            >
                <AiOutlinePlus className="text-black h-5 w-5" />
                <span className="text-black text-md">Doença/Alergia</span>
            </button>

            {isModalOpenDiseaseAllergy && (
                <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
                    <div className="flex flex-col justify-between bg-white p-4 rounded shadow-md w-1/2 lg:w-2/5">
                        <h2 className="text-lg mb-4 font-semibold">
                            Adicionar doença/alergia
                        </h2>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder='Nome da doença/alergia'
                                className={`
                                    w-full p-2 border border-black rounded-md
                                    focus:outline-none focus:ring-2 focus:border-lightblue-normal focus:ring-lightblue-normal
                                    placeholder:text-sm lg:placeholder:text-base
                                `}
                                {...register("name")}
                            />

                            <select
                                className={`
                                    w-min p-2 border border-black rounded-md bg-white
                                    focus:outline-none focus:ring-2 focus:border-lightblue-normal focus:ring-lightblue-normal
                                    text-sm lg:text-base text-gray-500
                                `}
                                defaultValue=""
                                {...register('type')}
                            >
                                <option value="" disabled>doença/alergia</option>
                                <option value="doença">doença</option>
                                <option value="alergia">alergia</option>
                            </select>
                        </div>
                        <div className="flex gap-2 mb-4 justify-between">
                            <div>
                                { errors.name && <span className="text-sm text-red-600">{errors.name.message}</span> }
                            </div>
                            <div>
                                { errors.type && <span className="text-sm text-red-600">{errors.type.message}</span> }
                            </div>
                        </div>
                        <textarea
                            placeholder="Descrição sobre doença e como está sendo tratada atualmente."
                            className={`
                                resize-none border border-black rounded-md 
                                p-2 h-[100px] 
                                focus:outline-none focus:ring-2 focus:border-lightblue-normal focus:ring-lightblue-normal
                                text-sm lg:text-base placeholder:text-sm lg:placeholder:text-base
                            `}
                            {...register("description")}
                        ></textarea>
                        { errors.description && <span className="text-sm text-red-600 mt-1">{errors.description.message}</span> }

                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                className="text-gray-600 font-semibold pt-4"
                                onClick={handleModalDiseaseAllergyCancel}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="text-darkblue-normal font-semibold pt-4"
                                onClick={handleSubmit(handleModalDiseaseAllergyConfirm)}
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DiseaseAllergy;
