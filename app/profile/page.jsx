'use client'
import React, { useEffect, useRef, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import Link from 'next/link';

const page = () => {

  const {user, googleSignIn, facebookSignIn, logOut, emailPasswordSignUp, emailPasswordSignIn} = UserAuth();
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [regularSignIn, setRegularSignIn] = useState(true);

  console.log('user:');
  console.log(user);
  console.log('userEmail:');
  console.log(user?.email);
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
      await emailPasswordSignIn(emailRef.current.value, passwordRef.current.value)
    } catch(error) {
      console.log(error);
    }
  }
  else if(type==='registerEmailPassword'){
    try {
      await emailPasswordSignUp(emailRef.current.value, passwordRef.current.value)
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

  const emailRef = useRef();
  const passwordRef = useRef();
  const formRef = useRef();

  if(!user) {
    return (
    <div>
          <div className="loginIn-options">
            <button
             style={{width:'120px',height:'30px'}}
             onClick={()=>setRegularSignIn(true)}>
              <strong>SIGN IN</strong></button>
            <button
             style={{width:'120px',height:'30px'}}
             onClick={()=>setRegularSignIn(false)}>
              <strong>REGISTER</strong></button>
            <div className='regular'>
              {regularSignIn ? (<div className="signIn">
                <h3>Log In</h3>
                <form ref={formRef}>
                  <div>
                    <label>Email</label>
                    <input type="email" ref={emailRef}/>
                  </div>
                  <div>
                    <label>Password</label>
                    <input type="password" ref={passwordRef} />
                  </div>
                </form>
                <button onClick={()=>handleSignIn('emailPassword')}>Log In</button>
              </div>) : ( <div className="register">
                <h3>Sign Up</h3>
                <form ref={formRef}>
                  <div>
                    <label>Email</label>
                    <input type="email" ref={emailRef}/>
                  </div>
                  <div>
                    <label>Password</label>
                    <input type="password" ref={passwordRef} />
                  </div>
                </form>
                <button onClick={()=>handleSignIn('registerEmailPassword')}>Sign Up</button>
              </div>)}
            </div>
            <br />
            <br />
            <br />
            <div className="facebok-or-google">
              <div onClick={()=>handleSignIn('facebook')} style={{cursor:'pointer'}}>Log In With FaceBook</div>
              <div onClick={()=>handleSignIn('google')}>Log In With Google</div>
            </div>
          </div>
        
      </div>
      )}
      else {
        return(<h1>
          welcome, {user.email}
        </h1>)
      }
};

export default page;