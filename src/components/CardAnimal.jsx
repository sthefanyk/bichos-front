import React from 'react'

const CardAnimal = ({name}) => {
  return (
    <div className='flex flex-col p-2 max-w-max gap-2 bg-lightext-normal border border-darktext-normal rounded-lg shadow-card'>
        <div>
          <img src="animal.png" alt="" />
        </div>
        <div>
          <p className='font-jakarta font-semibold text-xl lg:text-2xl'>{name}</p>
          <p className='font-jakarta text-lg lg:text-xl font-medium'>sexo, idade</p>
          <p className='font-jakarta text-lg lg:text-xl font-medium'>castramento</p>
          <p className='font-jakarta text-lg lg:text-xl font-medium'>localização</p>
        </div>
    </div>
  )
}

export default CardAnimal