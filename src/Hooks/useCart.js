import { useState, useEffect } from "react";

const useCart = () => {
    const [cartProducts,setCartProducts]=useState(null);
    const [cartModal,setCartModal]=useState(false);
    const [allProducts, setAllProducts] = useState([]);
   const [toggleCart,setToggleCart]=useState(false);
   const [totalPrice,setTotalPrice]=useState(0);
   const [allOrderInfo,setAllOrderInfo]=useState(null);
   const [customImgInfo,setCustomImgInfo]=useState(null);
    useEffect(() => {
        let cacheCart = getFromStorage('_cart');
        // (cacheCart);
        cacheCart = JSON.parse(cacheCart)
       
        if (cacheCart?.length > 0) {
            setAllProducts(cacheCart)
        }

    }, []);

    useEffect(()=>{
       let pricefromLs= localStorage.getItem('_grandTotal')
       pricefromLs=JSON.parse(pricefromLs);
       setTotalPrice(pricefromLs)
    },[])



    const handleAddtoCart = (product) => {
        
               const newProductPrice= parseFloat(product?.price)*parseFloat(product?.quantity);
            const grandTotal= totalPrice>0 ? parseFloat(totalPrice)+ parseFloat(newProductPrice) : 0 + newProductPrice;


           if(allProducts?.length>0){
            setTotalPrice(grandTotal)
            localStorage.setItem('_grandTotal',JSON.stringify(grandTotal))
           }else{
               setTotalPrice(0 + (parseFloat(product.price)*parseFloat(product.quantity)));
               const newItemPrice=(parseFloat(product.price)*parseFloat(product.quantity));

               localStorage.setItem('_grandTotal',JSON.stringify(newItemPrice))
           }
           
        
        // (product);
   let tempAllProducts=allProducts;

     const existedProduct= tempAllProducts?.find(singleProduct=>singleProduct._id === product._id);
     const arrayData=tempAllProducts?.find(pd=> pd.key >= 1 )

     if(!existedProduct){
        //  ('does not exists');
       if(arrayData){
        
        //    (tempAllProducts);
         
   if(tempAllProducts.length >= 1){
       tempAllProducts.push(product)
   }
        //    (tempAllProducts);
       setAllProducts(tempAllProducts)
       
       addToStorage('_cart',tempAllProducts)
       (totalPrice);
       }else{
           setAllProducts([product]);
           addToStorage('_cart',[product])
       }
         
     }else{
         
        //  ('exists',existedProduct);
         existedProduct.quantity += product.quantity;
         setAllProducts(tempAllProducts);
         addToStorage('_cart',tempAllProducts)
     }

     
       

   }

   const removeCartProduct=(key)=>{
        const remainingProducts=allProducts?.filter(product=> product.key !== key);
        // (remainingProducts);
        setAllProducts(remainingProducts)
        // removeFromStorage('_cart')
        localStorage.removeItem('_cart');
        localStorage.setItem('_cart',JSON.stringify(remainingProducts))
        let finalCostAmount=0;
        remainingProducts?.forEach(product=>{
           
            const grandTotal=((parseFloat(product?.price))*parseFloat((product?.quantity)));
            finalCostAmount=finalCostAmount+grandTotal;

            if(remainingProducts.length===0){
               setTotalPrice(0);
               localStorage.setItem('_grandTotal',JSON.stringify(0));
           }else{
            setTotalPrice(finalCostAmount)
            localStorage.setItem('_grandTotal',JSON.stringify(finalCostAmount));
            const shoppingCost=localStorage.getItem('_grandTotal');
            setTotalPrice(shoppingCost)
           }
        })
        // addToStorage('_cart',JSON.stringify(remainingProducts))
   }

 

    /**
     * This function add content in the browser local storage.
     */
    const addToStorage = (name, value) => {
        localStorage.setItem(name, JSON.stringify(value));
    }

    const getFromStorage = (name) => {
        let data = localStorage.getItem(name);

        return data;
    }
 

    return{
        cartProducts,setCartProducts,cartModal,setCartModal,
        allProducts,
        setAllProducts,
        handleAddtoCart,
        removeCartProduct,
        toggleCart,
        setToggleCart,
        totalPrice,
        setTotalPrice,
        allOrderInfo,
        setAllOrderInfo,
        customImgInfo,
        setCustomImgInfo
    }
};

export default useCart;