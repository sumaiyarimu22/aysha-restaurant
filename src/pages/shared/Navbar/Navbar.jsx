import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/authProvider";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [cart] = useCart();

  const handleLogout = () => {
    logout()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const navopctions = (
    <>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/menu'>Our Menu</Link>
      </li>

      <li>
        <Link to='/order/:id'>Order Food</Link>
      </li>
      <li>
        <Link to='/dashboard/cart'>
          <FaShoppingCart />
          <div className='badge badge-secondary'>+{cart.length}</div>
        </Link>
      </li>
    </>
  );

  return (
    <div className='navbar bg-opacity-50 fixed z-10 max-w-screen-xl bg-base-100'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
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
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
          >
            {navopctions}
          </ul>
        </div>
        <a href='/' className=' text-xl'>
          AYSHA Resturent
        </a>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>{navopctions}</ul>
      </div>
      {user ? (
        <div className='navbar-end'>
          <button onClick={handleLogout} className='btn btn-error text-white'>
            Logout
          </button>
        </div>
      ) : (
        <div className='navbar-end'>
          <a href='/login' className='btn'>
            Login
          </a>
        </div>
      )}
    </div>
  );
};

export default Navbar;
