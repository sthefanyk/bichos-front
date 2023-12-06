import FormAdopt from "@/components/FormAdopt";

export type DiseaseAllergy = {
    name: string;
    description: string;
    type: string;
}

export type InputPost = {
    urgent: boolean;
    urgency_justification?: string;
    posted_by: string;

    size_current: number;
    size_estimated: number;
    breed: string;
    name: string;
    sex: number;
    date_birth: string;
    specie: number;
    characteristic: string;
    history: string;
    personalities: string[];

    main_image: string;
    second_image: string;
    third_image: string;
    fourth_image: string;

    health: {
        neutered: boolean;
        vaccines_medicines: {
            name: string;
            type: number;
            doses: {
                number_dose: number;
                application_date: string;
                applied: boolean;
            }[];
            total_dose: number;
        }[];
        disease_allergy: DiseaseAllergy[];
        additional: string;
    };

    contact: {
        name: string;
        email: string;
        phone: string;
        city: string;
    };
};

export default function PageAdoptFormPost() {
    async function post(data: InputPost) {
        "use server";
        const url = `${process.env.NEXT_PUBLIC_URL_API}/post/adopt`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        console.log(data);
        console.log(responseData);

        return responseData;
    }

    return (
        <>
            <div className="relative flex flex-col justify-center items-center h-[350px] lg:h-[400px] w-full pt-20 lg:pt-24 -z-50">
                <div className="bg-lime-normal h-2/3 w-full"></div>
                <div className="absolute flex justify-center top-[25%] lg:top-[30%] lg:left-[20%] w-[250px]">
                    <picture>
                        <img src="../../../doguinho nerd 3.svg" alt="" />
                    </picture>
                </div>
                <div
                    className={`
                    absolute top-[55%] flex flex-col justify-center
                    h-[125px] w-[80%] px-10
                    bg-white border border-black rounded-lg
                `}
                >
                    <h1 className="text-xl lg:text-2xl font-semibold">
                        Colocar para adoção
                    </h1>
                    <p className="text-md lg:text-lg font-medium text-gray-600">
                        Conte-nos sobre o bicho
                    </p>
                </div>
                <div className="absolute bottom-[15%] right-0 hidden lg:block lg:w-[300px]">
                    <picture>
                        <img src="../../../dog-form-2.svg" alt="" />
                    </picture>
                </div>
                <div className="bg-beige-normal h-1/3 w-full"></div>
            </div>
            <div className="bg-beige-normal flex justify-center w-full pb-[100px]">
                <FormAdopt post={post} />
            </div>
        </>
    );
}
