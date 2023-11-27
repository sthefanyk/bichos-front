import Link from "next/link";
import React from "react";

const Header = () => {
    return (
        <header className="flex justify-center bg-orangee-normal pt-20 lg:pt-24">
            <div className="flex flex-col lg:flex-row items-center justify-between w-[80%]">
                <div className="flex flex-col py-20 gap-7 grow">
                    <p className="text-beige-normal text-lg lg:text-xl font-semibold">
                        Divulgação, adoção e apadrinhamento de animais
                    </p>
                    <h1 className="font-josefin text-4xl xl:text-5xl">
                        <span className="text-lime-normal font-semibold">
                            Doe
                        </span>
                        , não abandone <br />
                        <span className="text-lime-normal font-semibold">
                            Adote
                        </span>
                        , não compre <br />
                        <span className="text-lime-normal font-semibold">
                            Apadrinhe
                        </span>{" "}
                        se puder
                    </h1>
                    <Link
                        href="/about"
                        className={`
                            inline-flex max-w-max px-8 py-3 h-12 bg-lime-normal rounded-md justify-center items-center shadow-btn border border-darktext-normal 
                            hover:bg-lime-hover active:bg-lime-light_active active:shadow-btn-disable
                        `}
                    >
                        <span className="text-xl font-semibold text-darktext-normal shadow-sm">
                            Sobre nós
                        </span>
                    </Link>
                </div>

                <div className="flex grow justify-center items-center object-none lg:self-end">
                    <img src="img.svg" alt="" className="object-cover" />
                </div>
            </div>
        </header>
    );
};

export default Header;
