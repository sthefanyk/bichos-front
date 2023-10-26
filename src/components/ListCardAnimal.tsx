"use client";
import React, { useEffect, useState } from "react";
import CardAnimal from "./CardAnimal";
import Link from 'next/link';
import Filter from '@/components/Filter';
import Paginate from '@/components/Paginate';

const ListCardAnimal = () => {
    const [data, setData] = useState([]);
    const baseUrl = 'http://localhost:3000/post/adopt';
    const [url, setUrl] = useState(baseUrl);

    useEffect(() => {
        fetch(url, {
            cache: "no-store",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro na solicitação");
                }
                return response.json();
            })
            .then((responseData) => {
                setData(responseData.data);
                // return responseData.data;
            });
        console.log('oi')
    }, [url]);

    async function handleFilter(data: any) {
      setUrl(baseUrl + '?filter=' + data.name_animal);
    }

    return (
        <div className="lg:px-32 bg-beige-normal space-y-12 lg:space-y-16">
            <div className="flex justify-center lg:space-x-16 border-b lg:border-b-2 border-darktext-normal">
                <button className="border-b-2 lg:border-b-4 border-black py-4 px-6">
                    <span className="font-jakarta text-xl lg:text-2xl font-semibold uppercase ">
                        adotar
                    </span>
                </button>
                <button className="border-b-2 lg:border-b-4 py-6 px-6">
                    <span className="font-jakarta text-xl lg:text-2xl font-semibold uppercase ">
                        apadrinhar
                    </span>
                </button>
            </div>
            <div className="flex flex-row justify-between">
                <Link
                    href="/adopt/form/post"
                    className="inline-flex max-w-max px-8 py-3 h-12 bg-darkblue-normal rounded-md justify-center items-center shadow-btn border border-darktext-normal"
                >
                    <span className="text-lg lg:text-xl font-semibold text-lighttext-normal shadow-sm">
                        Colocar para adoção
                    </span>
                </Link>
                <Filter handleFilter={handleFilter} />
            </div>
            <h2 className="font-bold text-2xl lg:text-4xl">
                Bichos para adotar:
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-6 justify-between h-auto">
                {data.map((post: any) => (
                    <CardAnimal
                        key={post.id}
                        name={post.animal.name}
                        posted_by={{ username: "username" }}
                    />
                ))}
            </div>
            <Paginate />
            <div className="h-40"></div>
            <div className="h-40"></div>
            <div className="h-40"></div>
            <div className="h-40"></div>
            <div className="h-40"></div>
            <div className="h-40"></div>
            <div className="h-40"></div>
            <div className="h-40"></div>
        </div>
    );
};

export default ListCardAnimal;
