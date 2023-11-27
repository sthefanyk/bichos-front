"use client"
import { useContext, useState } from "react";
import Questions from "./Questions";
import { AuthContext } from "@/contexts/AuthContext";
import { PostContext } from "@/contexts/PostContext";
import { AiOutlineCloseCircle } from "react-icons/ai";

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

interface AdoptData{
    id_adopter: string;
    id_post: string;
    id_quiz: string;
    responses: Response[]
}

interface AdoptProps{
    id_quiz: string;
    questions: Question[]
    adopt: (data: AdoptData) => any
}

const Adopt = ({ questions, adopt, id_quiz }: AdoptProps) => {
    const { user } = useContext(AuthContext);
    const { selectedPostId } = useContext(PostContext);
    
    const [error, setError] = useState('');
    const [isModalOpenError, setIsModalOpenError] = useState(false);

    const handleChange = async (responses: Response[]) => {
        const response = await adopt({
            id_adopter: user?.id as any,
            id_post: selectedPostId,
            id_quiz,
            responses
        });

        setError('');
        
        if (response.error) {
            setError(response.message);
            setIsModalOpenError(true);
        }

    }

    return (
        <>
        <Questions 
            questions={questions}
            adopt={handleChange}
        />

        {isModalOpenError && (
            <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
                <div className="flex bg-white p-4 rounded shadow-md w-1/2 lg:w-1/4 justify-between ">
                    <span className="text-md text-red-600 font-semibold">
                        {error}
                    </span>
                    <button onClick={() => setIsModalOpenError(false)}>
                        <AiOutlineCloseCircle className="text-red-600 w-6 h-6"/>
                    </button>
                </div>
            </div>
        )}
        </>
    )
        
}

export default Adopt