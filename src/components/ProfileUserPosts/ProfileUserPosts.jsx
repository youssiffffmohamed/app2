import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';



export default function ProfileUserPosts() {
 

const {id}= useParams();
 

const GetProfileUserPosts = () => {
    return axios.get(`https://linked-posts.routemisr.com/users/${id}/posts?limit=50`,{
        headers:{
            token:localStorage.getItem("userToken")
        }
    })

}


  
const {data, isLoading, isError, error}= useQuery({
    queryKey:['ProfileUserPosts'],
    queryFn: GetProfileUserPosts
})


console.log(data);







}

