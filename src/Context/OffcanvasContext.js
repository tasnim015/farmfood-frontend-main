import React, { createContext } from 'react';
import UseOffcanvas from '../Hooks/UseOffcanvas';
export const SigninContext=createContext(null);
const OffcanvasContext = ({children}) => {
    const loginModal=UseOffcanvas();
    return (
        <SigninContext.Provider value={loginModal}>
            {children}
        </SigninContext.Provider>
    );
};

export default OffcanvasContext;