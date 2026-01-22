import { createContext, useState } from "react";
import axios from "axios";





 export let PostsContext = createContext()

 export default function PostsContextProvider (props){
   const [loding, setLoding] = useState(false);
   const [isError, setIsError] = useState(null);

    async function getAllPosts(){
     try {
        setLoding(true);
        const {data} = await axios.get('https://linked-posts.routemisr.com/posts?limit=50',{
            headers:{
                token:localStorage.getItem('userToken')
            }
        })
        console.log(data);  
        return data;
     } catch (error) {
        console.error(error.message);
         setIsError(error.message);
     }finally{setLoding(false);}
      

    }

 return <PostsContext.Provider value={{getAllPosts ,loding,isError}}>
    {props.children}
 </PostsContext.Provider>



 }
