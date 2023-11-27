"use client";
import { AuthContext } from "@/contexts/AuthContext";
import { PostContext } from "@/contexts/PostContext";
import { useRouter } from "next/navigation";
import { useState, useRef, useContext } from "react";
import { GiSittingDog } from 'react-icons/gi'

const CardAnimal = ({post}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef();
    const closeRef = useRef();
    const { setSelectedPostId } = useContext(PostContext);
    const { isAuthenticated } = useContext(AuthContext);
    const { push } = useRouter();

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

    function formatDate(date) {
        const dataHora = new Date(date);
    
        const dia = (`0${dataHora.getDate()}`).slice(-2);
        const mes = (`0${dataHora.getMonth() + 1}`).slice(-2);
        const ano = dataHora.getFullYear();
    
        return `${dia}/${mes}/${ano}`;
    }

    function calcAge(date) {
        const dateObj = new Date(date);
        const dateCurrent = new Date();
    
        const yearsApart = dateCurrent.getFullYear() - dateObj.getFullYear();
        const monthsApart = dateCurrent.getMonth() - dateObj.getMonth();
    
        let age = '';

        if (monthsApart < 0) {
            const years = yearsApart - 1;
            const months = monthsApart + 12;
            if (years > 0 && months > 0) {
                if (years === 1 && months === 1) {
                    age = `${years} ano e ${months} mês`;
                }else if(months === 1){
                    age = `${years} anos e ${months} mês`;
                }else if(years === 1){
                    age = `${years} ano e ${months} meses`;
                }else{
                    age = `${years} anos e ${months} meses`;
                }
            } else if (years > 0) {
                if (years === 1) {
                    age = `${years} ano`;
                }else{
                    age = `${years} anos`;
                }
            } else {
                if (months === 1) {
                    age = `${months} mês`;
                }else{
                    age = `${months} meses`;
                }
            }
        } else {
            if (yearsApart > 0 && monthsApart > 0) {
                if (yearsApart === 1 && monthsApart === 1) {
                    age = `${yearsApart} ano e ${monthsApart} mês`;
                }else if(monthsApart === 1){
                    age = `${yearsApart} anos e ${monthsApart} mês`;
                }else if(yearsApart === 1){
                    age = `${yearsApart} ano e ${monthsApart} meses`;
                }else{
                    age = `${yearsApart} anos e ${monthsApart} meses`;
                }
            } else if (yearsApart > 0) {
                if (yearsApart === 1) {
                    age = `${yearsApart} ano`;
                }else{
                    age = `${yearsApart} anos`;
                }
            } else {
                if (monthsApart === 1) {
                    age = `${monthsApart} mês`;
                }else{
                    age = `${monthsApart} meses`;
                }
            }
        }
    
        return age;
    }

    function formatWord(word) {
        const formatted_word = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        return formatted_word;
    }

    function handleAdopt(){
        setSelectedPostId(post.id);

        if (isAuthenticated) {
            push('/adopt/form/quiz');
        }else{
            push('/login');
        }
    }

    return (
        <>
            <div
                onClick={handleModal}
                className="flex flex-col p-2 max-w-max gap-2 bg-lightext-normal border border-darktext-normal rounded-lg shadow-card">
                <div className="aspect-[1/1] h-full bg-orangee-normal rounded-md overflow-hidden">
                    <picture className="flex items-center justify-center w-full h-full">
                        <img 
                            src={post.animal.main_image.url} 
                            alt="Imagem do animal"
                            className="w-full h-full object-cover"
                        />
                    </picture>
                </div>
                <div className="w-[300px]">
                    <p className="font-semibold text-xl lg:text-2xl">
                        {formatWord(post.animal.name)}
                    </p>
                    <p className="text-lg lg:text-xl font-medium">
                        {post.animal.sex === 0 ? 'Macho' : 'Fêmea' }, {calcAge(post.animal.date_birth)}
                    </p>
                    <p className="text-lg lg:text-xl font-medium">
                        {post.animal.health.neutered ? 'Castrado(a)': 'Não castrado(a)'}
                    </p>
                    <p className="text-lg lg:text-xl font-medium">
                        {formatWord(post.posted_by.city.name)}, {post.posted_by.city.state.abbreviation}
                    </p>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50" onClick={handleModalClose}>
                    <div className="flex gap-4 bg-white p-4 rounded shadow-md w-1/2 lg:w-3/5 h-2/3" ref={modalRef}>
                        <div className="flex w-[40%] h-full">
                            <div className="flex flex-col gap-2 w-full h-full">
                                <div className="flex flex-col gap-2 w-full h-[85%]">
                                    <div className="bg-orangee-normal w-full h-full rounded-lg overflow-hidden">
                                        <picture className="flex items-center justify-center w-full h-full">
                                            <img 
                                                src={post.animal.main_image.url} 
                                                alt="Imagem do animal"
                                                className="w-full h-full object-cover"
                                            />
                                        </picture>
                                    </div>

                                    <div className="flex gap-2 w-full h-min">
                                        <div className="bg-orange-400 aspect-[1/1] w-full rounded-lg overflow-hidden">
                                            <picture className="flex items-center justify-center w-full h-full">
                                                <img 
                                                    src={post.animal.second_image.url} 
                                                    alt="Imagem do animal"
                                                    className="w-full h-full object-cover"
                                                />
                                            </picture>
                                        </div>
                                        <div className="bg-orange-300 aspect-[1/1] w-full rounded-lg overflow-hidden">
                                            <picture className="flex items-center justify-center w-full h-full">
                                                <img 
                                                    src={post.animal.third_image.url} 
                                                    alt="Imagem do animal"
                                                    className="w-full h-full object-cover"
                                                />
                                            </picture>
                                        </div>
                                        <div className="bg-orange-200 aspect-[1/1] w-full rounded-lg overflow-hidden">
                                            <picture className="flex items-center justify-center w-full h-full">
                                                <img 
                                                    src={post.animal.fourth_image.url} 
                                                    alt="Imagem do animal"
                                                    className="w-full h-full object-cover"
                                                />
                                            </picture>
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    className="flex gap-2 h-[15%] p-2 items-center"
                                    onClick={() => push(`/profile/${post.posted_by?.id}`)}
                                >
                                    <div className="h-full aspect-[1/1] bg-darkblue-normal rounded-full overflow-hidden">
                                    {
                                        post.posted_by.profile_picture.url && (
                                            <picture className="flex items-center justify-center w-full h-full">
                                                <img 
                                                    src={post.posted_by.profile_picture.url} 
                                                    alt="Imagem do usuário"
                                                    className="w-full h-full object-cover"
                                                />
                                            </picture>
                                        )
                                    }
                                        
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-lg font-bold">{post.posted_by.name}</span>
                                        <span className="text-sm font-semibold text-gray-600 ">@{post.posted_by.username}</span>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col w-[60%]">

                            <div className="flex flex-col gap-2 overflow-auto">
                                <span className="text-lg font-semibold">{formatWord(post.animal.name)}</span>
                                <div className="flex justify-between">
                                    <div className="flex flex-col gap-1">
                                        <span className="flex gap-2 items-center text-sm font-medium text-gray-600"> <GiSittingDog />
                                            {post.animal.sex === 0 ? 'Macho' : 'Fêmea' }, {calcAge(post.animal.date_birth)}
                                        </span>
                                        <span className="flex gap-2 items-center text-sm font-medium text-gray-600"> <GiSittingDog />
                                            {post.animal.health.neutered ? 'Castrado(a)': 'Não castrado(a)'}
                                        </span>
                                        <span className="flex gap-2 items-center text-sm font-medium text-gray-600"><GiSittingDog />
                                            {formatWord(post.animal.breed)}
                                        </span>
                                        <span className="flex gap-2 items-center text-sm font-medium text-gray-600"> <GiSittingDog />
                                            {formatWord(post.posted_by.city.name)}, {post.posted_by.city.state.abbreviation}
                                        </span>
                                    </div>

                                    <div className="flex flex-col gap-1 justify-end">
                                        <div className="flex gap-2 items-end justify-end">
                                            <span className="text-sm font-medium text-gray-600">Porte atual:</span>
                                            <div className="flex gap-2 items-end flex-row-reverse">
                                                <GiSittingDog className={`text-3xl ${post.animal.size_current == 2 ? 'text-darkblue-normal' : 'text-gray-600'}`} />
                                                <GiSittingDog className={`text-2xl ${post.animal.size_current == 1 ? 'text-darkblue-normal' : 'text-gray-600'}`} />
                                                <GiSittingDog className={`text-xl ${post.animal.size_current == 0 ? 'text-darkblue-normal' : 'text-gray-600'}`} />
                                            </div>
                                        </div>
                                        <div className="flex gap-2 items-end justify-end">
                                            <span className="text-sm font-medium text-gray-600">Porte estimado:</span>
                                            <div className="flex gap-2 items-end flex-row-reverse">
                                                <GiSittingDog className={`text-3xl ${post.animal.size_estimated == 2 ? 'text-darkblue-normal' : 'text-gray-600'}`} />
                                                <GiSittingDog className={`text-2xl ${post.animal.size_estimated == 1 ? 'text-darkblue-normal' : 'text-gray-600'}`} />
                                                <GiSittingDog className={`text-xl ${post.animal.size_estimated == 0 ? 'text-darkblue-normal' : 'text-gray-600'}`} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {
                                    post.urgent && (
                                        <div className="flex flex-col gap-2">
                                            <div className="flex justify-center bg-orangee-normal rounded px-2 py-[2px] w-min">
                                                <span className="uppercase text-sm font-light text-white">
                                                    urgente
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 ml-2">
                                                {post.urgency_justification}
                                            </p>
                                        </div>
                                    )
                                }
                                <div className="h-[1px] bg-darkblue-normal"></div>

                                <div className="flex flex-col gap-2">
                                    <span className="text-lg font-semibold">Perfil</span>
                                    <div className="flex flex-col gap-2">
                                        <span className="text-md font-semibold">História</span>
                                        <p className="text-sm text-gray-600 ml-4">{post.animal.history}</p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="text-md font-semibold">Características</span>
                                        <p className="text-sm text-gray-600 ml-4">
                                            {post.animal.characteristic}
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="text-md font-semibold">Personalidades</span>
                                        <div className="flex gap-2 ml-4 flex-wrap">
                                            {post.animal.personalities.map(p => (
                                                <span key={p} className="uppercase px-2 py-[2px] bg-darkblue-normal text-sm text-white rounded w-min font-light">{p}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="h-[1px] bg-darkblue-normal"></div>

                                <div className="flex flex-col gap-2 mb-2">
                                    <span className="text-lg font-semibold">Saúde do bicho</span>

                                    <span className="text-sm font-semibold text-darkblue-normal">Não castrado(a)</span>

                                    <div className="flex flex-col gap-2">
                                        <span className="text-md font-semibold">Medicamentos</span>
                                        {
                                            post.animal.health.vaccines_medicines.map(vm => {
                                                if (vm.type === 1) {
                                                    return (
                                                        <div key={vm.id} className="flex flex-col gap-2 mx-4">
                                                            <span className="text-sm font-semibold">{formatWord(vm.name)}</span>
                                                            {
                                                                vm.doses.map(dose => (
                                                                    <div key={dose.id} className="flex items-center justify-between ml-4">
                                                                        <span className="text-sm text-gray-600 font-medium">
                                                                            {dose.number_dose}/{vm.total_dose} dose
                                                                        </span>
                                                                        <div className="flex items-center gap-2">
                                                                            <span className="uppercase text-sm text-gray-600 font-medium">
                                                                                {formatDate(dose.application_date)}
                                                                            </span>
                                                                            {
                                                                                dose.applied ? (<div className="flex justify-center bg-lime-normal w-[75px] rounded">
                                                                                <span className="text-sm font-light text-white">
                                                                                    tomado
                                                                                </span>
                                                                                </div>) : (<div className="flex justify-center bg-orangee-normal w-[75px] rounded">
                                                                                    <span className="text-sm font-light text-white">
                                                                                        falta
                                                                                    </span>
                                                                                </div>)
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    )
                                                }
                                                return null;
                                            })
                                        }
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <span className="text-md font-semibold">Vacinas</span>
                                        {
                                            post.animal.health.vaccines_medicines.map(vm => {
                                                if (vm.type === 0) {
                                                    return (
                                                        <div key={vm.id} className="flex flex-col gap-2 mx-4">
                                                            <span className="text-sm font-semibold">{formatWord(vm.name)}</span>
                                                            {
                                                                vm.doses.map(dose => (
                                                                    <div key={dose.id} className="flex items-center justify-between ml-4">
                                                                        <span className="text-sm text-gray-600 font-medium">
                                                                            {dose.number_dose}/{vm.total_dose} dose
                                                                        </span>
                                                                        <div className="flex items-center gap-2">
                                                                            <span className="uppercase text-sm text-gray-600 font-medium">
                                                                                {formatDate(dose.application_date)}
                                                                            </span>
                                                                            {
                                                                                dose.applied ? (<div className="flex justify-center bg-lime-normal w-[75px] rounded">
                                                                                <span className="text-sm font-light text-white">
                                                                                    tomado
                                                                                </span>
                                                                                </div>) : (<div className="flex justify-center bg-orangee-normal w-[75px] rounded">
                                                                                    <span className="text-sm font-light text-white">
                                                                                        falta
                                                                                    </span>
                                                                                </div>)
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    )
                                                }
                                                return null;
                                            })
                                        }
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <span className="text-md font-semibold">Doenças e Alergias</span>
                                        {
                                            post.animal.health.disease_allergy.map(da => (
                                                <div key={da.id} className="flex flex-col gap-2 mx-4 mb-2">
                                                    <div className="flex justify-between">
                                                        <span className="text-sm font-semibold">{formatWord(da.name)}</span>
                                                        <div className="flex items-center gap-2">
                                                            {
                                                                da.type == 0 ? (<div className="flex items-center gap-2">
                                                                    <div className="flex justify-center bg-darkblue-normal w-[75px] rounded">
                                                                        <span className="text-sm font-light text-white">
                                                                            doença
                                                                        </span>
                                                                    </div>
                                                                </div>) : (<div className="flex items-center gap-2">
                                                                    <div className="flex justify-center bg-darkblue-normal w-[75px] rounded">
                                                                        <span className="text-sm font-light text-white">
                                                                            alergia
                                                                        </span>
                                                                    </div>
                                                                </div>)
                                                            }
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between ml-4">
                                                        <span className="text-sm text-gray-600 font-medium">
                                                            {da.description}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>

                                    {
                                        post.animal.health.additional && (
                                            <div className="flex flex-col gap-2">
                                                <span className="text-md font-semibold">Informações adicionais</span>
                                                <span className="text-sm text-gray-600 font-medium mx-4">
                                                    {post.animal.health.additional}
                                                </span>
                                            </div>
                                        )
                                    }

                                    
                                </div>

                                <div className="h-[1px] w-full bg-darkblue-normal"></div>

                            </div>



                            <div className="flex justify-end gap-4 p-2">
                                <button
                                    ref={closeRef}
                                    type="button"
                                    className={`
                                        inline-flex w-min px-4 py-2 bg-orangee-normal rounded-md justify-center items-center shadow-btn border border-darktext-normal
                                        hover:bg-orange-600 active:bg-orange-400 active:shadow-btn-disable text-white active:text-black
                                    `}
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    <span className="text-sm font-semibold shadow-sm ">
                                        Fechar
                                    </span>
                                </button>
                                <button
                                    type="button"
                                    className={`
                                        inline-flex w-min px-4 py-2 bg-darkblue-normal rounded-md justify-center items-center shadow-btn border border-darktext-normal
                                        hover:bg-darkblue-hover active:bg-darkblue-light_active active:shadow-btn-disable text-white active:text-black
                                    `}
                                    onClick={handleAdopt}
                                >
                                    <span className="text-sm font-semibold shadow-sm">
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
