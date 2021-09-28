import { useHistory } from "react-router";
import { createContext, ReactNode, useState, useEffect } from "react";
import { firebase, auth } from '../services/firebase';

type User = {
    id: string,
    name: string,
    avatar: string,
    city: string,
    age: Number,
    email: string,
    password: string
}
  
type AuthContextType = {
  user: User | undefined,
  setUser: any,
  signInWithGoogle: () => Promise<void>,
  signUpWithEmailAndPassword: () => Promise<void>,
  signInWithEmailAndPassword: () => Promise<void>,
  resetPassword: (email: string) => Promise<void>
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType);

export default function AuthContextProvider(props: AuthContextProviderProps){
  const history = useHistory();
  const [user, setUser] = useState<User>(
      {
        id: '',
        name: '',
        avatar: '',
        city: '',
        age: 0,
        email: '',
        password: ''
    }
  );

  useEffect(()=>{
      const unsubscribe = auth.onAuthStateChanged((User) => {
          if(User){
            const { displayName, photoURL, uid} = User;
            setUser({
              ...user,
              id: uid,
              name: displayName || '',
              avatar: photoURL || ''
            });
          }
      },(error)=>{
          console.log(error)
      })
    return()=>{
      unsubscribe();
    }
  },[]);
    
  async function signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider)

    if(result.user){
      const { displayName, photoURL, uid } = result.user;

      setUser({
        ...user,
        id: uid,
        name: displayName || '',
        avatar: photoURL || ''
      });
      saveUser();
      history.push(`/`);
    }
  }

  async function saveUser(){
    const db = firebase.firestore();
    db.collection("users").add({
      id: user.id,
      name: user.name,
      city: user.city,
      age: user.age,
      email: user.email,
      avatar: user.avatar
    });  
  }

  async function signInWithEmailAndPassword(){
    try{
      await firebase.auth().signInWithEmailAndPassword(user.email, user.password);
    }catch(error){
      console.log(error)
    }
  }

  async function signUpWithEmailAndPassword(){
    try{
      const newUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
      if(newUser.user){
        setUser({...user, id: newUser.user.uid});
        saveUser();
      }
    }catch(error){
      console.log(error)
    }
  }

  async function resetPassword(email: string){
    try{
      await firebase.auth().sendPasswordResetEmail(email);
    }catch(error){
      console.log(error)
    }
  }

  return(
    <AuthContext.Provider value={{user, setUser, resetPassword, signInWithGoogle, signUpWithEmailAndPassword, signInWithEmailAndPassword}}>
        {props.children}
    </AuthContext.Provider>
  )
}