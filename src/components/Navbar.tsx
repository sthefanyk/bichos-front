"use client";
import { AuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import { useState, useContext } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { usePathname, useRouter,  } from 'next/navigation';

const Navbar = () => {
    const page = usePathname();
    const [menu, setMenu] = useState(true);
    const { isAuthenticated, user, logOut } = useContext(AuthContext);
    const [isOpenModalProfile, setIsOpenModalProfile] = useState(false);
    const [isHoverProfile, setHoverProfile] = useState(false);

    const { push } = useRouter();

    const handleMenu = () => {
        setMenu((prevMenu) => !prevMenu);
    };
    
    if (page.includes('/login') || page.includes('/register')) {
        return null;
    }

    return (
        <nav className="fixed w-screen bg-orangee-normal z-50 flex flex-col items-center">
            {/* Nav Bar */}
            <div className="flex justify-between w-[80%] items-center h-20 lg:h-24">
                {/* Mobile */}
                <div className="lg:hidden flex justify-between items-center w-full">
                    <div>
                        <Link href="/" className="cursor-pointer">
                            <img src="logo1.svg" alt=""/>
                        </Link>
                    </div>

                    {/* Menu */}
                    <div onClick={handleMenu} className="lg:hidden">
                        {!menu ? (
                            <AiOutlineClose size={28} />
                        ) : (
                            <AiOutlineMenu size={28} />
                        )}
                    </div>
                </div>

                {/* Desktop */}
                <div className="hidden lg:flex items-center justify-between h-24 w-full">
                    <div className="flex gap-x-16 items-center">
                        <div>
                            <Link href="/" className="cursor-pointer">
                                <img src="logo.svg" alt="Logo" />
                            </Link>
                        </div>
                        <div className="flex flex-row justify-center items-center border-4 border-lime-normal h-10 px-16 gap-x-16 rounded-md">
                            <Link href="/" className="cursor-pointer">
                                <span className={page === 'home' ? "text-lime-normal text-xl font-semibold underline hover:text-lime-normal" : "text-beige-normal text-xl font-semibold hover:text-lime-normal"}>
                                    Início
                                </span>
                            </Link>
                            <Link href="/about" className="cursor-pointer">
                                <span className={page === 'about' ? "text-lime-normal text-xl font-semibold underline hover:text-lime-normal" : "text-beige-normal text-xl font-semibold hover:text-lime-normal"}>
                                    Sobre
                                </span>
                            </Link>
                        </div>
                    </div>
                    {!isAuthenticated ?
                        (<div className="relative flex gap-x-8">
                            <Link
                                href="/register"
                                className="inline-flex px-8 p-y-3 h-12 justify-center items-center"
                            >
                                <span className="text-xl font-semibold text-beige-normal hover:text-lime-normal">
                                    Cadastrar
                                </span>
                            </Link>
                            <Link
                                href="/login"
                                className={`
                                    inline-flex px-8 p-y-3 h-12 bg-lime-normal rounded-md justify-center items-center shadow-btn border border-darktext-normal
                                    hover:bg-lime-hover active:bg-lime-light_active active:shadow-btn-disable
                                `}
                            >
                                <span className="text-xl font-semibold text-darktext-normal shadow-sm">
                                    Entrar
                                </span>
                            </Link>
                        </div>)
                        : (
                            <div
                                className={`
                                    ${!isOpenModalProfile ? `
                                        relative
                                        inline-flex max-w-max px-4 py-3 h-14 bg-orangee-normal rounded-md 
                                        justify-center items-center shadow-btn border border-darktext-normal gap-4

                                        hover:bg-white hover:shadow-none hover:text-black
                                    ` : `
                                        relative
                                        inline-flex max-w-max px-4 py-3 h-14 bg-white rounded-md 
                                        justify-center items-center gap-4
                                    `}
                                `}
                                onClick={() => setIsOpenModalProfile((isOpen) => !isOpen)}
                                onMouseLeave={() => setHoverProfile(false)}
                                onMouseEnter={() => setHoverProfile(true)}
                            >
                                <div className="h-[45px] aspect-[1/1] bg-lime-normal rounded-full overflow-hidden">
                                    {
                                        user?.profile_picture.url && (
                                            <picture className="flex items-center justify-center w-full h-full">
                                                <img 
                                                    className={`w-full h-full object-cover`}
                                                    src={user.profile_picture.url} 
                                                    alt="Imagem do usuário"
                                                />
                                            </picture>
                                        )
                                    }
                                </div>
                                <div className="flex flex-col w-[100px]">
                                    <span className={`font-semibold text-lg ${!isOpenModalProfile && !isHoverProfile ? `text-white` : `text-black`}`}>{user?.name === '' ? user.username : user?.name}</span>
                                    <span className={`font-medium text-md ${!isOpenModalProfile && !isHoverProfile ? `text-white` : `text-black`}`}>@{user?.username}</span>
                                </div>

                                {isOpenModalProfile && (
                                    <div className="absolute right-0 top-full z-51 bg-white p-2 mt-2 rounded-lg w-[200px] border border-darkblue-normal divide-y-[2px] divide-darkblue-normal">
                                        <button onClick={() => push(`/profile/${user?.id}`)}>
                                            <div className="p-2 w-full">
                                                <span className="">Meu perfil</span>
                                            </div>
                                        </button>
                                        <button onClick={logOut} className="flex justify-start p-2 w-full">
                                            <span className="">Sair</span>
                                        </button>
                                    </div>
                                )}
                                
                                
                            </div>
                        )
                    }
                </div>
            </div>

            {/* Menu Mobile */}
            <ul
                className={
                    !menu
                        ? "block px-16 lg:px-32 bg-beige-normal divide-y divide-darkblue-normal w-full"
                        : "hidden"
                }
            >
                <li className="py-4">
                    <Link href="/" className="pr-[87%] py-4">Home</Link>
                </li>
                <li className="py-4">
                    <Link href="/about" className="pr-[87%] py-4">Sobre</Link>
                </li>
                <div className="flex h-20 items-center gap-4 justify-end">
                    <li className="inline-flex px-3 h-9 bg-darkblue-normal rounded-md justify-center items-center shadow-btn">
                        <Link href="/login">
                            <span className="text-sm font-semibold text-beige-normal shadow-sm">
                                Entrar
                            </span>
                        </Link>
                    </li>
                    <li className="inline-flex px-3 h-9 bg-darkblue-normal rounded-md justify-center items-center shadow-btn">
                        <Link href="/register">
                            <span className="text-sm font-semibold text-beige-normal shadow-sm">
                                Cadastrar
                            </span>
                        </Link>
                    </li>
                </div>
            </ul>
        </nav>
    );
};

export default Navbar;
