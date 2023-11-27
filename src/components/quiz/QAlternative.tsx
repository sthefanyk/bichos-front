"use client"
import { useState } from "react";

interface Response { 
    id_question: string 
    response: string 
}

interface QAlternativeProps {
  id: string;
  question: string;
  alternatives: {
    id: string;
    alternative: string;
  }[];
  others: boolean;
  handleResponse: (response: Response) => void;
}

const QAlternative = (question: QAlternativeProps) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [other, setOther] = useState('');

    return (
        <div className={`
            p-4 rounded-lg
            bg-white border border-md border-black
        `}>
            <p className="text-lg font-normal mb-4">{question.question}</p>
            
            {
                question.alternatives.map(a => (
                    <div key={a.id} className="py-1">
                        <label>
                            <input
                            type="radio"
                            value={a.alternative}
                            checked={selectedOption === a.alternative}
                            onChange={e => {
                                setOther('');
                                setSelectedOption(e.target.value);
                        
                                question.handleResponse({
                                    id_question: question.id, 
                                    response: e.target.value
                                });
                            }}
                            />
                            <span className="ml-2">{a.alternative}</span>
                        </label>
                    </div>
                ))
            }
            {
                question.others && (
                    <div className="flex items-center gap-2 h-6">
                        <span className="h-6">Outros:</span>
                        
                        <input
                            type="text"
                            className={`
                                resize-none border-b-2 border-gray-500 bg-white
                                p-1 h-6 w-full
                                focus:outline-none focus:ring-b-4
                                focus:border-b-lightblue-normal focus:ring-lightblue-normal
                            `}
                            value={other}
                            onChange={(e) => {
                                setSelectedOption('');
                                setOther(e.target.value)

                                question.handleResponse({
                                    id_question: question.id, 
                                    response: e.target.value
                                });
                            }}
                        />
                    </div>
                )
            }
        </div>
    )
        
}

export default QAlternative