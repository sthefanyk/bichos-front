"use client"
import { PersonalityContext } from '@/contexts/PersonalityContext';
import { useContext, useState } from 'react';
import { AiOutlineCloseCircle, AiOutlinePlus } from 'react-icons/ai';

type PersonalitiesProps = {
  personalities: string[],
  setPersonalities: any
}

const AddPersonality = ({personalities, setPersonalities }: PersonalitiesProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPersonality, setNewPersonality] = useState('');
    const { personalitiesData } = useContext(PersonalityContext);

    const handleRemovePersonality = (index: number) => {
      const updatedOptions = [...personalities];
      updatedOptions.splice(index, 1);
      setPersonalities(updatedOptions);
    };

    const handleAddPersonality = () => {
      setIsModalOpen(true);
    };
  
    const handleModalConfirm = () => {
      let exits = false;
      
      personalities.forEach(p => {
        if(newPersonality === p) {
          exits = true;
        }
      })
      
      if (!exits) {
        setPersonalities([...personalities, newPersonality]);
      }

      setIsModalOpen(false);
      setNewPersonality('');
    };
  
    const handleModalCancel = () => {
      setIsModalOpen(false);
      setNewPersonality('');
    };

    return (
      <>
        <div className='flex gap-2 flex-wrap'>
          {
            personalities.map((personality, index) => (
              <div key={index} className='flex gap-2 items-center bg-darkblue-normal w-min px-2 py-1 rounded-md'>
                <span className='uppercase text-sm text-white font-medium'>{personality}</span>
                <button type="button" onClick={() => handleRemovePersonality(index)}><AiOutlineCloseCircle className="text-white w-4 h-4" /></button>
              </div>
            ))
          }
          { personalities.length === 0 && <span className="text-sm text-red-600">Por favor, adicione ao menos uma personalidade.</span> }
        </div>
        
        <button type="button" className='flex items-center gap-1' onClick={handleAddPersonality}>
        <AiOutlinePlus className="text-gray-600 h-5 w-5" />
        <span className='text-gray-600 text-md'>Personalidade</span>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md w-1/2 lg:w-1/4">
            <h2 className="text-lg mb-4 font-semibold">Adicionar personalidade</h2>
            <select
                className={`
                  w-full p-2 border border-gray-300 rounded-sm mb-4
                `}
                defaultValue={newPersonality}
                onChange={(e) => setNewPersonality(e.target.value)}
            >
                <option key="" value="" disabled>
                    Personalidade
                </option>
                {
                    personalitiesData.map((personality) => (
                        <option key={personality.id} value={personality.name}>
                            {personality.name}
                        </option>
                    ))
                }
            </select>
            <div className="flex justify-end gap-4">
              <button type="button" className="text-gray-600 font-semibold" onClick={handleModalCancel}>
                Cancelar
              </button>
              <button type="button" className="text-darkblue-normal font-semibold" onClick={handleModalConfirm}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
      </>
    );
};

export default AddPersonality;

