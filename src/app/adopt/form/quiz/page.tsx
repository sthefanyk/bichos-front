// "use client"
import FormAdopt from "@/components/FormAdopt";
import Adopt from "@/components/quiz/Adopt";
import QAlternative from "@/components/quiz/QAlternative";
import QDescriptive from "@/components/quiz/QDescriptive";
import Questions from "@/components/quiz/Questions";

interface Response { 
    id_question: string 
    response: string 
}

interface Question {
    id: string;
    question: string;
    type: number;
    alternatives: {
        id: string;
        alternative: string;
    }[];
    others: boolean;
}

interface Quiz {
    id: string;
    title: string;
    description: string;
    questions: Question[];
}

interface AdoptData{
    id_adopter: string;
    id_post: string;
    id_quiz: string;
    responses: Response[]
}

export default async function PageAdoptFormQuiz() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/quiz/c4500a51-2172-448a-baaa-c6f0c4efed96`, {
        cache: "no-store",
    });

    const quiz: Quiz = await res.json();

    const adopt = async (data: AdoptData) => {
        "use server";

        const url = `${process.env.NEXT_PUBLIC_URL_API}/adopt`;
	
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
	
		const responseData = await response.json();

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
                <div className={`
                    absolute top-[55%] flex flex-col justify-center
                    h-[125px] w-[80%] px-10
                    bg-white border border-black rounded-lg
                `}>
                    <h1 className="text-xl lg:text-2xl font-semibold">{quiz.title}</h1>
                    <p className="text-md lg:text-lg font-medium text-gray-600">{quiz.description}</p>
                </div>
                <div className="absolute bottom-[15%] right-0 hidden lg:block lg:w-[300px]">
                    <picture>
                        <img src="../../../dog-form-2.svg" alt="" />
                    </picture>
                </div>
                <div className="bg-beige-normal h-1/3 w-full"></div>
            </div>
            <div className="flex flex-col items-center bg-beige-normal w-full">
                <div className="flex flex-col pb-[100px] w-[80%]">
                    {/* <h1 className="text-2xl font-semibold mb-4">Sobre você</h1>
                    <p className="text-lg font-semibold">Você está ciente que esta é uma adoção conjunta?</p>
                    <p className="text-gray-600">{quiz.description}</p> */}

                    <Adopt
                        id_quiz={quiz.id}
                        adopt={adopt}
                        questions={quiz.questions}
                    />
                </div>
            </div>
            
        </>
    )
}