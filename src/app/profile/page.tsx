import { BsPencil } from "react-icons/bs";

export default function Profile() {
    return (
        <>
            <div className="relative flex flex-col justify-center items-center h-min w-full pt-20 lg:pt-24 -z-50">
                <div className="bg-darkblue-normal h-[120px] md:h-[150px] w-full"></div>
                <div className="absolute flex justify-center top-[25%] lg:top-[50%] lg:left-[20%] w-[250px]">
                    {/* <img src="../../../doguinho nerd 3.svg" alt="" /> */}
                </div>
                <div className="w-[80%]">
                    <div
                        className={`
                            absolute top-[27%] md:top-[28%] lg:top-[26%] xl:top-[24%] xl3:top-[22%] flex flex-col justify-center
                            w-[11%] md:w-[13%] lg:w-[11%] xl:w-[9%] xl3:w-[7%] aspect-[1/1] px-10
                            bg-white border border-black rounded-full
                        `}
                    >
                        
                    </div>
                </div>
                <div className="bg-beige-normal w-full h-min flex justify-center">
                    <div className="relative flex flex-col justify-center h-full w-[80%] my-[10%] md:my-[7%] xl:my-[5%] xl3:my-[4%]">
                        <h1 className=" text-lg md:text-xl lg:text-2xl font-semibold">Nickname</h1>
                        <p className=" text-sm md:text-md lg:text-lg font-semibold text-gray-600">@username</p>

                        <p className="my-4 text-sm md:text-md lg:text-lg font-normal">
                            Descrição do perfil, Lorem ipsum dolor sit amet. Et repellat deleniti est vitae exercitationem a temporibus molestias. Aut omnis necessitatibus eos sint amet ad ipsam aspernatur et omnis beatae!  
                        </p>

                        <div className="flex flex-col gap-1 text-gray-600 text-sm md:text-md lg:text-lg font-normal">
                            <p>Bauru, SP</p>
                            <p>Nascido(a) em 27 de fevereiro de 2002</p>
                            <p>Ingressou em junho 2023</p>
                            <p>Bichos que colocou para adoção: 3</p>
                            <p>Bichos que solicitou apadrinhamento: 2</p>
                        </div>

                        <button
                            type="button"
                            className={`
                                inline-flex px-2 py-1 lg:px-4 lg:py-2 bg-orangee-normal rounded-md justify-center items-center shadow-btn border border-black 
                                w-min h-min mt-3 gap-2 absolute -top-10 right-0
                            `}
                        >
                            <BsPencil className="text-white h-3 font-semibold md:h-6" />
                            <span className={`
                                text-sm lg:text-md font-semibold text-white shadow-sm w-max
                            `}>
                                Editar perfil
                            </span>
                        </button>
                    </div>
                    
                </div>
            </div>
        </>
    );
}
