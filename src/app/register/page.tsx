"use client"
import Button from '@/components/Button'
import Link from 'next/link'
import React from 'react'

const Register = () => {
  const handle = (event: any) => {
    console.log(event.target.name);
  }

  return (
    <div className='flex flex-col h-screen bg-beige-normal'>
     <nav className='bg-darkblue-normal h-20'>
       <div className='flex items-center justify-between px-16 lg:px-32 h-20'>
           <a href="" className='cursor-pointer'>
             <img src="logo-login.svg" alt="" className='w-[75%]' />
           </a>
         <a href="">
           <p className='text-lighttext-normal text-md font-semibold'>Já possui conta? <span className='text-lime-normal'>Entrar</span></p>
         </a>
       </div>
       <div className='h-2 bg-orangee-normal'></div>
       <a href="" className='flex items-center gap-2 px-14 lg:px-32 py-4'>
         <img src="arrow_back.svg" alt="" />
         <p className='text-lg font-semibold text-gray-700'>Cancelar</p>
       </a>
     </nav>
     <main className='grow flex flex-col gap-8 items-center justify-center'>
       <p className='text-2xl lg:text-3xl font-bold '>Quem é você?</p>
       <div className='flex justify-center sm:w-[75%] md:w-[60%] '>
         <img src="doguinho nerd 2.svg" alt=""  />
       </div>
       <ul className='grid grid-cols-2 md:grid-cols-3 gap-4 w-[80%] md:w-[95%] lg:w-[75%] xl:w-[60%] place-items-center'>
         <Link href="/register/person" className='inline-flex w-full px-8 py-3 h-20 xl:h-[80px] bg-lighttext-normal rounded-md justify-center items-center shadow-btn-orange border border-orangee-normal'>
            <span className='text-center text-md font-semibold text-orangee-normal'>Pessoa física</span>
         </Link>
         <Link href="/register/person" className='inline-flex w-full px-8 py-3 h-20 xl:h-[80px] bg-lighttext-normal rounded-md justify-center items-center shadow-btn-orange border border-orangee-normal'>
            <span className='text-center text-md font-semibold text-orangee-normal'>Abrigo de animais</span>
         </Link>
         <Link href="/register/person" className='inline-flex w-full px-8 py-3 h-20 xl:h-[80px] bg-lighttext-normal rounded-md justify-center items-center shadow-btn-orange border border-orangee-normal'>
            <span className='text-center text-md font-semibold text-orangee-normal'>ONG</span>
         </Link>
       </ul>
     </main>
   </div>
  )
}

export default Register