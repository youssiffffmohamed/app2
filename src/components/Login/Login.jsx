import React, { createContext, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from './../../../node_modules/axios/lib/axios';

import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { UserContext } from "../../Contaxt/UserContext";




const Login = () => {

    let { setUserlogin } = useContext(UserContext);

    let navigate = useNavigate();
    const [islodaing, setIslodaing] = useState(false);
    const [showpassword, setShowpassword] = useState(false);


    let schema = z.object({

  
        email: z.string().email('Invalid email address'),
        password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character'),
       })




    let form = useForm({
        defaultValues: {
            password: '',
            email: '',
         
        },
        resolver: zodResolver(schema)
    })


    let { register, handleSubmit, formState } = form
    const passwordvalue = form.watch('password');
    

    async function handleLogin(value) {
    
        try {

            setIslodaing(true);
            const { data } = await axios.post('https://linked-posts.routemisr.com/users/signin', value)
            setUserlogin(data.token)
            localStorage.setItem('userToken', data.token);

            if (data.message === 'success') {

                Swal.fire({
                    title: 'Success',
                    text: data.message,
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    setTimeout(() => {
                        navigate('/');
                    }, 1000);
                })
            }


        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.error || 'Network Error',
                icon: 'error',
                confirmButtonText: 'cool'
            })

        } finally { setIslodaing(false); }


    }


    return (
        <>
            <form onSubmit={handleSubmit(handleLogin)} className="max-w-md mx-auto">
              
                <div className="relative z-0 w-full mb-5 group ">
                    <input type="email" {...register('email')} id="email" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " />
                    <label htmlFor="email" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                        enter your email
                    </label>
                    {formState.errors.email && <p className="text-sm text-red-600 mt-2">{formState.errors.email.message}</p>}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                   {passwordvalue.length>0 ?   <span  onClick={()=>{setShowpassword(!showpassword)}} className="absolute top-0 right-0"><i className={`fa-regular fa-eye  ${showpassword ? 'fa-eye' : 'fa-eye-slash'}`}></i></span>:""}
                    <input type={showpassword ? "text" : "password"} {...register('password')} id="password" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " />
                    <label htmlFor="password" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                        enter your Password
                    </label>
                    {formState.errors.password && <p className="text-sm text-red-600 mt-2">{formState.errors.password.message}</p>}
                </div>

                <button disabled={islodaing} type="submit" className={`text-white bg-brand box-border border border-transparent hover:bg-brand-strong  focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none ${islodaing ? "cursor-not-allowed opacity-50" : "cursor-pointer"} `}>
                    {islodaing ? <i className="fa-solid fa-spinner fa-spin" /> : "submit"}
                </button>
                <div>
                    you don't have accont? <Link className="text-blue-500" to={"/register"}> ?Register </Link>
                </div>
            </form>

        </>
    );
};

export default Login;
