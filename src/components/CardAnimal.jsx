"use client";
import { useState, useRef } from "react";
import { GiSittingDog } from 'react-icons/gi'

const CardAnimal = ({ name, posted_by }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef();
    const closeRef = useRef();

    const handleModal = () => {
        setIsModalOpen(true);
    };

    const handleModalConfirm = () => {
        // setDiseaseAllergy([...diseaseAllergy, data]);
        // reset();
        setIsModalOpen(false);
    };

    const handleModalClose = (e) => {

        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setIsModalOpen(false);
        }
        // reset();
    };

    return (
        <>
            <div
                onClick={handleModal}
                className="flex flex-col p-2 max-w-max gap-2 bg-lightext-normal border border-darktext-normal rounded-lg shadow-card">
                <div>
                    <img src="animal.png" alt="" />
                </div>
                <div>
                    <p className="font-semibold text-xl lg:text-2xl">
                        {name}
                    </p>
                    <p className="text-lg lg:text-xl font-medium">
                        sexo, idade
                    </p>
                    <p className="text-lg lg:text-xl font-medium">
                        castramento
                    </p>
                    <p className="text-lg lg:text-xl font-medium">
                        localização
                    </p>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50" onClick={handleModalClose}>
                    <div className="flex gap-4 bg-white p-4 rounded shadow-md w-1/2 lg:w-3/5 h-2/3" ref={modalRef}>
                        <div className="flex w-[40%] h-full">
                            <div className="flex flex-col gap-2 w-full h-full">
                                <div className="flex flex-col gap-2 w-full h-[85%]">
                                    <div className="bg-orangee-normal w-full h-full rounded-lg">
                                        
                                    </div>

                                    <div className="flex gap-2 w-full h-min">
                                        <div className="bg-orange-400 aspect-[1/1] w-full rounded-lg">
                                            
                                        </div>
                                        <div className="bg-orange-300 aspect-[1/1] w-full rounded-lg">
                                            
                                        </div>
                                        <div className="bg-orange-200 aspect-[1/1] w-full rounded-lg">
                                        
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 h-[15%] p-2 items-center">
                                    <div className="h-full aspect-[1/1] bg-darkblue-normal rounded-full">

                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-lg font-bold">Nickname</span>
                                        <span className="text-sm font-semibold text-gray-600 ">@{posted_by?.username}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col w-[60%]">

                            <div className="flex flex-col gap-2 overflow-auto">
                                <span className="text-lg font-semibold">{name}</span>
                                <div className="flex justify-between">
                                    <div className="flex flex-col gap-1">
                                        <span className="flex gap-2 items-center text-sm font-medium text-gray-600"> <GiSittingDog />Macho, 1 mês</span>
                                        <span className="flex gap-2 items-center text-sm font-medium text-gray-600"> <GiSittingDog />Não castrado(a)</span>
                                        <span className="flex gap-2 items-center text-sm font-medium text-gray-600"><GiSittingDog /> SRD</span>
                                        <span className="flex gap-2 items-center text-sm font-medium text-gray-600"> <GiSittingDog /> Bauru, SP</span>
                                    </div>

                                    <div className="flex flex-col gap-1 justify-end">
                                        <div className="flex gap-2 items-end justify-end">
                                            <span className="text-sm font-medium text-gray-600">Porte atual:</span>
                                            <div className="flex gap-2 items-end flex-row-reverse">
                                                <GiSittingDog className="text-3xl text-darkblue-normal" />
                                                <GiSittingDog className="text-2xl text-gray-600" />
                                                <GiSittingDog className="text-xl text-gray-600" />
                                            </div>
                                        </div>
                                        <div className="flex gap-2 items-end justify-end">
                                            <span className="text-sm font-medium text-gray-600">Porte estimado:</span>
                                            <div className="flex gap-2 items-end flex-row-reverse">
                                                <GiSittingDog className="text-3xl text-darkblue-normal" />
                                                <GiSittingDog className="text-2xl text-gray-600" />
                                                <GiSittingDog className="text-xl text-gray-600" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-center bg-orangee-normal rounded px-2 py-[2px] w-min">
                                        <span className="uppercase text-sm font-light text-white">
                                            urgente
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 ml-2">
                                        Motivo da urgência.
                                    </p>
                                </div>

                                <div className="h-[1px] bg-darkblue-normal"></div>

                                <div className="flex flex-col gap-2">
                                    <span className="text-lg font-semibold">Perfil</span>
                                    <div className="flex flex-col gap-2">
                                        <span className="text-md font-semibold">História</span>
                                        <p className="text-sm text-gray-600 ml-4">História do bicho.</p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="text-md font-semibold">Características</span>
                                        <p className="text-sm text-gray-600 ml-4">
                                            Ele(a) é único(a). Características do bicho, coisas engraçadas, estranhas, costumes, características físicas, etc.
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="text-md font-semibold">Personalidades</span>
                                        <div className="flex gap-2 ml-4 flex-wrap">
                                            <span className="uppercase px-2 py-[2px] bg-darkblue-normal text-sm text-white rounded w-min font-light">brincalhão</span>
                                            <span className="uppercase px-2 py-[2px] bg-darkblue-normal text-sm text-white rounded w-min font-light">carinhoso</span>
                                            <span className="uppercase px-2 py-[2px] bg-darkblue-normal text-sm text-white rounded w-min font-light">dorminhoco</span>
                                            <span className="uppercase px-2 py-[2px] bg-darkblue-normal text-sm text-white rounded w-min font-light">agitado</span>
                                            <span className="uppercase px-2 py-[2px] bg-darkblue-normal text-sm text-white rounded w-min font-light">calmo</span>
                                            <span className="uppercase px-2 py-[2px] bg-darkblue-normal text-sm text-white rounded w-min font-light">docio</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-[1px] bg-darkblue-normal"></div>

                                <div className="flex flex-col gap-2">
                                    <span className="text-lg font-semibold">Saúde do bicho</span>

                                    <span className="text-sm font-semibold text-darkblue-normal">Não castrado(a)</span>

                                    <div className="flex flex-col gap-2">
                                        <span className="text-md font-semibold">Medicamentos</span>
                                        <div className="flex flex-col gap-2 mx-4">
                                            <span className="text-sm font-semibold">Vermifudo</span>
                                            <div className="flex items-center justify-between ml-4">
                                                <span className="text-sm text-gray-600 font-medium">
                                                    1/2 dose
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <span className="uppercase text-sm text-gray-600 font-medium">
                                                        00/00/0000
                                                    </span>
                                                    <div className="flex justify-center bg-lime-normal w-[75px] rounded">
                                                        <span className="text-sm font-light text-white">
                                                            tomado
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between ml-4">
                                                <span className="text-sm text-gray-600 font-medium">
                                                    2/2 dose
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <span className="uppercase text-sm text-gray-600 font-medium">
                                                        00/00/0000
                                                    </span>
                                                    <div className="flex justify-center bg-orangee-normal w-[75px] rounded">
                                                        <span className="text-sm font-light text-white">
                                                            falta
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2 mx-4">
                                            <span className="text-sm font-semibold">Anti-pugas</span>
                                            <div className="flex items-center justify-between ml-4">
                                                <span className="text-sm text-gray-600 font-medium">
                                                    1/1 dose
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <span className="uppercase text-sm text-gray-600 font-medium">
                                                        00/00/0000
                                                    </span>
                                                    <div className="flex justify-center bg-lime-normal w-[75px] rounded">
                                                        <span className="text-sm font-light text-white">
                                                            tomado
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <span className="text-md font-semibold">Vacinas</span>
                                        <div className="flex flex-col gap-2 mx-4">
                                            <span className="text-sm font-semibold">Raiva</span>
                                            <div className="flex items-center justify-between ml-4">
                                                <span className="text-sm text-gray-600 font-medium">
                                                    1/2 dose
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <span className="uppercase text-sm text-gray-600 font-medium">
                                                        00/00/0000
                                                    </span>
                                                    <div className="flex justify-center bg-lime-normal w-[75px] rounded">
                                                        <span className="text-sm font-light text-white">
                                                            tomado
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between ml-4">
                                                <span className="text-sm text-gray-600 font-medium">
                                                    2/2 dose
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <span className="uppercase text-sm text-gray-600 font-medium">
                                                        00/00/0000
                                                    </span>
                                                    <div className="flex justify-center bg-orangee-normal w-[75px] rounded">
                                                        <span className="text-sm font-light text-white">
                                                            falta
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <span className="text-md font-semibold">Doenças e Alergias</span>
                                        <div className="flex flex-col gap-2 mx-4 mb-2">
                                            <div className="flex justify-between">
                                                <span className="text-sm font-semibold">Nome da doença</span>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex justify-center bg-darkblue-normal w-[75px] rounded">
                                                        <span className="text-sm font-light text-white">
                                                        doença
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between ml-4">
                                                <span className="text-sm text-gray-600 font-medium">
                                                    Descrição sobre doença e como está sendo tratada atualmente.
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2 mx-4 mb-2">
                                            <div className="flex justify-between">
                                                <span className="text-sm font-semibold">Nome da alergia</span>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex justify-center bg-darkblue-normal w-[75px] rounded">
                                                        <span className="text-sm font-light text-white">
                                                            alergia
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between ml-4">
                                                <span className="text-sm text-gray-600 font-medium">
                                                    Descrição sobre alergia e como está sendo tratada atualmente.
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <span className="text-md font-semibold">Informações adicionais</span>
                                        <span className="text-sm text-gray-600 font-medium mx-4 mb-2">
                                            Informações  necessárias e relevantes sobre a saúde do animal ainda não ditas.
                                        </span>
                                    </div>
                                </div>

                                <div className="h-[1px] w-full bg-darkblue-normal"></div>

                            </div>



                            <div className="flex justify-end gap-4 p-2">
                                <button
                                    ref={closeRef}
                                    type="button"
                                    className={`
                                        inline-flex w-min px-4 py-2 bg-orangee-normal rounded-md justify-center items-center shadow-btn border border-darktext-normal
                                    `}
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    <span className="text-sm font-semibold text-white shadow-sm">
                                        Fechar
                                    </span>
                                </button>
                                <button
                                    type="button"
                                    className={`
                                        inline-flex w-min px-4 py-2 bg-darkblue-normal rounded-md justify-center items-center shadow-btn border border-darktext-normal
                                    `}
                                    // onClick={handleModalConfirm}
                                >
                                    <span className="text-sm font-semibold text-white shadow-sm">
                                        Adotar
                                    </span>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CardAnimal;
