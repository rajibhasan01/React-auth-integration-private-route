import { useEffect, useState } from 'react';
import initializeAuthentication from "../Firebase/firebase.initialize";
import {
    getAuth,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    onAuthStateChanged
} from "firebase/auth";


initializeAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const auth = getAuth();

    const googleProvider = new GoogleAuthProvider();
    const gitProvider = new GithubAuthProvider();

    const signInUsingGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                console.log(result.user);
                setUser(result.user);
            })
            .catch(error => {
                setError(error.message);
            })

    }

    const signInUsingGithub = () => {
        signInWithPopup(auth, gitProvider)
            .then(result => {
                console.log(result.user);
                setUser(result.user);
            })
            .catch(error => {
                setError(error.message);
            })

    }


    const logout = () => {
        signOut(auth)
            .then(() => {
                setUser({});
            })
    }




    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                console.log("inside state change", user);
                setUser(user);
            }
        })
    }, [])

    return {
        user,
        error,
        signInUsingGoogle,
        signInUsingGithub,
        logout
    }

}

export default useFirebase;

