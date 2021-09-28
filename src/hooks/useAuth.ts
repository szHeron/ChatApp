import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function useAuth(){
    const value = useContext(AuthContext);
    
    return value;
}