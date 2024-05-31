import {
  FaHome,
  FaCalendarAlt,
  FaShoppingCart,
  FaPhoneAlt,
  FaBook,
  FaUsers,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { IoCart } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";
import useAdmin from "../../hooks/useAdmin";

const DashMenu = () => {
  const [isAdmin] = useAdmin();

  return (
    <div className='p-5'>
      <h1 className='text-3xl'>AYSHA</h1>
      <p className='text-[1.2rem] tracking-widest'>Resturent</p>

      {isAdmin ? (
        <ul className='space-y-5 py-5'>
          <li className='flex gap-3 hover:text-white transition-all duration-300 items-center'>
            <FaHome />
            <NavLink to='/dashboard/adminHome'>Admin Home</NavLink>
          </li>
          <li className='flex gap-3 hover:text-white transition-all duration-300 items-center'>
            <FaCalendarAlt />
            <NavLink to='/dashboard/addItems'>add items</NavLink>
          </li>
          <li className='flex gap-3 hover:text-white transition-all duration-300 items-center'>
            <MdOutlinePayment />
            <NavLink to='/dashboard/manageItems'>manage items</NavLink>
          </li>
          <li className='flex gap-3 hover:text-white transition-all duration-300 items-center'>
            <FaBook />
            <NavLink to='/dashboard/manageUpdate'>Update Item</NavLink>
          </li>
          <li className='flex gap-3 hover:text-white transition-all duration-300 items-center'>
            <FaUsers />
            <NavLink to='/dashboard/allUsers'>all users</NavLink>
          </li>
        </ul>
      ) : (
        <ul className='space-y-5 py-5'>
          <li className='flex gap-3 hover:text-white transition-all duration-300 items-center'>
            <FaHome />
            <NavLink to='/dashboard/userHome'>User Home</NavLink>
          </li>
          <li className='flex gap-3 hover:text-white transition-all duration-300 items-center'>
            <FaCalendarAlt />
            <NavLink to='/dashboard/reservation'>reservation</NavLink>
          </li>
          <li className='flex gap-3 hover:text-white transition-all duration-300 items-center'>
            <MdOutlinePayment />
            <NavLink to='/dashboard/payment'>payment history</NavLink>
          </li>
          <li className='flex gap-3 hover:text-white transition-all duration-300 items-center'>
            <IoCart />
            <NavLink to='/dashboard/cart'>my cart</NavLink>
          </li>
          <li className='flex gap-3 hover:text-white transition-all duration-300 items-center'>
            <FaCalendarAlt />
            <NavLink to='/dashboard/bookings'>my booking</NavLink>
          </li>
        </ul>
      )}
      <hr />
      <ul className='space-y-5 py-5'>
        <li className='flex gap-3 hover:text-white transition-all duration-300 items-center'>
          <FaHome />
          <NavLink to='/'>Home</NavLink>
        </li>
        <li className='flex gap-3 hover:text-white transition-all duration-300 items-center'>
          <FaShoppingCart />
          <NavLink to=''>Shop</NavLink>
        </li>
        <li className='flex gap-3 hover:text-white transition-all duration-300 items-center'>
          <IoIosMenu />
          <NavLink to=''>Menu</NavLink>
        </li>
        <li className='flex gap-3 hover:text-white transition-all duration-300 items-center'>
          <FaPhoneAlt />
          <NavLink to=''>contact</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default DashMenu;
