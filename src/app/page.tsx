"use client"
import Adopt from '@/components/Adopt'
import Patronize from '@/components/Patronize'
import Link from 'next/link'
import { useState } from 'react';


export default function Home() {
    const [menu, setMenu] = useState(false);

    const handleMenu = () => {
        setMenu((prevState) => prevState ? false : true);
    }

    return (
        <>
            <header className='px-16 lg:px-32 bg-orangee-normal'>
                {/* Navbar */}
                <nav className='fixed bg-orangee-normal'>
                    <div className='sm:block lg:hidden'>
                        <div className='flex items-center justify-between px-3 h-20'>
                            <div>
                                <a href="" className='cursor-pointer'>
                                    <img src="logo1.svg" alt="" />
                                </a>
                            </div>
                            <button onClick={handleMenu} className='w-9 h-9 place-self-center'>
                                <a href="" className='cursor-pointer'>
                                    <img src="menu_24px.svg" alt="" />
                                </a>
                            </button>
                        </div>
                        {menu && 
                            <div className=' mx-auto divide-y divide-darkblue-normal bg-beige-normal'>
                                <a className='flex flex-col h-14 justify-center px-3 cursor-pointer'>
                                    <span className='text-orangee-normal text-base font-semibold'>Início</span>
                                </a>
                                <a className='flex flex-col h-14 justify-center px-3 cursor-pointer'>
                                    <span className='text-darktext-normal text-base font-semibold'>Sobre</span>
                                </a>
                                <div className='flex h-20 items-center gap-4 px-3 justify-end'>
                                    <a href="" className='inline-flex px-3 h-9 bg-darkblue-normal rounded-md justify-center items-center shadow-btn'>
                                        <span className='text-sm font-semibold text-beige-normal shadow-sm'>Entrar</span>
                                    </a>
                                    <a href="" className='inline-flex px-3 h-9 bg-darkblue-normal rounded-md justify-center items-center shadow-btn'>
                                        <span className='text-sm font-semibold text-beige-normal shadow-sm'>Cadastrar-se</span>
                                    </a>
                                </div>
                            </div>
                        }
                    </div>
                    <div className='sm:hidden lg:block'>
                        <div className='flex items-center justify-between h-24'>
                            <div className='flex gap-x-16 items-center'>
                                <div>
                                    <a href="#" className='cursor-pointer'>
                                        <img src="logo.svg" alt="" />
                                    </a>
                                </div>
                                <div className='flex felx-row justify-center items-center border-4 border-lime-normal h-10 px-16 gap-x-16 rounded-md'>
                                    <a className='cursor-pointer'>
                                        <span className='text-lime-normal text-xl font-semibold underline hover:text-lime-normal'>Início</span>
                                    </a>
                                    <a className='cursor-pointer'>
                                        <span className='text-beige-normal text-xl font-semibold hover:text-lime-normal'>Sobre</span>
                                    </a>
                                </div>
                            </div>
                            <div className='flex gap-x-10'>
                                <a href="" className='inline-flex px-8 p-y-3 h-12 justify-center items-center'>
                                    <span className='text-xl font-semibold text-beige-normal'>Cadastrar-se</span>
                                </a>
                                <a href="" className='inline-flex px-8 p-y-3 h-12 bg-lime-normal rounded-md justify-center items-center shadow-btn border border-darktext-normal'>
                                    <span className='text-xl font-semibold text-darktext-normal shadow-sm'>Entrar</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className='flex flex-col lg:flex-row items-center justify-between'>
                    <div className='flex flex-col py-20 gap-7 grow'>
                        <p className='text-beige-normal text-xl font-semibold'>Divulgação, adoção e apadrinhamento de animais</p>
                        <h1 className='font-josefin text-5xl'>
                            <span className='text-lime-normal font-semibold'>Doe</span>, não abandone <br />
                            <span className='text-lime-normal font-semibold'>Adote</span>, não compre <br /> 
                            <span className='text-lime-normal font-semibold'>Apadrinhe</span> se puder
                        </h1>
                        <a href="" className='inline-flex max-w-max px-8 py-3 h-12 bg-lime-normal rounded-md justify-center items-center shadow-btn border border-darktext-normal'>
                        <span className='text-xl font-semibold text-darktext-normal shadow-sm'>Sobre nós</span>
                        </a>
                    </div>

                    <div className='flex grow justify-center items-center object-none'>
                    <img src="home.svg" alt="" className='object-cover'/>
                    </div>
                </div>
            </header>

            <div className='h-80 bg-darkblue-normal'></div>
            <div className='h-80 bg-darkblue-normal'></div>
            <div className='h-80 bg-darkblue-normal'></div>
            <div className='h-80 bg-darkblue-normal'></div>
            <div className='h-80 bg-darkblue-normal'></div>
            <div className='h-80 bg-darkblue-normal'></div>
            <div className='h-80 bg-darkblue-normal'></div>
            <div className='h-80 bg-darkblue-normal'></div>
            
        </>
    )
}


