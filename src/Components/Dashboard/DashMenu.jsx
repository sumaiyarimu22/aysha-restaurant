import {
  FaHome,
  FaCalendarAlt,
  FaShoppingCart,
  FaPhoneAlt,
  FaUsers,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { IoCart } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";
import useAdmin from "../../hooks/useAdmin";
import useCart from "../../hooks/useCart";

const DashMenu = () => {
  const [isAdmin] = useAdmin();
  const [cart] = useCart();

  return (
    <div className='p-5 bg-white shadow-lg rounded-lg'>
      <h1 className='text-3xl font-bold text-center mb-3'>AYSHA</h1>
      <p className='text-lg text-center mb-5'>Restaurant</p>

      {isAdmin ? (
        <ul className='space-y-2'>
          <MenuItem icon={<FaHome />} to='/dashboard/adminHome'>
            Admin Home
          </MenuItem>
          <MenuItem icon={<FaCalendarAlt />} to='/dashboard/addItems'>
            Add Items
          </MenuItem>
          <MenuItem icon={<MdOutlinePayment />} to='/dashboard/manageItems'>
            Manage Items
          </MenuItem>
          <MenuItem icon={<FaUsers />} to='/dashboard/allUsers'>
            All Users
          </MenuItem>
        </ul>
      ) : (
        <ul className='space-y-2'>
          <MenuItem icon={<FaHome />} to='/dashboard/userHome'>
            User Home
          </MenuItem>
          <MenuItem icon={<FaCalendarAlt />} to='/dashboard/reservation'>
            Reservation
          </MenuItem>
          <MenuItem icon={<MdOutlinePayment />} to='/dashboard/paymentHistory'>
            Payment History
          </MenuItem>
          <MenuItem icon={<IoCart />} to='/dashboard/cart'>
            My Cart ({cart.length})
          </MenuItem>
          <MenuItem icon={<FaCalendarAlt />} to='/dashboard/bookings'>
            My Bookings
          </MenuItem>
        </ul>
      )}

      <hr className='my-5' />

      <ul className='space-y-2'>
        <MenuItem icon={<FaHome />} to='/'>
          Home
        </MenuItem>
        <MenuItem icon={<FaShoppingCart />} to='/order/:id'>
          Shop
        </MenuItem>
        <MenuItem icon={<IoIosMenu />} to='/menu'>
          Menu
        </MenuItem>
        <MenuItem icon={<FaPhoneAlt />} to='/contact'>
          Contact
        </MenuItem>
      </ul>
    </div>
  );
};

const MenuItem = ({ icon, to, children }) => (
  <li className='flex items-center gap-3 hover:text-white transition-all duration-300'>
    {icon}
    <NavLink
      to={to}
      className='nav-link text-gray-700 hover:text-gray-900'
      activeClassName='text-yellow-500'
    >
      {children}
    </NavLink>
  </li>
);

export default DashMenu;
