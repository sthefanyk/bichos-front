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
}

const AddMedVac = ({ medOrVac }: AddMedVac) => {
    const [medVac, setMedVac] = useState<MedVacProps[]>([
        {
            name: "Vermífugo",
            doses: [
                { date: "---", tomado: false },
                { date: "---", tomado: false },
            ],
        },
        { name: "Anti-parasitário", doses: [{ date: "---", tomado: false }] },
    ]);

    const [isModalOpenMedVac, setIsModalOpenMedVac] = useState(false);
    const [isModalOpenDose, setIsModalOpenDose] = useState(false);

    const [newMedVac, setNewMedVac] = useState("");
    const [newDose, setNewDose] = useState({
        index: 0,
        date: "",
        tomado: false,
    });

    const handleChecked = (data: boolean) => {
        setNewDose({ index: newDose.index, date: newDose.date, tomado: data });
    };

    // MED_VAC

    const handleRemoveMedVac = (index: number) => {
        const updatedOptions = [...medVac];
        updatedOptions.splice(index, 1);
        setMedVac(updatedOptions);
    };

    const handleAddMedVac = () => {
        setIsModalOpenMedVac(true);
    };

    const handleModalMedVacConfirm = () => {
        if (newMedVac) {
            setMedVac([...medVac, { name: newMedVac, doses: [] }]);
        }
        setIsModalOpenMedVac(false);
        setNewMedVac("");
    };

    const handleModalMedVacCancel = () => {
        setIsModalOpenMedVac(false);
        setNewMedVac("");
    };

    // DOSE

    const handleRemoveDose = (index: number, iDose: number) => {
        const updatedOptions = [...medVac];
        updatedOptions[index].doses.splice(iDose, 1);
        setMedVac(updatedOptions);
    };

    const handleAddDose = (index: number) => {
        setNewDose({ index, date: "", tomado: false });
        setIsModalOpenDose(true);
    };

    const handleModalDoseConfirm = () => {
        if (newDose.date) {
            medVac[newDose.index].doses.push({
                date: newDose.date,
                tomado: newDose.tomado,
            });
        }
        setIsModalOpenDose(false);
        setNewDose({ index: 0, date: "", tomado: false });
    };

    const handleModalDoseCancel = () => {
        setIsModalOpenDose(false);
        setNewDose({ index: 0, date: "", tomado: false });
    };

    const handleDoseTomada = () => {
        medVac[newDose.index].doses.push({
            date: newDose.date,
            tomado: newDose.tomado,
        });

        setIsModalOpenDose(false);
        setNewDose({ index: 0, date: "", tomado: false });
    };

    return (
        <>
            <div className="flex gap-2 flex-wrap ml-4">
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
                                <span className="text-sm text-gray-600 font-medium">
                                    {i + 1}/{value.doses.length} dose
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="uppercase text-sm text-gray-600 font-medium">
                                        {dose.date}
                                    </span>
                                    {dose.tomado ? (
                                        <div className="flex justify-center bg-lime-normal w-[75px] rounded">
                                            <span className="font-normal text-white">
                                                tomado
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="flex justify-center bg-orangee-normal w-[75px] rounded">
                                            <span className="font-normal text-white">
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
                    <div className="flex flex-col justify-between bg-white p-4 rounded shadow-md w-1/4 h-1/5">
                        <h2 className="text-lg mb-4 font-semibold">
                            Adicionar {medOrVac.toLowerCase()}
                        </h2>
                        <input
                            type="text"
                            placeholder={medOrVac === 'Vacina' ? "Nova vacina" : "Novo medicamento"}
                            value={newMedVac}
                            onChange={(e) => setNewMedVac(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-sm mb-4"
                        />
                        <div className="flex justify-end gap-4">
                            <button
                                className="text-gray-600 font-semibold"
                                onClick={handleModalMedVacCancel}
                            >
                                Cancelar
                            </button>
                            <button
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
                    <div className="flex flex-col justify-between bg-white p-4 rounded shadow-md w-1/4 h-1/5">
                        <h2 className="text-lg font-semibold">
                            Adicionar dose
                        </h2>
                        <div className="flex justify-between items-center gap-2">
                            <input
                                type="date"
                                placeholder="Nova dose"
                                value={newDose.date}
                                onChange={(e) =>
                                    setNewDose({
                                        index: newDose.index,
                                        date: e.target.value,
                                        tomado: newDose.tomado,
                                    })
                                }
                                className="w-full p-2 border border-gray-300 rounded-sm"
                            />
                            <CheckBox
                                id="tomado"
                                label="tomado"
                                handleChecked={handleChecked}
                            />
                        </div>
                        <div className="flex justify-end gap-4">
                            <button
                                className="text-gray-600 font-semibold"
                                onClick={handleModalDoseCancel}
                            >
                                Cancelar
                            </button>
                            <button
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
