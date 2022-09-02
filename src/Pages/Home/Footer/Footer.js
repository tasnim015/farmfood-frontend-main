import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../resources/icons/logo.jpg'
const Footer = () => {
    return (
        <div className='bg-yellow-400 py-4 mt-14'>
            
             <div className="grid  grid-cols-1 md:grid-cols-3 justify-around items-center flex-col md:flex-row ">
                       <div className="col-span-2 flex justify-around">
                           
                       <div className='mt-9'>
                                 <img src={logo} alt="" />
                             </div>
                            
                             <div className='flex flex-col text-xs'>
                                 <p className='text-lg '>Quick Links</p>
                                 <Link className='my-2' to="">Navigation</Link>
                                 <Link className='my-2' to="">Banner</Link>
                                 <Link className='my-2' to="">Featured Products</Link>
                                 <Link className='my-2' to="">All Products</Link>
                                 <Link className='my-2' to="">Contact Us</Link>
                             </div>     
                           </div>           

                       <div className='text-sm text-center pt-4'>
                             <p className='text-lg'>Contact Us</p>
                             <address className='my-2'>Location : Saidpur , Nilphamari </address>
                             <address className='my-2'>Phone : 01614821673(10am-10pm)</address>
                             <address className='my-2'>nrikantha@gmail.com</address>
                       </div>
             </div>
        </div>
    );
};

export default Footer;