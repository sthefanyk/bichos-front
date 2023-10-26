import FormAdopt from "@/components/FormAdopt";
export default function PageAdoptFormPost() {
    return (
        <>
            <div className="relative flex flex-col justify-center items-center h-[350px] lg:h-[400px] w-full pt-20 lg:pt-24 -z-50">
                <div className="bg-lime-normal h-2/3 w-full"></div>
                <div className="absolute flex justify-center top-[25%] lg:top-[30%] lg:left-[20%] w-[250px]">
                    {/* <img src="../../../doguinho nerd 3.svg" alt="" /> */}
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
                    {/* <img src="../../../dog-form-2.svg" alt="" /> */}
                </div>
                <div className="bg-beige-normal h-1/3 w-full"></div>
            </div>
            <div className="bg-beige-normal flex justify-center w-full pb-[100px]">
                <FormAdopt />
            </div>
        </>
    )
}