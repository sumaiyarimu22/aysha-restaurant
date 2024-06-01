import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [transcationId, setTranscationId] = useState("");
  const [cart, refetch] = useCart();
  const { user } = useAuth();
  const navigation = useNavigate();

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
      console.log("PaymentMethod", paymentMethod);
    }
    // confirm card payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anoneymuch",
            name: user?.displayName,
          },
        },
      });

    if (confirmError) {
      console.log("confirmError");
    } else {
      console.log(paymentIntent);
      if (paymentIntent.status === "succeeded") {
        // console.log("transcationId", paymentIntent.id);
        setTranscationId(paymentIntent.id);

        // now save the payment into the database and delete the cart items
        const payment = {
          email: user?.email,
          price: totalPrice,
          date: new Date(),
          cartIds: cart.map((item) => item._id),
          menuItemIds: cart.map((menu) => menu.menuId),
          status: "pending",
          transcationId: paymentIntent.id,
        };

        const res = await axiosSecure.post("/payments", payment);
        refetch();
        if (res.data?.paymentResult?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "your payment successfull",
            showConfirmButton: false,
            timer: 1500,
          });
          navigation("/dashboard/paymentHistory");
        }
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col items-center w-full max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-md bg-white'
    >
      <div className='w-full mb-4 p-3 border border-gray-300 rounded-md bg-gray-50'>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",

                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
          className='card-element'
        />
      </div>
      <button
        type='submit'
        className='w-full py-3 mt-6 text-lg font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed'
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className='text-red-500'>{error}</p>
      {transcationId && (
        <p className='text-green-500'>your transcationId id {transcationId}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
