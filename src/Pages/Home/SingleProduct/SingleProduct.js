import React from 'react';
import { Link } from 'react-router-dom';

const SingleProduct = ({singleProduct}) => {
    const {_id,name,image,price}=singleProduct;
    return (
        <div className='mx-2 md:mx-9 mt-14 mb-2 w-36 bg-white shadow-lg relative'>
             <Link to={`/products/${_id}`}>
           <img className='h-48 w-full' src={image} alt="" />
          <div className="p-5 mb-9">
          <h5 className='text-xs'>{name}</h5>
           <h5 className='pt-2'>&#2547;{price} </h5>
           </div>
           
           <button className='w-full bg-yellow-400 py-2 absolute  bottom-0'>Add To Cart</button>
           </Link>
        </div>
    );
};

export default SingleProduct;