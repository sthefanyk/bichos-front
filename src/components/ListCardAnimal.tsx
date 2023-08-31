import React from 'react'
import CardAnimal from './CardAnimal'

const ListCardAnimal = () => {
  return (
    <div className='grid grid-cols-2 lg:grid-cols-4 gap-2'>
        <CardAnimal name='paçoca'/>
        <CardAnimal name='paçoca'/>
        <CardAnimal name='paçoca'/>
        <CardAnimal name='paçoca'/>
    </div>
  )
}

export default ListCardAnimal