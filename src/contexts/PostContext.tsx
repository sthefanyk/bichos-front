"use client";
import { createContext, useState } from "react";

type PostContextType = {
    selectedPostId: string;
    setSelectedPostId: (id: string) => void;
};

export const PostContext = createContext({} as PostContextType);

export function PostProvider({ children }: any) {
    const [selectedPostId, setSelectedPostId] = useState('');

    return (
        <PostContext.Provider value={{ selectedPostId, setSelectedPostId }}>
            {children}
        </PostContext.Provider>
    );
}

