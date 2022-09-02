import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPhone } from '@fortawesome/free-solid-svg-icons'


const Topbar = () => {
    return (
        <div className='flex justify-around bg-yellow-400 items-center py-0.5'>
             <div>
                 <h6 className='text-xs font-semibold'>Serving Farm Fresh Foods</h6>
             </div>
             <div>
             <FontAwesomeIcon icon={faPhone} className="text-xs "/> &nbsp;
             <span className='text-xs '>01614821673(10am-10pm)</span>
             </div>
        </div>
    );
};

export default Topbar;