import React from 'react';
import { NavLink } from 'react-router-dom';

const UserMenuLayout = () => {

    return (

        <>
            <div className='text-center'>

                <div className="list-group">

                    <h4> DashBoard </h4>

                    <NavLink to='/dashboard/user/profile' className="list-group-item list-group-item-NavLinkction"> Profile </NavLink>
                    <NavLink to='/dashboard/user/orders' className="list-group-item list-group-item-NavLinkction">orders </NavLink>
                </div>
            </div>



        </>

    );
};

export default UserMenuLayout;