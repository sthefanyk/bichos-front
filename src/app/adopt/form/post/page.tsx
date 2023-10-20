import AddMedVac from "@/components/AddMedVac";
import DiseaseAllergy from "@/components/DiseaseAllergy";
import AddPersonality from "@/components/AddPersonality";
import CheckBox from "@/components/CheckBox";
import Navbar from "@/components/Navbar";
import RadioButtons from "@/components/RadioButtons";
import RadioButtonsSize from "@/components/RadioButtonsSize";

export default function PageAdoptFormPost() {
    return (
        <>
            <Navbar page='home'/>
            <div className="relative flex flex-col justify-center items-center h-[350px] lg:h-[400px] w-full pt-20 lg:pt-24 -z-50">
                <div className="bg-lime-normal h-2/3 w-full"></div>
                <div className="absolute flex justify-center top-[25%] lg:top-[30%] lg:left-[20%] w-[250px]">
                    <img src="../../../doguinho nerd 3.svg" alt="" />
                </div>
                <div className={`
                    absolute top-[55%] flex flex-col justify-center
                    h-[125px] w-[80%] px-10
                    bg-white border border-black rounded-lg
                `}>
                    <h1 className="text-xl lg:text-2xl font-semibold">Colocar para adoção</h1>
                    <p className="text-md lg:text-lg font-medium text-gray-600">Conte-nos sobre o bicho</p>
                </div>
                <div className="absolute bottom-[15%] right-0 hidden lg:block lg:w-[300px]">
                    <img src="../../../dog-form-2.svg" alt="" />
                </div>
                <div className="bg-beige-normal h-1/3 w-full"></div>
            </div>
            <div className="bg-beige-normal flex justify-center w-full">
                <form action="" className="flex justify-between w-4/5 gap-8" >
                    <div className="flex flex-col gap-8 w-full">
                        <section className={`
                            flex flex-col gap-4
                            p-4 
                            bg-white border border-black rounded-xl 
                        `}>
                            <h2 className="text-lg font-semibold">Sobre o bicho</h2>
                            <RadioButtons />
                            <input type="text" placeholder="Nome" className="border border-black rounded-md p-2 h-10" />
                            <select 
                                name="sex" id="" required
                                className="border border-black rounded-md p-2 h-10"
                            >
                                <option value="" disabled>Sexo</option>
                                <option value="F">Femea</option>
                                <option value="M">Macho</option>
                            </select>
                            <select 
                                name="raca" id="" required
                                className="border border-black rounded-md p-2 h-10"
                            >
                                <option value="" disabled>Raça</option>
                                <option value="F">Vira-Lata</option>
                                <option value="M">York Shire</option>
                            </select>
                            <input type="date" placeholder="Data de nascimento" className="border border-black rounded-md p-2 h-10" />
                            <div className="flex justify-between">
                                <div>
                                    <p>Porte atual: </p>
                                    <RadioButtonsSize name="porte_atual" />
                                </div>
                                <div>
                                    <p>Porte estimado: </p>
                                    <RadioButtonsSize name="porte_estimado"/>
                                </div>
                            </div>
                        </section>

                        <section className={`
                            flex flex-col gap-4
                            p-4 
                            bg-white border border-black rounded-xl 
                        `}>
                            <h2 className="text-lg font-semibold">Perfil</h2>
                            <div className="flex flex-col gap-2">
                                <p className="text-md font-medium">História</p>
                                <textarea 
                                    name="" id="" placeholder="Descreva aqui a história do bicho."
                                    className={`
                                        resize-none border border-black rounded-md 
                                        p-2 h-[150px] 
                                        focus:outline-none focus:ring-2 focus:border-lightblue-normal focus:ring-lightblue-normal
                                    `}
                                ></textarea>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-md font-medium">Características</p>
                                <textarea 
                                    name="" id="" placeholder="Ele(a) é único(a). Descreva aqui as características do bicho, coisas engraçadas, estranhas, costumes, características físicas, etc."
                                    className={`
                                        resize-none border border-black rounded-md 
                                        p-2 h-[150px] 
                                        focus:outline-none focus:ring-2 focus:border-lightblue-normal focus:ring-lightblue-normal
                                    `}
                                ></textarea>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-md font-medium">Personalidade</p>
                                <AddPersonality />
                            </div>
                        </section>
                    </div>
                    <div className="flex flex-col gap-8 w-full">
                        <section className={`
                            flex flex-col gap-4
                            p-4 
                            bg-white border border-black rounded-xl 
                        `}>
                            <h2 className="text-lg font-semibold">Saúde do bicho</h2>
                            <CheckBox id="castrado" label="Castrado(a)"/>
                            <div className="flex flex-col gap-2">
                                <p className="text-md font-medium">Medicamentos</p>
                                <AddMedVac medOrVac="Medicamento"/>
                            </div>

                            <div className="flex flex-col gap-2">
                                <p className="text-md font-medium">Vacinas</p>
                                <AddMedVac medOrVac="Vacina"/>
                            </div>

                            <div className="flex flex-col gap-2">
                                <p className="text-md font-medium">Doenças e Alergias</p>
                                <DiseaseAllergy />
                            </div>                            
                        </section>
                    </div>
                </form>
            </div>
        </>
    )
}