import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import './AllProducts.css'

import SingleProduct from '../SingleProduct/SingleProduct';
import {  faSort } from '@fortawesome/free-solid-svg-icons';


const AllProducts = () => {
    const [allProducts,setAllProducts]=useState(null);
    const [filteredProducts,setFilteredProducts]=useState(null);
    const [filterOption,setFilterOption]=useState(false);
    useEffect(()=>{
       const fetchProduct=async()=>{
        const result=await fetch('http://localhost:8080/products');
        const data=await result.json();
        setAllProducts(data);
        setFilteredProducts(data);
       }
       fetchProduct();
    },[])
    // (searchText);

    const handleSearchOption=(e)=>{
        // ('mah',searchText);
        const searchText=e.target.value;
       const matchedProducts=allProducts?.filter(product=>product.name.toLowerCase().includes(searchText.toLowerCase()));
   
       setFilteredProducts(matchedProducts);
   
    }


   if(!allProducts){
       return <h2>loading...</h2>
   }

  

    return (
        <div style={{backgroundColor:'#ffe7e763'}} className="mb-5 pb-5">
           <div className='flex pt-9 mx-auto justify-center'>
           <div className='col-span-2 hidden md:inline-block'>
                   <input onChange={handleSearchOption} className='bg-grey-100  py-1.5 px-5 border-2 rounded tracking-wider border-yellow-500 focus:border-yellow-500 h-9 w-72 shadow' type="text" placeholder='I`m looking for...'/>
                   {/* <button onClick={()=>handleSearchOption()} className='bg-yellow-400  text-sm py-2 -translate-x-6 font-semibold px-6 rounded shadow '> */}
                   {/* <FontAwesomeIcon icon={faSearch} className="text-lg "/> &nbsp;
                        Search</button> */}
                        
                      
               </div>
           </div>
            <h3 className='text-2xl ml-3 md:ml-9 py-5'>All Products</h3>
            <button className='filter-btn' onClick={()=>setFilterOption(!filterOption)} style={{position:'absolute',right:'15%',top:'35%'}}> <FontAwesomeIcon className='text-2xl'  icon={faSort} /> </button>
         { filterOption &&  <div className="filter-options">
                            <ul className="flex flex-col text-xs items-around justify-around">
                                <li id='option-1' className='py-2 pl-2'>Popularity</li>
                                <li id='option-2'className='py-2 pl-2'>Price:(low to high)</li>
                                <li id='option-3' className='py-2 pl-2'>Price:(high to low)</li>
                            </ul>
                            </div>}
            <div style={{maxWidth:"1200px",margin:"0 auto"}} className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
            {
                filteredProducts?.map(singleProduct=><SingleProduct key={singleProduct._id} singleProduct={singleProduct}/>)
            }
        </div>
        </div>
    );
};

export default AllProducts;