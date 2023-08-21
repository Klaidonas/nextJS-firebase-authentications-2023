import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, FacebookAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword   } from "firebase/auth";
import { auth } from "../firebase";
const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState(null)

  const emailPasswordSignUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password);
    console.log('auth:');
    console.log(auth);
    console.log('provider: email/password');
  }
  const emailPasswordSignIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
    console.log('auth:');
    console.log(auth);
    console.log('provider: email/password');

  }

  const googleSignIn = () =>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
    console.log('auth:');
    console.log(auth);
    console.log('provider:');
    console.log(provider);
  }
  const facebookSignIn = () =>{
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider);
    console.log('auth:');
    console.log(auth);
    console.log('provider:');
    console.log(provider);
  }

  const logOut = () => {
    signOut(auth);
  }

  useEffect(()=> {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe();
  }, [user])

  return(
    <AuthContext.Provider value={{user, googleSignIn, facebookSignIn, logOut, emailPasswordSignUp, emailPasswordSignIn}}>{children}</AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext);
}