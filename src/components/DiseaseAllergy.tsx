"use client";
import { useState } from "react";
import { AiOutlineCloseCircle, AiOutlinePlus } from "react-icons/ai";

interface DiseaseAllergyProps {
    name: string;
    description: string;
    type: number;
}

const DiseaseAllergy = () => {
    const [diseaseAllergy, setDiseaseAllergy] = useState<DiseaseAllergyProps[]>([
        {
            name: "Nome da doença",
            description: 'Descrição sobre doença e como está sendo tratada atualmente.',
            type: 1
        },
    ]);

    const [isModalOpenDiseaseAllergy, setIsModalOpenDiseaseAllergy] = useState(false);
    const [newDiseaseAllergy, setNewDiseaseAllergy] = useState({ name: '', description: '', type: 0 });

    const handleRemoveDiseaseAllergy = (index: number) => {
        const updatedOptions = [...diseaseAllergy];
        updatedOptions.splice(index, 1);
        setDiseaseAllergy(updatedOptions);
    };

    const handleDiseaseAllergy = () => {
        setIsModalOpenDiseaseAllergy(true);
    };

    const handleModalDiseaseAllergyConfirm = () => {
        if (newDiseaseAllergy.name && newDiseaseAllergy.description && newDiseaseAllergy.type !== 0) {
            setDiseaseAllergy([...diseaseAllergy, newDiseaseAllergy]);
        }
        setIsModalOpenDiseaseAllergy(false);
        setNewDiseaseAllergy({ name: '', description: '', type: 0 });
    };

    const handleModalDiseaseAllergyCancel = () => {
        setIsModalOpenDiseaseAllergy(false);
        setNewDiseaseAllergy({ name: '', description: '', type: 0 });
    };

    return (
        <>
            <div className="flex gap-2 flex-wrap ml-4">
                {diseaseAllergy.map((value, index) => (
                    <div key={index} className="flex flex-col gap-2 w-full">
                        <div className="flex gap-2 justify-between items-center w-full">
                            <span className="uppercase text-sm text-black font-medium">
                                {value.name}
                            </span>
                            <button
                                type="button"
                                onClick={() => handleRemoveDiseaseAllergy(index)}
                            >
                                <AiOutlineCloseCircle className="text-black w-4 h-4" />
                            </button>
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
                <span className="text-black text-md">d</span>
            </button>

            {isModalOpenDiseaseAllergy && (
                <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
                    <div className="flex flex-col justify-between bg-white p-4 rounded shadow-md w-1/4 h-1/5">
                        <h2 className="text-lg mb-4 font-semibold">
                            Adicionar d
                        </h2>
                        <input
                            type="text"
                            placeholder='d'
                            value={newDiseaseAllergy.name}
                            onChange={(e) => setNewDiseaseAllergy({ 
                                name: e.target.value, 
                                description: newDiseaseAllergy.description, 
                                type: newDiseaseAllergy.type
                            })}
                            className="w-full p-2 border border-gray-300 rounded-sm mb-4"
                        />
                        <div className="flex justify-end gap-4">
                            <button
                                className="text-gray-600 font-semibold"
                                onClick={handleModalDiseaseAllergyCancel}
                            >
                                Cancelar
                            </button>
                            <button
                                className="text-darkblue-normal font-semibold"
                                onClick={handleModalDiseaseAllergyConfirm}
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
