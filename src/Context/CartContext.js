import { createContext } from "react";
import useCart from "../Hooks/useCart";

export const CartProductContext=createContext(null);

const CartContext = ({children}) => {
   const products=useCart();
   return(
       <CartProductContext.Provider value={products}>
             {children}
       </CartProductContext.Provider>
   )
};

export default CartContext;