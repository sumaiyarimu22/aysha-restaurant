import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../providers/authProvider";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [cart] = useCart();

  const handleLogout = () => {
    logout()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const navOptions = (
    <>
      <li className='nav-item'>
        <NavLink
          to='/'
          exact
          activeClassName='text-yellow-500'
          className='nav-link'
        >
          Home
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink
          to='/menu'
          activeClassName='text-yellow-500'
          className='nav-link'
        >
          Our Menu
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink
          to='/order/:id'
          activeClassName='text-yellow-500'
          className='nav-link'
        >
          Order Food
        </NavLink>
      </li>
      {user && isAdmin && (
        <li className='nav-item'>
          <NavLink
            to='/dashboard/adminHome'
            activeClassName='text-yellow-500'
            className='nav-link'
          >
            Dashboard
          </NavLink>
        </li>
      )}
      {user && !isAdmin && (
        <li className='nav-item'>
          <NavLink
            to='/dashboard/userHome'
            activeClassName='text-yellow-500'
            className='nav-link'
          >
            Dashboard
          </NavLink>
        </li>
      )}
      <li className='nav-item'>
        <NavLink
          to='/dashboard/cart'
          activeClassName='text-yellow-500'
          className='nav-link relative'
        >
          <FaShoppingCart className='inline-block' />
          <div className='absolute top-0 right-0 bg-yellow-500 text-white rounded-full px-2 py-1 text-xs'>
            {cart.length}
          </div>
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className='navbar  fixed z-10 max-w-screen-xl bg-white shadow-lg text-gray-800'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <div
            tabIndex={0}
            role='button'
            className='btn btn-ghost lg:hidden'
            aria-label='Menu Toggle'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </div>
          <ul className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52'>
            {navOptions}
          </ul>
        </div>
        <NavLink
          to='/'
          className='text-2xl font-bold text-gray-700 hover:text-gray-900'
        >
          AYSHA Restaurant
        </NavLink>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal flex gap-4 items-center'>
          {navOptions}
        </ul>
      </div>
      <div className='navbar-end'>
        {user ? (
          <button
            onClick={handleLogout}
            className='btn btn-error text-white mx-4'
          >
            Logout
          </button>
        ) : (
          <NavLink
            to='/login'
            className='btn bg-yellow-500 text-white hover:bg-yellow-600 mx-4'
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
