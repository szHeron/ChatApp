import { createContext, ReactNode, useState, useEffect } from "react";
import { firebase, auth, database } from '../services/firebase';

type User = {
    id: string,
    name: string,
    avatar: string,
    city: string,
    age: Number,
    onlineState: boolean,
    email: string,
    password: string
}
  
type AuthContextType = {
  user: User | undefined,
  setUser: any,
  signInWithGoogle: () => Promise<void>,
  signUpWithEmailAndPassword: () => Promise<string | undefined>,
  signInWithEmailAndPassword: () => Promise<string | undefined>,
  logout: () => Promise<void>,
  resetPassword: (email: string) => Promise<void>
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType);

export default function AuthContextProvider(props: AuthContextProviderProps){
  const [user, setUser] = useState<User>(
      {
        id: '',
        name: '',
        avatar: '',
        city: '',
        age: 0,
        onlineState: false,
        email: '',
        password: ''
    }
  );

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((User) => {
      if(User){
        const { displayName, photoURL, uid } = User;
        setUser({
          ...user,
          id: uid,
          name: displayName || '',
          avatar: photoURL || ''
        });
        database.ref().child("users").child(uid).update({
          onlineState: true
        });
      }
    },(error)=>{
      console.log(error)
    })
    return()=>{
      unsubscribe();
    }
  },[]);

  useEffect(()=>{
    const handleOnlineState = async() => {
      const UserRef = database.ref().child("users").child(user.id);
      if((await UserRef.get()).exists()){
        database.ref(`users/${user.id}`).on('value', function(snapshot) {
          if (snapshot.val() === false) {
            return;
          };
          UserRef.onDisconnect().update({
            onlineState: false
          })
        })
      }
    }
    if(user.id){
      handleOnlineState();
    }
  },[user])

  async function signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);

    if(result.user){
      const { displayName, photoURL, uid, email } = result.user;
      setUser({
        ...user,
        id: uid,
        name: displayName || '',
        avatar: photoURL || '',
        email: email || ''
      });
      SaveUser(displayName, photoURL, email, uid);
    }
  }

  async function signInWithEmailAndPassword(){
    try{
      await firebase.auth().signInWithEmailAndPassword(user.email, user.password);
    }catch(error){
      console.log(error);
      let errorMessage = '';

      if(error instanceof Error) {
        errorMessage = error.message;
      }
      
      return errorMessage;
    }
  }

  async function signUpWithEmailAndPassword(){
    try{
      const newUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
      if(newUser.user){
        setUser({...user, id: newUser.user.uid});
        SaveUser(user.name, user.avatar, user.email, newUser.user.uid);
      }
    }catch(error){
      console.log(error);
      let errorMessage = '';

      if(error instanceof Error) {
        errorMessage = error.message;
      }
      
      return errorMessage;
    }
  }

  async function SaveUser(displayName: string | null, photoURL: string | null, email: string | null, uid: string){
    const UsersRef = database.ref().child("users");
    if(!(await UsersRef.child(uid).get()).exists()){
      await UsersRef.child(uid).set({
        name: displayName,
        city: user.city,
        age: user.age,
        onlineState: true,
        email: email,
        avatar: photoURL
      }); 
    }
  }

  async function resetPassword(email: string){
    try{
      await firebase.auth().sendPasswordResetEmail(email);
    }catch(error){
      console.log(error)
    }
  }

  async function logout(){
    try{
      await firebase.auth().signOut();
      setUser({
        id: '',
        name: '',
        avatar: '',
        city: '',
        age: 0,
        onlineState: false,
        email: '',
        password: ''
      });
    }catch(error){
      console.log(error)
    }
  }

  return(
    <AuthContext.Provider value={{user, setUser, resetPassword, logout, signInWithGoogle, signUpWithEmailAndPassword, signInWithEmailAndPassword}}>
        {props.children}
    </AuthContext.Provider>
  )
}