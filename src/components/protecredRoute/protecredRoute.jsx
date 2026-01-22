import React from 'react';




import { Navigate } from 'react-router-dom';


export function ProtecredRoute(props) {
 
    if(localStorage.getItem('userToken')){
    
        return props.children;
    }
    else{
          return <Navigate to="/login" />;
    }
}

export default ProtecredRoute;
