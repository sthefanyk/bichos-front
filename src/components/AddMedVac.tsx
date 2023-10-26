"use client";
import { useState } from "react";
import { AiOutlineCloseCircle, AiOutlinePlus } from "react-icons/ai";
import CheckBox from "@/components/CheckBox";

interface DosesProps {
    date: string;
    tomado: boolean;
}

interface MedVacProps {
    name: string;
    doses: DosesProps[];
}

interface AddMedVac {
    medOrVac: string;
    medVac: MedVacProps[];
    setMedVac: any;
}

const AddMedVac = ({ medOrVac, medVac, setMedVac }: AddMedVac) => {
    const [isModalOpenMedVac, setIsModalOpenMedVac] = useState(false);
    const [isModalOpenDose, setIsModalOpenDose] = useState(false);
    const [isTomada, setIsTomada ] = useState(false);

    const [error, setError] = useState(false);

    const [newMedVac, setNewMedVac] = useState("");
    const [newDose, setNewDose] = useState({ index: 0, date: "" });

    // MED_VAC

    const handleRemoveMedVac = (index: number) => {
        const updatedOptions = [...medVac];
        updatedOptions.splice(index, 1);
        setMedVac(updatedOptions);
    };

    const handleAddMedVac = () => {
        setNewMedVac("");
        setError(false);

        setIsModalOpenMedVac(true);
    };

    const handleModalMedVacConfirm = () => {
        if (newMedVac) {
            setMedVac([...medVac, { name: newMedVac, doses: [] }]);
            setIsModalOpenMedVac(false);
            return
        }
        setError(true);
    };

    const handleModalMedVacCancel = () => setIsModalOpenMedVac(false);
    
    // DOSE

    const handleRemoveDose = (index: number, iDose: number) => {
        const updatedOptions = [...medVac];
        updatedOptions[index].doses.splice(iDose, 1);
        setMedVac(updatedOptions);
    };

    const handleAddDose = (index: number) => {
        setNewDose({ index, date: "" });
        setIsTomada(false);
        setError(false);

        setIsModalOpenDose(true);
    };

    const handleModalDoseConfirm = () => {
        if (newDose.date) {
            medVac[newDose.index].doses.push({
                date: newDose.date,
                tomado: isTomada,
            });

            setIsModalOpenDose(false);
            setError(false);

            return
        }

        setError(true);
    };

    const handleModalDoseCancel = () => setIsModalOpenDose(false);

    return (
        <>
            <div className="flex gap-2 flex-wrap ml-6">
                {medVac.map((value, index) => (
                    <div key={index} className="flex flex-col gap-2 w-full">
                        <div className="flex gap-2 items-center w-full">
                            <button
                                type="button"
                                onClick={() => handleRemoveMedVac(index)}
                            >
                                <AiOutlineCloseCircle className="text-black w-4 h-4" />
                            </button>
                            <span className="uppercase text-sm text-black font-medium">
                                {value.name}
                            </span>
                        </div>
                        {value.doses.map((dose, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between ml-6"
                            >
                                <span className="text-md text-gray-600 font-medium">
                                    {i + 1}/{value.doses.length} dose
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="uppercase text-md text-gray-600 font-medium">
                                        {dose.date}
                                    </span>
                                    {dose.tomado ? (
                                        <div className="flex justify-center bg-lime-normal w-[75px] rounded">
                                            <span className="text-md font-light text-white">
                                                tomado
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="flex justify-center bg-orangee-normal w-[75px] rounded">
                                            <span className="text-md font-light text-white">
                                                falta
                                            </span>
                                        </div>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleRemoveDose(index, i)
                                        }
                                        className="flex items-center"
                                    >
                                        <AiOutlineCloseCircle className="text-gray-600 w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="flex items-center gap-1"
                            onClick={() => handleAddDose(index)}
                        >
                            <AiOutlinePlus className="text-gray-600 h-4 w-4" />
                            <span className="text-gray-600 text-sm">Dose</span>
                        </button>
                    </div>
                ))}
            </div>

            <button
                type="button"
                className="flex items-center gap-1"
                onClick={handleAddMedVac}
            >
                <AiOutlinePlus className="text-black h-5 w-5" />
                <span className="text-black text-md">{medOrVac}</span>
            </button>

            {isModalOpenMedVac && (
                <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
                    <div className="flex flex-col justify-between bg-white p-4 rounded shadow-md w-1/2 lg:w-1/4">
                        <h2 className="text-lg mb-4 font-semibold">
                            Adicionar {medOrVac.toLowerCase()}
                        </h2>
                        <div className="flex flex-col gap-1 mb-4">
                            <input
                                type="text"
                                placeholder={medOrVac === 'Vacina' ? "Nome da vacina" : "Nome do medicamento"}
                                value={newMedVac}
                                onChange={(e) => setNewMedVac(e.target.value)}
                                className={`
                                    w-full p-2 border border-black rounded-md
                                    focus:outline-none focus:ring-2 focus:border-lightblue-normal focus:ring-lightblue-normal
                                `}
                            />
                            { newMedVac === '' && error && <span className="text-sm text-red-600">Por favor, insira {medOrVac === 'vacina' ? "nome da vacina" : "nome do medicamento"}</span> }
                        </div>
                        
                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                className="text-gray-600 font-semibold"
                                onClick={handleModalMedVacCancel}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="text-darkblue-normal font-semibold"
                                onClick={handleModalMedVacConfirm}
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isModalOpenDose && (
                <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
                    <div className="flex flex-col justify-between bg-white p-4 rounded shadow-md w-1/2 lg:w-1/4 gap-4">
                        <h2 className="text-lg font-semibold">
                            Adicionar dose
                        </h2>
                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between items-center gap-2">
                                <input
                                    type="date"
                                    placeholder="Nova dose"
                                    value={newDose.date}
                                    onChange={(e) =>
                                        setNewDose({
                                            index: newDose.index,
                                            date: e.target.value,
                                        })
                                    }
                                    className={`
                                        w-full p-2 border border-black rounded-md
                                        focus:outline-none focus:ring-2 focus:border-lightblue-normal focus:ring-lightblue-normal
                                    `}
                                    />
                                
                                <CheckBox
                                    id="tomado"
                                    label="tomado"
                                    isChecked={isTomada}
                                    setIsChecked={setIsTomada}
                                    />
                            </div>
                            { newDose.date === '' && error && <span className="text-sm text-red-600">Por favor, insira a data.</span> }
                        </div>
                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                className="text-gray-600 font-semibold"
                                onClick={handleModalDoseCancel}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="text-darkblue-normal font-semibold"
                                onClick={handleModalDoseConfirm}
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

export default AddMedVac;
