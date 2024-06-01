import { Elements } from "@stripe/react-stripe-js";
import SectionsTitle from "../../Components/SectionTitles/SectionsTitle";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GETWAY_PK);

const Payment = () => {
  return (
    <div className='w-full '>
      <SectionsTitle heading='payment' subHeading='' />

      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
