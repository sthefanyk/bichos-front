"use client"
import { useState } from "react";
import QAlternative from "./QAlternative";
import QDescriptive from "./QDescriptive";
import CheckBox from "../CheckBox";

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

interface QuestionProps { 
    questions: Question[]
    adopt: (responses: Response[]) => void
}

const Questions = ({ questions, adopt }: QuestionProps) => {
    const [responses, setResponses] = useState<Response[]>([]);

    const [error, setError ] = useState(false);

    const [agreeStorageData, setAgreeStorageData ] = useState(false);
    const [agreeUseTerms, setAgreeUseTerms ] = useState(false);

    const handleResponse = async (response: Response) => {
        const existingResponseIndex = responses.findIndex(
            (res) => res.id_question === response.id_question
        );
    
        if (existingResponseIndex !== -1) {
            const updatedResponses = [...responses];
            updatedResponses[existingResponseIndex] = response;
            setResponses(updatedResponses);
        } else {
            setResponses((prevResponses) => [...prevResponses, response]);
        }
    }

    return (
        <div className="flex flex-col gap-4 mt-4">
            {
                questions.map((q: Question) => {
                    if (q.type === 1) {
                        return (
                            <div key={q.id}>
                                <QAlternative
                                    id={q.id}
                                    question={q.question}
                                    alternatives={q.alternatives}
                                    others={q.others}
                                    handleResponse={handleResponse} 
                                />
                            </div>
                        )
                    }

                    return (
                        <div key={q.id}>
                            <QDescriptive
                                id={q.id}
                                question={q.question} 
                                handleResponse={handleResponse} 
                            />
                        </div>
                    )
                })
            }

            <div className="flex flex-col gap-4 items-end">


            <section id="termsSection" className="flex flex-col gap-6 w-[50%]">
                <div className="flex flex-col gap-1 w-full">
                    <CheckBox 
                        id="agree_storage_data" 
                        label={(<span className="font-semibold">Concordo com armazenamento e uso dos dados informados.</span>)}
                        isChecked={agreeStorageData}
                        setIsChecked={setAgreeStorageData}
                    />
                    { error && !agreeStorageData && <span className="text-xs text-red-600 font-semibold">É necessário aceitar o armazenamento e uso dos dados informados.</span> }
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
                    { error && !agreeUseTerms && <span className="text-xs text-red-600 font-semibold">É necessário aceitar os termos de uso.</span> }
                </div>
                
            </section>

            <button  
                onClick={() => adopt(responses)}
                className={`
                inline-flex w-[50%] px-6 py-3 h-12 bg-darkblue-normal rounded-md justify-center items-center shadow-btn border border-darktext-normal
                `}>
                <span className="text-md font-semibold text-white shadow-sm">
                    Adotar
                </span>
            </button>
            </div>
        </div>
    )
        
}

export default Questions