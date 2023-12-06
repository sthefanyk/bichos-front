"use client";
import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from 'socket.io-client';
import { AuthContext } from "./AuthContext";

type NotificationContextType = {
    socket: Socket | undefined;
};

export const NotificationContext = createContext({} as NotificationContextType);

export function NotificationProvider({ children }: any) {

    const { isAuthenticated, user } = useContext(AuthContext);
    const [socket, setSocket] = useState<Socket>();
    const [notifications, setNotifications] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        let currentSocket: Socket | undefined;

        if (isAuthenticated && user?.id) {
            console.log('Authentication');
            currentSocket = io(`${process.env.NEXT_PUBLIC_URL_API}`, {
                query: {
                    user_id: user.id
                },
            });

            currentSocket.on('connect', () => {
                currentSocket?.emit('hello', 'world');
                console.log('Socket connected');
            });

            currentSocket.on('disconnect', () => {
                console.log('Socket disconnected');
            });

            currentSocket.on(`approvedAdopter_${user.id}`, (message) => {
                console.log('Received notification for adopter:', message);
            });
        }

        setSocket(currentSocket);

        return () => {
            currentSocket?.disconnect();
            console.log('Socket disconnected on unmount');
        };
    }, [isAuthenticated, user?.id]);

    return (
        <NotificationContext.Provider value={{ socket }}>
            {children}
        </NotificationContext.Provider>
    );
}



// const socket = useMemo(() => io(`${process.env.NEXT_PUBLIC_URL_API}`), []);