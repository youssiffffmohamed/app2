import { createContext,  useState } from "react";
import Login from "../components/Login/Login";

 
 
export let UserContext = createContext()

 
 

export default function UserContextprovider (props){

 const [userlogin, setUserlogin] = useState(localStorage.getItem('userToken'));


    return <UserContext.Provider value={{userlogin,setUserlogin}}>

        {props.children}

    </UserContext.Provider>
}