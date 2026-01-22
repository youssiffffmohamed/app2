import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function PostCreator({ imgUser, nameUser }) {

  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [imgsrc, setImgsrc] = useState('');

  const queryClient = useQueryClient()



  function handleChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImgsrc(URL.createObjectURL(file));
    }

  }



  const ceretPost = (formData) => {
    return axios.post(`https://linked-posts.routemisr.com/posts`, formData, {
      headers: {
        token: localStorage.getItem("userToken")
      }
    })
  }



  const { mutate, isPending } = useMutation({
    mutationFn: ceretPost,
    onSuccess: () => {
      toast.success('Successfully created!');
      queryClient.invalidateQueries({
        queryKey: ["getUserPosts"]
      })
    },
    onError: () => {

      toast.error('This is an error!');

    }

  })


  function handelAddpost() {
    const formData = new FormData();

    if (body) {
      formData.append("body", body)
    }

    if (image) {
      formData.append("image", image)
    }
    mutate(formData)
    setBody('');
    setImgsrc('');
  }





  return <>
  {isPending && (toast('loading Waiting...'))}
  
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-4 ">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={imgUser}
          className="w-10 h-10 rounded-full"
        />
        <span className="font-semibold">{nameUser}</span>
      </div>

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}

        placeholder="بم تفكر؟"
        className="w-full resize-none border-0 focus:ring-0 text-lg"
        rows={2}
      />



      <div className="flex justify-between mt-4">
        <label className="cursor-pointer text-gray-600">
          🖼️ صورة
          <input
            onChange={handleChange}

            type="file"
            hidden
            accept="image/*"

          />
        </label>

        <button onClick={handelAddpost} className="bg-blue-500 text-white px-5 py-1 rounded-lg cursor-pointer hover:bg-blue-900 ى">
         publishing
        </button>
      </div>

      <div className="py-3">
        {imgsrc && <img className="size-full rounded-2xl " src={imgsrc} alt="" />}
      </div>
    </div>








  </>




}
