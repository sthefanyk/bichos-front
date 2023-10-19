"use client"
import { useState } from 'react';
import { AiOutlineCloseCircle, AiOutlinePlus } from 'react-icons/ai';

const AddPersonality = () => {
    const [selectedOption, setSelectedOption] = useState(['bricalhão', 'dorminhoco']);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPersonality, setNewPersonality] = useState('');

    const handleRemovePersonality = (index: number) => {
      const updatedOptions = [...selectedOption];
      updatedOptions.splice(index, 1);
      setSelectedOption(updatedOptions);
    };

    const handleAddPersonality = () => {
      setIsModalOpen(true);
    };
  
    const handleModalConfirm = () => {
      if (newPersonality) {
        setSelectedOption([...selectedOption, newPersonality]);
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
            selectedOption.map((personality, index) => (
              <div key={index} className='flex gap-2 items-center bg-darkblue-normal w-min px-2 py-1 rounded-md'>
                <span className='uppercase text-sm text-white font-medium'>{personality}</span>
                <button type="button" onClick={() => handleRemovePersonality(index)}><AiOutlineCloseCircle className="text-white w-4 h-4" /></button>
              </div>
            ))
          }
        </div>
        
        <button type="button" className='flex items-center gap-1' onClick={handleAddPersonality}>
        <AiOutlinePlus className="text-gray-600 h-5 w-5" />
        <span className='text-gray-600 text-md'>Personalidade</span>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md w-64">
            <h2 className="text-lg mb-4 font-semibold">Adicionar Personalidade</h2>
            <input
              type="text"
              placeholder="Nova personalidade"
              value={newPersonality}
              onChange={(e) => setNewPersonality(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-sm mb-4"
            />
            <div className="flex justify-end gap-4">
              <button className="text-gray-600 font-semibold" onClick={handleModalCancel}>
                Cancelar
              </button>
              <button className="text-darkblue-normal font-semibold" onClick={handleModalConfirm}>
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

