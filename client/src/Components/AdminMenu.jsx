
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {

    return (
        <>
            <div className='text-center'>

                <div className="list-group">

                    <h4> Admin Panel </h4>

                    <NavLink to='/dashboard/admin/create-category' className="list-group-item list-group-item-NavLinkction"> Create Category </NavLink>

                    <NavLink to='/dashboard/admin/create-product' className="list-group-item list-group-item-NavLinkction"> Create Product </NavLink>

                    <NavLink to='/dashboard/admin/products-list' className="list-group-item list-group-item-NavLinkction"> All Products </NavLink>

                    <NavLink to='/dashboard/admin/useresss' className="list-group-item list-group-item-NavLinkction">users</NavLink>
                </div>
            </div>



        </>
    );
};

export default AdminMenu;