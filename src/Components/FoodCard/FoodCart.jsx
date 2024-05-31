import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

const FoodCart = ({ item }) => {
  const { name, image, price, recipe, _id } = item;
  const { user } = useAuth();
  const location = useLocation();
  const naviate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCart();

  const handleAddToCart = () => {
    if (user && user.email) {
      // sent cart item to the db
      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price,
      };

      axiosSecure
        .post("/carts", cartItem)
        .then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          }
        })
        .catch((error) => console.error("Error:", error));
    } else {
      Swal.fire({
        title: "You are not login",
        text: "Please login add to the cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login",
      }).then((result) => {
        if (result.isConfirmed) {
          // navigate to login page
          naviate("/login", { state: { from: location } });
        }
      });
    }
  };
  return (
    <div className='card w-96 bg-base-100 shadow-xl'>
      <figure>
        <img src={image} alt={name} className='w-full h-60 object-cover' />
      </figure>
      <p className='absolute right-0 mr-2 mt-4 px-4 py-2 bg-slate-900 text-white rounded-l'>
        ${price}
      </p>
      <div className='card-body flex flex-col items-center'>
        <h2 className='card-title'>{name}</h2>
        <p>{recipe}</p>
        <div className='card-actions justify-end'>
          <button
            onClick={handleAddToCart}
            className='btn btn-outline border-0 border-b-4 mt-4 bg-slate-50 border-yellow-600 text-yellow-600'
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCart;
