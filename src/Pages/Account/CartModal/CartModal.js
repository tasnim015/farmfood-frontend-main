import {  faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useCartProducts from '../../../Hooks/useCartProducts';
import closeIcon from '../../../resources/icons/close.png'
import useAuth from '../../../Hooks/useAuth';
import useLoginCanvas from '../../../Hooks/useLoginCanvas';
import { useNavigate } from 'react-router-dom';


const CartModal = () => {
    const {user}=useAuth();
    const {setLoginModal}=useLoginCanvas();

    const {cartModal,setCartModal, allProducts,setAllProducts,removeCartProduct,totalPrice}=useCartProducts();
    const navigate=useNavigate();

 const handleRemoveCartItem=(id)=>{

    removeCartProduct(id)

 }

 let deliveryCharge=30;

 allProducts?.forEach(pd=>{
     if(pd.deliverycharge>30){
         deliveryCharge=60;
     }
 })
  
 

 const handleModalBtn=()=>{
    setCartModal(false)

    if(!user){
        setLoginModal(true);

    }
   
    const customerEmail= user.email;
    let orderProducts=[];
     console.log('alll',allProducts);
    allProducts?.forEach(prod =>  orderProducts.push({productId:prod._id,productName:prod.name,productQuantity:prod.quantity}) );

    const total=localStorage.getItem('finalTotalCost');
    const totalPrice=JSON.parse(total);
    console.log('khorcha pati hoise ',totalPrice);
  const orderInfo={
       email:customerEmail,
       items:orderProducts,
       totalPrice
  }

  console.log(orderInfo);

  fetch('http://localhost:8080/orders',{
    method:'POST',
    headers:{
        'content-type':'application/json'
    },
    body:JSON.stringify(orderInfo)

  }).then(res=>res.json()).then(data=>{

    if(data.acknowledged){
        alert('order confirmed');
        setAllProducts([]);
        localStorage.setItem('_cart',JSON.stringify([]));
         navigate('/');
    }

  }
    
    );

}


    return (
    
            <div>
            
            { cartModal &&
              <div className='w-80 h-auto pb-9 md:h-full bg-white  fixed top-20 z-40 right-4  md:right-20  shadow-lg shadow-slate-700 overflow-y-scroll'>
                  <div className="header flex justify-around py-5">
                  <h4 className="text-xl">Shopping Cart</h4>
                  <img className='w-5 h-5 cursor-pointer' src={closeIcon} onClick={()=>setCartModal(false)} alt="" />
 
              </div>
              <hr />
            {
                allProducts?.length > 0 ?
               <>
                <div className='md:h-40 md:overflow-y-scroll'>
            {
                   allProducts?.map(product=>(
                      
                       <div className="flex justify-around  my-3">

                          <div>
                           <img className='w-16 h-16' src={product?.image} alt="" />
                           </div>
                           <div className='flex justify-around items-center'>
                               <div className='w-40'>
                               <h3>{product?.name}</h3>
                               <h3>&#2547; {product?.price} <span className='text-sm'>* {product?.quantity} </span> </h3>
                               </div>
                              <div className='cursor-pointer' onClick={()=>handleRemoveCartItem(product?.key)}>
                              <FontAwesomeIcon color='red' size='xl' icon={faTrash}  /> 
                              </div>
                           
                          </div>
                       
                       </div>
                   ))
               }
                </div> 

                <div className="relative bottom-0 w-full">
                    <hr />
                    <h2 className="text-md text-center py-1.5" id='summary-title'>Order Summary</h2>
                  <div className="grid grid-cols-3 text-sm bg-slate-400 py-1">
                        <h3 className='col-span-2 pl-9'>Sub Total :  </h3>
                         <p>&#2547; {totalPrice?  totalPrice : 0}</p>
                    </div>
                    <div className="grid grid-cols-3 text-sm bg-slate-200 py-1">
                        <h3  className='col-span-2 pl-9 text-xs'>Delivery Charge :  </h3>
                         <p> + &#2547; {deliveryCharge}</p>
                    </div>
                    <hr />
                    <div className="grid grid-cols-3 bg-black py-1.5 text-md font-semibold text-white">
                        <h3  className='col-span-2 pl-9'> Total :   </h3>
                         <p>&#2547; {parseFloat(totalPrice) + parseFloat(deliveryCharge)}
                       
                         {
                             localStorage.setItem("finalTotalCost",JSON.stringify(parseFloat(totalPrice) + parseFloat(deliveryCharge)))
                            

                         }
                          </p>
                    </div>
                    <button onClick={()=>handleModalBtn()} className='text-sm flex mx-auto my-3 border-2 border-yellow-400 px-20 py-1 rounded shadow-lg'>CONFIRM ORDER</button>
                </div> 
               </>: 
                <div className="flex h-full items-center justify-center">
                    <h2 className='text-center'>no product added to cart!</h2>
                </div>
            }

              </div>
            
         }
         </div>
     
    );
};

export default CartModal;