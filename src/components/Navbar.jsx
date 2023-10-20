"use client";
import { AuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import { useState, useContext } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Navbar = ({ page }) => {
    const [menu, setMenu] = useState(true);
    const { isAuthenticated, user, logOut } = useContext(AuthContext);

    const handleMenu = () => {
        setMenu((prevMenu) => !prevMenu);
    };

    return (
        <nav className="fixed w-screen bg-orangee-normal z-50">
            {/* Nav Bar */}
            <div className="flex justify-between items-center h-20 lg:h-24 px-16 lg:px-32">
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
                                <img src="logo.svg" alt="" />
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
                        (<div className="flex gap-x-8">
                            <Link
                                href="/register"
                                className="inline-flex px-8 p-y-3 h-12 justify-center items-center"
                            >
                                <span className="text-xl font-semibold text-beige-normal">
                                    Cadastrar
                                </span>
                            </Link>
                            <Link
                                href="/login"
                                className="inline-flex px-8 p-y-3 h-12 bg-lime-normal rounded-md justify-center items-center shadow-btn border border-darktext-normal"
                            >
                                <span className="text-xl font-semibold text-darktext-normal shadow-sm">
                                    Entrar
                                </span>
                            </Link>
                        </div>)
                        : (<div className={`inline-flex max-w-max px-8 py-3 h-14 bg-orangee-normal rounded-md justify-center items-center shadow-btn border border-darktext-normal
                            gap-2
                        `}>
                            <div className="flex flex-col">
                                <span className="font-semibold text-lg text-lighttext-normal">{user.name === '' ? user.username : user.name}</span>
                                <span className="font-medium text-md text-lighttext-normal">@{user.username}</span>
                            </div>
                            
                            <button className="py-2 px-4 border border-btn" onClick={logOut}>Sair</button>
                        
                        </div>)
                    }
                </div>
            </div>

            {/* Menu Mobile */}
            <ul
                className={
                    !menu
                        ? "block px-16 lg:px-32 bg-beige-normal divide-y divide-darkblue-normal"
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
