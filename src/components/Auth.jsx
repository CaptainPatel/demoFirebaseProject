import { useEffect, useState } from "react"
import { auth, googleProvider } from "../config/firebase"
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"

const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");
    const [userID, setUserID] = useState("");

    useEffect(() => {
        if (auth?.currentUser) {
            setUser(auth.currentUser.email)
            setUserID(auth.currentUser.uid)
        }
    }, [])

    // with email and password
    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setUser(auth?.currentUser?.email);
            setUserID(auth?.currentUser?.uid);
        } catch (error) {
            console.log(error);
        }
    };

    // this works for everything
    const logout = async () => {
        try {
            await signOut(auth);
            setUser("")
            setUserID("")
        } catch (error) {
            console.log(error);
        }
    }

    // with gulu gulu 
    const google = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            setUser(auth?.currentUser?.email);
            setUserID(auth?.currentUser?.uid);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="email" ></input>
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="password" ></input>
            <button onClick={signIn}>Login</button>
            <hr />
            <button onClick={google}>SignIn with google</button>
            <hr />
            <button onClick={logout}>Logout</button>
            <div>
                <h3>
                    user = {user};
                </h3>
                <h4>
                    id = {userID};
                </h4>
            </div>
        </div>
    )
}

export default Auth