import React from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';


const Layout = () => {
    return <>
     <Navbar/>
     
       <div className="container mx-auto px-4 py-20">
         <Outlet />
       </div>
      
     <Footer />
    </>
}

export default Layout;
