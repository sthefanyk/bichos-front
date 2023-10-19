"use client"
import { useState } from 'react';
import { AiOutlineCloseCircle, AiOutlinePlus } from 'react-icons/ai';

interface MedVacItem {
    name: string;
    doses: {
      date: string;
      tomado: boolean;
    };
  }

const AddMedVac = () => {
    const [selectedOption, setSelectedOption] = useState([
      { name: 'Vermífugo', doses: [{ date: '00/00/0001', tomado: true }, { date: '00/00/0002', tomado: true }] }, 
      { name: 'Anti-parasitário', doses: [{ date: '00/00/000', tomado: true }]
    }]);

    const [isModalOpenItem, setIsModalOpenItem] = useState(false);
    const [newItem, setNewItem] = useState({ name: '' });

    const handleRemove = (index: number) => {
      const updatedOptions = [...selectedOption];
      updatedOptions.splice(index, 1);
      setSelectedOption(updatedOptions);
    };

    const handleRemoveDose = (index: number, iDose: number) => {
      const updatedOptions = [...selectedOption];
      updatedOptions[index].doses.splice(iDose, 1);
      setSelectedOption(updatedOptions);
    };

    const handleAddMedVac = () => {
      setIsModalOpenItem(true);
    };
  
    const handleModalConfirm = () => {
      if (newItem) {
        setSelectedOption([...selectedOption, newItem]);
      }
      setIsModalOpenItem(false);
      setNewItem({ name: '' });
    };
  
    const handleModalCancel = () => {
      setIsModalOpenItem(false);
      setNewItem({ name: '' });
    };

    return (
      <>
        <div className='flex gap-2 flex-wrap ml-4'>
        {
            selectedOption.map((value, index) => (
              <div key={index} className='flex flex-col gap-2 w-full'>
                <div  className='flex gap-2 items-center w-full'>
                  <button type="button" onClick={() => handleRemove(index)}><AiOutlineCloseCircle className="text-black w-4 h-4" /></button>
                  <span className='uppercase text-sm text-black font-medium'>{value.name}</span>
                </div>
                {
                  value.doses.map((dose, i) => (
                    <div key={i} className='flex items-center justify-between ml-6'>
                      <span className='text-sm text-gray-600 font-normal'>{i + 1}/{value.doses.length} dose</span>
                      <div className='flex items-center gap-2'>
                        <span className='uppercase text-sm text-gray-600 font-medium'>{dose.date}</span>
                        <button 
                          type="button" onClick={() => handleRemoveDose(index, i)}
                          className='flex items-center'
                        >
                          <AiOutlineCloseCircle className="text-gray-600 w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                }
                <button type="button" className='flex items-center gap-1' onClick={handleAddMedVac}>
                  <AiOutlinePlus className="text-gray-600 h-4 w-4" />
                  <span className='text-gray-600 text-sm'>Dose</span>
                </button>
              </div>
            ))
        }
        </div>
        
        <button type="button" className='flex items-center gap-1' onClick={handleAddMedVac}>
          <AiOutlinePlus className="text-black h-5 w-5" />
          <span className='text-black text-md'>Medicamento</span>
        </button>

        {isModalOpenItem && (
          <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-md w-64">
              <h2 className="text-lg mb-4 font-semibold">Adicionar Medicamento</h2>
              <input
                type="text"
                placeholder="Nova personalidade"
                value={newItem.name}
                onChange={(e) => setNewItem({ name: e.target.value })}
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

export default AddMedVac;