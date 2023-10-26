"use client"
// import { useState } from 'react';
// import { AiOutlineCloseCircle } from 'react-icons/ai';

const InputPhotos = () => {

    return (
      <>
        <div className="flex flex-col gap-2 w-full">
            <div className="flex gap-2 w-ful">
                <div className="bg-orangee-normal aspect-[1/1] w-3/4 rounded-lg">
                    
                </div>

                <div className="flex flex-col gap-2 w-1/4">
                    <div className="bg-orange-400 aspect-[1/1] w-full rounded-lg">
                        
                    </div>
                    <div className="bg-orange-300 aspect-[1/1] w-full rounded-lg">
                        
                    </div>
                    <div className="bg-orange-200 aspect-[1/1] w-full rounded-lg">
                    
                    </div>
                </div>
            </div>


            <button type="button" className={`
                inline-flex w-full px-8 py-3 h-12 bg-darkblue-normal rounded-md justify-center items-center shadow-btn border border-darktext-normal
            `}>
                <span className="text-md font-semibold text-white shadow-sm">
                    Adicionar imagem
                </span>
            </button>
        </div>
      </>
    );
};

export default InputPhotos;