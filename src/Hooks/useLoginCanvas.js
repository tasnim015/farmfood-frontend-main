import  { useContext } from 'react';
import { SigninContext } from '../Context/OffcanvasContext';

const useLoginCanvas = () => {
    return useContext(SigninContext);
};

export default useLoginCanvas;