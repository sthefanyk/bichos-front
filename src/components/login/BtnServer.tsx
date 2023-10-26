import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from 'react';

const BtnServer = () => {

    const { signIn } = useContext(AuthContext);

    const handleSingIn = async () => {
        await signIn({ email: 'email', password: 'password' });
    }

    return null;
}

export default BtnServer