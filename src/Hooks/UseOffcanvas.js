import {useState} from 'react';

const UseOffcanvas = () => {
    const [loginModal,setLoginModal]=useState(false);
     return {
         loginModal,
         setLoginModal
     }
};

export default UseOffcanvas;