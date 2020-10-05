import React, {useState} from 'react';
import {MainPage} from "./view/MainPage";
import {firebase} from "./config/firebase";
import {TopBar} from "./view/TopBar";

export default function App()
{
    const [user, setUser] = useState<any>(null);
    const handleSignIn = async () => {
        const  provider = new firebase.auth.GoogleAuthProvider();
        const result = await firebase.auth().signInWithPopup(provider);
        setUser(result.user);
    }

    return (
        <>
            <TopBar/>
            <MainPage />
        </>
    );
}

