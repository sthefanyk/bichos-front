"use client"
import { useState } from "react";

interface Response { 
    id_question: string 
    response: string 
}

interface QDescriptiveProps {
  id: string;
  question: string;
  handleResponse: (response: Response) => void;
}

const QDescriptive = (question: QDescriptiveProps) => {
    const [response, setResponse] = useState('');

    const handleChange = (e: any) => {
        setResponse(e.target.value);

        question.handleResponse({
            id_question: question.id, 
            response: e.target.value
        });
    };

    return (
        <div className={`
            p-4 rounded-lg
            bg-white border border-md border-black
        `}>
            <p className="text-lg font-normal mb-4">{question.question}</p>
            <input
                type="text" placeholder="Sua resposta"
                className={`
                    resize-none border-b-2 border-gray-500 bg-white
                    p-1 h-8 w-full
                    focus:outline-none focus:ring-b-4
                    focus:border-b-lightblue-normal focus:ring-lightblue-normal
                `}
                value={response}
                onChange={(e) =>handleChange(e)}
            />
        </div>
    )
        
}

export default QDescriptive