import React, { useContext } from "react";
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { Button } from '@mui/material';
import { useCookies } from 'react-cookie';
import CartContext from "../CartContext";

const GoogleButton = () => {
    const { setIsAuth, isAuth } = useContext(CartContext);
    const [, setCookie, removeCookie] = useCookies(['isAuth', 'accessToken']);

    const signUserOut = () => {
        signOut(auth).then(() => {
            removeCookie('isAuth', { path: '/' });
            removeCookie('accessToken', { path: '/' });
            setIsAuth(false);
        });
    };

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                setCookie('isAuth', true, { path: '/' });
                setCookie('accessToken', result.user.uid, { path: '/' });
                setIsAuth(true);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <>
            {!isAuth ? (
                <Button variant="contained" onClick={signInWithGoogle}>SignIn</Button>
            ) : (
                <Button variant="contained" onClick={signUserOut}>Logout</Button>
            )}
        </>
    );
};

export default GoogleButton;
