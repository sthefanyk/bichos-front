export default function Profile() {
    return (
        <>
            <div className="relative flex flex-col justify-center h-[350px] lg:h-[400px] w-full pt-20 lg:pt-24 -z-50">
                <div className="bg-lime-normal h-2/3 w-full"></div>
                <div className="absolute flex justify-center top-[25%] lg:top-[30%] lg:left-[20%] w-[250px]">
                    {/* <img src="../../../doguinho nerd 3.svg" alt="" /> */}
                </div>
                <div
                    className={`
                    absolute top-[55%] flex flex-col justify-center
                    h-[125px] w-[125px] px-10
                    bg-white border border-black rounded-lg
                `}
                >
                    
                </div>
                <div className="absolute bottom-[15%] right-0 hidden lg:block lg:w-[300px]">
                    {/* <img src="../../../dog-form-2.svg" alt="" /> */}
                </div>
                <div className="bg-beige-normal h-1/3 w-full"></div>
            </div>
        </>
    );
}
