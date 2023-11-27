"use client";
import { createContext, useEffect, useState } from "react";

// type Post = {
//     id: string;
//     name: string;
//     created_at: string;
//     updated_at: string;
//     deleted_at: string;
// };

type PostContextType = {
    selectedPostId: string;
    setSelectedPostId: (id: string) => void;
};

export const PostContext = createContext({} as PostContextType);

export function PostProvider({ children }: any) {
    const [selectedPostId, setSelectedPostId] = useState('');

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch("http://localhost:3000/personality/active", {
    //                 cache: "no-store",
    //             });

    //             if (!response.ok) {
    //                 throw new Error("Erro na solicitação");
    //             }

    //             const responseDataPosts = await response.json();
    //             const personalities: Post[] = responseDataPosts.data;

    //             setPosts(personalities);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    return (
        <PostContext.Provider value={{ selectedPostId, setSelectedPostId }}>
            {children}
        </PostContext.Provider>
    );
}

