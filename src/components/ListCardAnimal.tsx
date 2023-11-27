"use client";
import React, { useContext, useEffect, useState } from "react";
import CardAnimal from "./CardAnimal";
import Link from 'next/link';
import Filter from '@/components/Filter';
import Pagination from '@/components/Pagination';
import { AuthContext } from "@/contexts/AuthContext";

interface PaginationProps {
    current_page: number,
    per_page: number,
    last_page: number,
    total: number
}

interface ListCardAnimalProps {
    getPosts:(url: string) => any;
}

const ListCardAnimal = ({getPosts}: ListCardAnimalProps) => {
    const [data, setData] = useState([]);
    const [lastPage, setLastPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 8;
    
    const [typePost, setTypePost] = useState('adopt');
    const [filter, setFilter] = useState('');
    const [pagination, setPagination] = useState(`?page=1&per_page=${perPage}`);
    
    const [loading, setLoading] = useState(false);

    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        const findPosts = async () => {
            const { posts, paginationPresenter } = await getPosts(`http://localhost:3000/post/${typePost}${pagination}${filter}`);
            
            setData(posts);
            setLastPage(paginationPresenter.last_page);
        }
        
        setLoading(true);
        findPosts();
        setLoading(false);
    }, [typePost, pagination, filter]);

    function handleFilter(data: any) {
      setFilter(`&filter=` + data.name_animal);
    }

    function handlePaginationChange(newPage: any) {
        setCurrentPage(newPage);
        setPagination(`?page=${newPage}&per_page=${perPage}`);
    }

    return (
        <div className="lg:px-32 bg-beige-normal space-y-12 lg:space-y-16">
            <div className="flex justify-center lg:space-x-16 border-b lg:border-b-2 border-darktext-normal">
                <button 
                    className={typePost === 'adopt'? "border-b-2 lg:border-b-4 border-black py-4 px-6" : "py-6 px-6"}
                    onClick={() => {setTypePost('adopt'); handlePaginationChange(1)}}
                >
                    <span className="font-jakarta text-xl lg:text-2xl font-semibold uppercase">
                        adotar
                    </span>
                </button>
                <button
                    className={typePost === 'sponsorship'? "border-b-2 lg:border-b-4 border-black py-4 px-6" : "py-6 px-6"}
                    onClick={() => {setTypePost('sponsorship'); handlePaginationChange(1)}}
                >
                    <span className="font-jakarta text-xl lg:text-2xl font-semibold uppercase ">
                        apadrinhar
                    </span>
                </button>
            </div>
            <div className="flex flex-row justify-between">
                <Link
                    href={isAuthenticated ? "/adopt/form/post" : "/login"}
                    className={`
                        inline-flex max-w-max px-8 py-3 h-12 bg-darkblue-normal rounded-md 
                        justify-center items-center shadow-btn border border-darktext-normal 
                        hover:bg-darkblue-hover text-white active:text-black
                        active:bg-darkblue-light_active active:shadow-btn-disable
                    `}
                >
                    <span className="text-lg lg:text-xl font-semibold shadow-sm">
                        Colocar para adoção
                    </span>
                </Link>
                
                <Filter handleFilter={handleFilter} />
            </div>
            <h2 className="font-bold text-2xl lg:text-4xl">
                Bichos para adotar:
            </h2>

            {
                loading && (
                    <div className="flex justify-center w-full ">
                        <p className="text-xl">Carregando animais...</p>
                    </div>
                )
            }

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-6 justify-between h-auto">
                {data.map((post: any) => (
                    <CardAnimal
                        key={post.id}
                        post={post}
                    />
                ))}
            </div>
            <Pagination totalPages={lastPage} currentPage={currentPage} onPageChange={handlePaginationChange} />
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
