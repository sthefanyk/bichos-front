"use client"
import AddMedVac from "@/components/AddMedVac";
import DiseaseAllergy from "@/components/DiseaseAllergy";
import AddPersonality from "@/components/AddPersonality";
import CheckBox from "@/components/CheckBox";
import InputPhotos from "@/components/InputPhotos";

import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

const createPostFormSchema = z.object({
    name_animal: z.string().min(1, 'Por favor, insira o nome do bicho.'),
    type: z.string().nullable().refine(type => type, 'Por favor, informe o tipo do bicho.'),
    porte_atual: z.string().nullable().refine(porte_atual => porte_atual, 'Por favor, informe o porte atual do bicho.'),
    porte_estimado: z.string().nullable().refine(porte_estimado => porte_estimado, 'Por favor, informe o porte estimado do bicho.'),
    sex: z.string().min(1, 'Por favor, informe o sexo do bicho.'),
    raca: z.string().min(1, 'Por favor, informe a raça do bicho.'),
    birth_date: z.string()
    .refine(date => date !== '', 'Por favor, insira a data de nascimento do bicho.')
    .refine(date => new Date(date) < new Date(), 'Por favor, insira uma data válida.'),
    history: z.string().min(5, 'Por favor, insira a história do bicho.'),
    caracteristica: z.string().min(5, 'Por favor, insira a característica do bicho.'),
    infoAdicional: z.string().optional(),
    motivo: z.string(),
    name: z.string().min(1, 'Por favor, insira o nome.'),
    email: z.string().min(1, 'Por favor, insira o e-mail.').email('E-mail inválido.'),
    phone: z.string().min(1, 'Por favor, insira o telefone.').refine((value) => {
        const phoneRegex = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
        return phoneRegex.test(value); // Exemplos válidos: +55 (11) 98888-8888 / 9999-9999 / 21 98888-8888 / 5511988888888
    }, {
        message: 'Número de telefone inválido. Use o formato (XX) XXXXX-XXXX.',
    }),
    state: z.string().min(1, 'Por favor, informe o estado.'),
    city: z.string().min(1, 'Por favor, informe a cidade.'),

});

type CreatePostFormData = z.infer<typeof createPostFormSchema>;

interface DosesProps {
    date: string;
    tomado: boolean;
}

interface MedVacProps {
    name: string;
    doses: DosesProps[];
}

interface DiseaseAllergyProps {
    name: string;
    description: string;
    type: string;
}

const FormAdopt = () => {

    const { 
        register, 
        handleSubmit, 
        watch,
        formState: { errors },
        reset
    } = useForm<CreatePostFormData>({
        resolver: zodResolver(createPostFormSchema)
    });

    const selectedType = watch("type");
    const selectedPorteAtual = watch("porte_atual");
    const selectedPorteEstimado = watch("porte_estimado");
    const motivo = watch("motivo");

    const [personalities, setPersonalities ] = useState(['brincalhão', 'dorminhoco']);
    const [isCastrado, setIsCastrado ] = useState(false);
    const [isUrgent, setIsUrgent ] = useState(false);

    const [agreeStorageData, setAgreeStorageData ] = useState(false);
    const [agreeUseTerms, setAgreeUseTerms ] = useState(false);

    const [error, setError ] = useState(false);

    const [medicamentos, setMedicamentos] = useState<MedVacProps[]>([]);
    const [vacinas, setVacinas] = useState<MedVacProps[]>([]);
    const [diseaseAllergy, setDiseaseAllergy] = useState<DiseaseAllergyProps[]>([
        // {
        //     name: "Nome da doença",
        //     description: 'Descrição sobre doença e como está sendo tratada atualmente.',
        //     type: 1
        // },
        // {
        //     name: "Nome da alergia",
        //     description: 'Descrição sobre alergia e como está sendo tratada atualmente.',
        //     type: 2
        // },
    ]);

    const section = useRef<HTMLElement | null>(null);
    const scrollToSection = () => {
        if (section.current) {
            section.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const { push } = useRouter();

    const createPost = (data: CreatePostFormData) => {
        
        if (personalities.length === 0) {
            section.current = document.getElementById('personalitySection');
            scrollToSection();
            return
        }

        if (isUrgent && !data.motivo) {
            setError(true);
            section.current = document.getElementById('urgentSection');
            scrollToSection();
            return
        }

        if (!agreeUseTerms && !agreeStorageData) {
            setError(true);
            section.current = document.getElementById('termsSection');
            scrollToSection();
            return
        }

        reset();
        setError(false);
        // modal de confirmação
        // chama api
        console.log({...data, isCastrado, personalities, medicamentos, vacinas, diseaseAllergy, isUrgent, agreeStorageData, agreeUseTerms });


        push("/");
    }

    return (
    <>
        <form action="" onSubmit={handleSubmit(createPost)} className="flex flex-col lg:flex-row justify-between w-4/5 gap-8" >
            <div className="flex flex-col gap-8 w-full">
                <section className={`
                    flex flex-col gap-6
                    p-4 
                    bg-white border border-black rounded-xl 
                `}>
                    <h2 className="text-xl font-semibold">Sobre o bicho</h2>
                    <div className="flex flex-col gap-2">
                        <p className="text-md font-semibold">Tipo: </p>
                        <div className="flex gap-2">
                            <label className={`
                                border border-black rounded-md p-2 h-10 w-10 cursor-pointer
                                ${selectedType === "dog" ? "bg-lime-normal" : ""}
                            `}>
                                <input
                                    {...register("type")}
                                    type="radio"
                                    value="dog"
                                    className="sr-only"
                                />
                                C
                            </label>
                            <label className={`
                                border border-black rounded-md p-2 h-10 w-10 cursor-pointer
                                ${selectedType === "cat" ? "bg-lime-normal" : ""}
                            `}>
                                <input
                                    {...register("type")}
                                    type="radio"
                                    value="cat"
                                    className="sr-only"
                                />
                                G
                            </label>
                        </div>
                        { errors.type && <span className="text-sm text-red-600">{errors.type.message}</span> }
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-md font-semibold">Nome: </p>
                        <input
                            type="text" placeholder="Nome do bicho"
                            className={`
                                resize-none border border-black rounded-md bg-white
                                p-2 h-10
                                focus:outline-none focus:ring-2 focus:border-lightblue-normal focus:ring-lightblue-normal
                            `}
                            {...register('name_animal')}
                        />
                        { errors.name_animal && <span className="text-sm text-red-600">{errors.name_animal.message}</span> }
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-md font-semibold">Sexo: </p>
                        <select
                            className={`
                                resize-none border border-black rounded-md
                                p-2 h-10
                                focus:outline-none focus:ring-2 focus:border-lightblue-normal focus:ring-lightblue-normal
                            `}
                            defaultValue=""
                            {...register('sex')}
                        >
                            <option value="" disabled>Sexo do bicho</option>
                            <option value="F">Femea</option>
                            <option value="M">Macho</option>
                        </select>
                        { errors.sex && <span className="text-sm text-red-600">{errors.sex.message}</span> }
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-md font-semibold">Raça: </p>
                        <select
                            className={`
                                resize-none border border-black rounded-md
                                p-2 h-10
                                focus:outline-none focus:ring-2 focus:border-lightblue-normal focus:ring-lightblue-normal
                            `}
                            defaultValue=""
                            {...register('raca')}
                        >
                            <option value="" disabled>Raça do bicho</option>
                            <option value="Vira-Lata">Vira-Lata</option>
                            <option value="York Shire">York Shire</option>
                        </select>
                        { errors.raca && <span className="text-sm text-red-600">{errors.raca.message}</span> }
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-md font-semibold">Data de nascimento: </p>
                        <input 
                            type="date"
                            className={`
                            resize-none border border-black rounded-md
                            p-2 h-10
                            focus:outline-none focus:ring-2 focus:border-lightblue-normal focus:ring-lightblue-normal
                            `} 
                            {...register('birth_date')}
                        />
                        { errors.birth_date && <span className="text-sm text-red-600">{errors.birth_date.message}</span> }
                    </div>

                    <div className="flex justify-between">
                        <div className="flex flex-col gap-2">
                            <p className="text-md font-semibold">Porte atual: </p>
                            <div className="flex gap-2">
                                <label className={`
                                    border border-black rounded-md p-2 h-10 w-10 cursor-pointer
                                    ${selectedPorteAtual === "small" ? "bg-lime-normal" : ""}
                                `}>
                                    <input
                                        {...register("porte_atual")}
                                        type="radio"
                                        value="small"
                                        className="sr-only"
                                    />
                                    P
                                </label>
                                <label className={`
                                    border border-black rounded-md p-2 h-10 w-10 cursor-pointer
                                    ${selectedPorteAtual === "medium" ? "bg-lime-normal" : ""}
                                `}>
                                    <input
                                        {...register("porte_atual")}
                                        type="radio"
                                        value="medium"
                                        className="sr-only"
                                    />
                                    M
                                </label>
                                <label className={`
                                    border border-black rounded-md p-2 h-10 w-10 cursor-pointer
                                    ${selectedPorteAtual === "large" ? "bg-lime-normal" : ""}
                                `}>
                                    <input
                                        {...register("porte_atual")}
                                        type="radio"
                                        value="large"
                                        className="sr-only"
                                    />
                                    G
                                </label>
                            </div>
                            { errors.porte_atual && <span className="text-sm text-red-600">{errors.porte_atual.message}</span> }
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-md font-semibold">Porte estimado: </p>
                            <div className="flex gap-2">
                                <label className={`
                                    border border-black rounded-md p-2 h-10 w-10 cursor-pointer
                                    ${selectedPorteEstimado === "small" ? "bg-lime-normal" : ""}
                                `}>
                                    <input
                                        {...register("porte_estimado")}
                                        type="radio"
                                        value="small"
                                        className="sr-only"
                                    />
                                    P
                                </label>
                                <label className={`
                                    border border-black rounded-md p-2 h-10 w-10 cursor-pointer
                                    ${selectedPorteEstimado === "medium" ? "bg-lime-normal" : ""}
                                `}>
                                    <input
                                        {...register("porte_estimado")}
                                        type="radio"
                                        value="medium"
                                        className="sr-only"
                                    />
                                    M
                                </label>
                                <label className={`
                                    border border-black rounded-md p-2 h-10 w-10 cursor-pointer
                                    ${selectedPorteEstimado === "large" ? "bg-lime-normal" : ""}
                                `}>
                                    <input
                                        {...register("porte_estimado")}
                                        type="radio"
                                        value="large"
                                        className="sr-only"
                                    />
                                    G
                                </label>
                            </div>
                            { errors.porte_estimado && <span className="text-sm text-red-600">{errors.porte_estimado.message}</span> }
                        </div>
                    </div>
                </section>

                <section className={`
                    flex flex-col gap-6
                    p-4 
                    bg-white border border-black rounded-xl 
                `}>
                    <h2 className="text-xl font-semibold">Perfil</h2>
                    <div className="flex flex-col gap-2">
                        <p className="text-md font-semibold">História</p>
                        <textarea 
                            placeholder="Descreva aqui a história do bicho."
                            className={`
                                resize-none border border-black rounded-md 
                                p-2 h-[150px] 
                                focus:outline-none focus:ring-2 focus:border-lightblue-normal focus:ring-lightblue-normal
                            `}
                            {...register("history")}
                        ></textarea>
                        { errors.history && <span className="text-sm text-red-600">{errors.history.message}</span> }
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-md font-semibold">Características</p>
                        <textarea 
                            placeholder="Ele(a) é único(a). Descreva aqui as características do bicho, coisas engraçadas, estranhas, costumes, características físicas, etc."
                            className={`
                                resize-none border border-black rounded-md 
                                p-2 h-[150px] 
                                focus:outline-none focus:ring-2 focus:border-lightblue-normal focus:ring-lightblue-normal
                            `}
                            {...register("caracteristica")}
                        ></textarea>
                        { errors.caracteristica && <span className="text-sm text-red-600">{errors.caracteristica.message}</span> }
                    </div>
                    <div id="personalitySection" className="flex flex-col gap-2">
                        <p className="text-md font-semibold">Personalidade</p>
                        <AddPersonality personalities={personalities} setPersonalities={setPersonalities}/>
                    </div>
                </section>

                <section className={`
                    flex flex-col gap-6
                    p-4 
                    bg-white border border-black rounded-xl 
                `}>
                    <h2 className="text-xl font-semibold">Fotos do bicho</h2>
                    <div className="flex flex-col gap-2">
                        <p className="text-md font-semibold text-gray-700">Carregue a imagem ou arraste e solte aqui</p>
                        <InputPhotos />
                    </div>
                </section>
            </div>
            <div className="flex flex-col gap-8 w-full">
                <section className={`
                    flex flex-col gap-6
                    p-4
                    bg-white border border-black rounded-xl 
                `}>
                    <h2 className="text-xl font-semibold">Saúde do bicho</h2>
                    <CheckBox id="castrado" label="Castrado(a)" isChecked={isCastrado} setIsChecked={setIsCastrado} />
                    <div className="flex flex-col gap-2">
                        <p className="text-md font-semibold">Medicamentos</p>
                        <AddMedVac medOrVac="Medicamento" medVac={medicamentos} setMedVac={setMedicamentos} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-md font-semibold">Vacinas</p>
                        <AddMedVac medOrVac="Vacina" medVac={vacinas} setMedVac={setVacinas} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-md font-semibold">Doenças e Alergias</p>
                        <DiseaseAllergy diseaseAllergy={diseaseAllergy} setDiseaseAllergy={setDiseaseAllergy}/>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-md font-semibold">Informações adicionais</p>
                        <textarea
                            placeholder="Descreva aqui informações que considere necessárias e relevantes para o adotante saber sobre a saúde do animal."
                            className={`
                                resize-none border border-black rounded-md 
                                p-2 h-[120px] 
                                focus:outline-none focus:ring-2 focus:border-lightblue-normal focus:ring-lightblue-normal
                            `}
                            {...register("infoAdicional")}
                        ></textarea>
                        { errors.infoAdicional && <span className="text-sm text-red-600">{errors.infoAdicional.message}</span> }
                    </div>
                </section>

                <section className={`
                    flex flex-col gap-6
                    p-4
                    bg-white border border-black rounded-xl 
                `}>
                    <h2 className="text-xl font-semibold">Sobre a adoção</h2>
                    <CheckBox id="urgente" label="Urgente" isChecked={isUrgent} setIsChecked={setIsUrgent} />
                    <div id="urgentSection" className="flex flex-col gap-2">
                        <p className="text-md font-semibold">Motivo da urgência</p>
                        <textarea 
                            placeholder="Digite aqui motivo da urgência"
                            className={`
                                resize-none border border-black rounded-md 
                                p-2 h-[120px] 
                                focus:outline-none focus:ring-2 focus:border-lightblue-normal focus:ring-lightblue-normal
                            `}
                            {...register("motivo")}
                        ></textarea>
                        { error && isUrgent && !motivo && <span className="text-sm text-red-600">Por favor, insira o motivo da urgência.</span> }
                    </div>                           
                </section>

                <section className={`
                    flex flex-col gap-6
                    p-4
                    bg-white border border-black rounded-xl 
                `}>
                    <h2 className="text-xl font-semibold">Informações de contato</h2>
                    <div className="flex flex-col gap-2">
                        <p className="text-md font-semibold">Nome: </p>
                        <input 
                            type="text" placeholder="Seu nome" 
                            className={`
                                resize-none border border-black rounded-md
                                p-2 h-10
                                focus:outline-none focus:ring-2 focus:border-lightblue-normal focus:ring-lightblue-normal
                            `}
                            {...register('name')}
                        />
                        { errors.name && <span className="text-sm text-red-600">{errors.name.message}</span> }
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-md font-semibold">E-mail: </p>
                        <input 
                            type="text" placeholder="E-mail" 
                            className={`
                                resize-none border border-black rounded-md
                                p-2 h-10
                                focus:outline-none focus:ring-2 focus:border-lightblue-normal focus:ring-lightblue-normal
                            `}
                            {...register('email')}
                        />
                        { errors.email && <span className="text-sm text-red-600">{errors.email.message}</span> }
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-md font-semibold">Telefone (WhatsApp): </p>
                        <input 
                            type="text" 
                            placeholder="(XX) XXXXX-XXXX" 
                            className={`
                                resize-none border border-black rounded-md
                                p-2 h-10
                                focus:outline-none focus:ring-2 focus:border-lightblue-normal focus:ring-lightblue-normal
                            `}
                            {...register('phone')} 
                        />
                        {errors.phone && <span className="text-sm text-red-600">{errors.phone.message}</span>}
                    </div>
                    <div className="flex gap-2">
                        <div className="flex flex-col gap-2 grow">
                            <p className="text-md font-semibold">Estado: </p>
                            <select
                                className={`
                                    resize-none border border-black rounded-md
                                    p-2 h-10
                                    focus:outline-none focus:ring-2 focus:border-lightblue-normal focus:ring-lightblue-normal
                                `}
                                defaultValue=""
                                {...register('state')}
                            >
                                <option value="" disabled>Estado</option>
                                <option value="PR">Paraná</option>
                                <option value="SP">São Paulo</option>
                            </select>
                            { errors.state && <span className="text-sm text-red-600">{errors.state.message}</span> }
                        </div>
                        <div className="flex flex-col gap-2 grow">
                            <p className="text-md font-semibold">Cidade: </p>
                            <select
                                className={`
                                    resize-none border border-black rounded-md
                                    p-2 h-10
                                    focus:outline-none focus:ring-2 focus:border-lightblue-normal focus:ring-lightblue-normal
                                `}
                                defaultValue=""
                                {...register('city')}
                            >
                                <option value="" disabled>Cidade</option>
                                <option value="Paranaguá">Paranaguá</option>
                                <option value="Curitiba">Curitiba</option>
                            </select>
                            { errors.city && <span className="text-sm text-red-600">{errors.city.message}</span> }
                        </div>
                    </div>
                </section>

                <section id="termsSection" className="flex flex-col gap-6 w-full">
                    <div className="flex flex-col gap-1 w-full">
                        <CheckBox 
                            id="agree_storage_data" 
                            label={(<span className="font-semibold">Concordo com armazenamento e uso dos dados informados.</span>)}
                            isChecked={agreeStorageData}
                            setIsChecked={setAgreeStorageData}
                        />
                        { error && !agreeStorageData && <span className="text-sm text-red-600">É necessário aceitar o armazenamento e uso dos dados informados.</span> }
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <CheckBox 
                            id="agree_use_terms"
                            label={(
                                <span className="font-semibold">
                                    Li e concordo com os <span className="text-darkblue-normal">Termos de Uso.</span>
                                </span>)
                            }
                            isChecked={agreeUseTerms}
                            setIsChecked={setAgreeUseTerms}
                        />
                        { error && !agreeUseTerms && <span className="text-sm text-red-600">É necessário aceitar os termos de uso.</span> }
                    </div>
                    
                </section>

                <button type="submit" className={`
                    inline-flex w-full px-6 py-3 h-12 bg-darkblue-normal rounded-md justify-center items-center shadow-btn border border-darktext-normal
                `}>
                    <span className="text-md font-semibold text-white shadow-sm">
                        Publicar
                    </span>
                </button>
            </div>
        </form>
    </>
  )
}

export default FormAdopt