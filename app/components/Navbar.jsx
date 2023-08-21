import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';

const Navbar = () => {
  
  const {user, googleSignIn, facebookSignIn, logOut, emailPasswordSignUp, emailPasswordSignIn} = UserAuth();
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);


  const handleSignIn = async(type) => {
    if(type==='google'){
      try {
        await googleSignIn()
      } catch(error) {
        console.log(error);
      }
  }
  else if(type==='facebook'){
    try {
      await facebookSignIn()
    } catch(error) {
      console.log(error);
    }
  }
  else if(type==='emailPassword'){
    try {
      await facebookSignIn()
    } catch(error) {
      console.log(error);
    }
  }
}

  const handleSignOut = async() => {
    try {
      await logOut()
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    const checkAuthentication = async() => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user])

  return (
    <div className='navbar'>
      <ul>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/about'>About</Link>
        </li>
        {user && (<li>
          <Link href='/profile'>Profile</Link>
        </li>)}
        
      </ul>
      {!user && modal && (
      <div>
        <button onClick={()=>handleSignIn('google')}>SIGN IN WITH GOOGLE</button>
        <button onClick={()=>handleSignIn('facebook')}>SIGN IN WITH FACEBOOK</button>
      </div>)}
      {loading ? null : !user ? (
        <ul className="profile-ul">
          <li onClick={()=>setModal(!modal)} style={{cursor:'pointer'}}>Login</li>
          <li onClick={()=>setModal(!modal)} style={{cursor:'pointer'}}>Sign Up</li>
        </ul>) : (
        <div>
          <p>Welcome, {user.displayName}</p>
          <p style={{cursor:'pointer'}}onClick={handleSignOut}>Sign Out</p>
        </div>
      )}
      <Link href='/profile'>Profile</Link>
    </div>
  );
};

export default Navbar;