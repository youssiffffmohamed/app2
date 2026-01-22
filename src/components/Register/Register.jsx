import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from './../../../node_modules/axios/lib/axios';

import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Login from "../Login/Login";



const Register = () => {

    let navigate = useNavigate();
    const [islodaing, setIslodaing] = useState(false);
    const [showpassword, setShowpassword] = useState(false);


    let schema = z.object({

        name: z.string().min(3, 'Name must be at least 3 characters').max(30, 'Name must be at most 30 characters'),
        gender: z.enum(['male', 'female']),
        email: z.string().email('Invalid email address'),
        password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character'),
        rePassword: z.string(),
        dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)').refine((date) => {
            let ueserDate = new Date(date);
            let today = new Date();
            today.setHours(0, 0, 0, 0);
            return ueserDate < today;


        }, 'confirm that the date is in the past'),


    }).refine((obj) => obj.password === obj.rePassword, {
        message: 'Passwords do not match',
        path: ['rePassword'],
    },)





    let form = useForm({
        defaultValues: {
            name: '',
            password: '',
            email: '',
            rePassword: '',
            dateOfBirth: '',
            gender: ''
        },
        resolver: zodResolver(schema),
        mode: 'onTouched',
    })


    let { register, handleSubmit, formState } = form
    const passwordvalue = form.watch('password');

    async function handleregisrer(value) {
        console.log(value);
        try {

            setIslodaing(true);
            const { data } = await axios.post('https://linked-posts.routemisr.com/users/signup', value)
            console.log(data);
            if (data.message === 'success') {

                Swal.fire({
                    title: 'Success',
                    text: data.message,
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    setTimeout(() => {
                        navigate('/login');
                    }, 1000);
                })
            }


        } catch (error) {
            console.log(error);
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
            <form onSubmit={handleSubmit(handleregisrer)} className="max-w-md mx-auto">
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" {...register('name')} id="name" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " />
                    <label htmlFor="name" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                        enter your name
                    </label>
                    {formState.errors.name && <p className="text-sm text-red-600 mt-2">{formState.errors.name.message}</p>}
                </div>
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


                <div className="relative z-0 w-full mb-5 group">
                    <input type="Password" {...register('rePassword')} id="rePassword" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " />
                    <label htmlFor="rePassword" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                        enter your rePassword
                    </label>
                    {formState.errors.rePassword && <p className="text-sm text-red-600 mt-2">{formState.errors.rePassword.message}</p>}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="date" {...register('dateOfBirth')} id="dateOfBirth" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " />
                    <label htmlFor="dateOfBirth" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                        enter your DateOfBirth
                    </label>
                    {formState.errors.dateOfBirth && <p className="text-sm text-red-600 mt-2">{formState.errors.dateOfBirth.message}</p>}
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center mb-4">
                        <input id="male"  {...register("gender")} type="radio" name="gender" defaultValue="male" className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none" />
                        <label htmlFor="country-option-1" className="select-none ms-2 text-sm font-medium text-heading">
                            male
                        </label>

                    </div>
                    <div className="flex items-center mb-4 ">
                        <input id="female" {...register("gender")} type="radio" name="gender" defaultValue="female" className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none" defaultChecked />
                        <label htmlFor="country-option-1" className="select-none ms-2 text-sm font-medium text-heading">
                            famale
                        </label>
                    </div>
                </div>
                <button disabled={islodaing} type="submit" className={`text-white bg-brand box-border border border-transparent hover:bg-brand-strong  focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none ${islodaing ? "cursor-not-allowed opacity-50" : "cursor-pointer"} `}>
                    {islodaing ? <i className="fa-solid fa-spinner fa-spin" /> : "submit"}
                </button>
                <div>
                    you have accont? <Link className="text-blue-500" to={"/login"}> Login </Link>
                </div>
            </form>

        </>
    );
};

export default Register;
