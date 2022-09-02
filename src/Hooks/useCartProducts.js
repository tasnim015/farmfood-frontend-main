import { useContext } from 'react';
import { CartProductContext } from '../Context/CartContext';

const useCartProducts = () => {
    return useContext(CartProductContext)
};

export default useCartProducts;