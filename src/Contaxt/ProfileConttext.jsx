import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext } from "react";

export let profileContext = createContext();

export default function ProfileContextProvider(props) {
  function profileDaata() {
    return axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
          

  }

  const { data, isLoading, isError, errorr } = useQuery({
    queryKey: ["profileDaata"],
    queryFn: profileDaata,
    select: (data) => data?.data?.user,
  });

  return (
    <>
      <profileContext.Provider value={data}>{props.children}</profileContext.Provider>
    </>
  );
}
