import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionsTitle from "../../Components/SectionTitles/SectionsTitle";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments } = useQuery({
    queryKey: ["payment", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/paymentHistory/${user.email}`);
      return res.data;
    },
  });
  console.log(payments);
  return (
    <div className='w-full '>
      <SectionsTitle heading='PAYMENT HISTORY' subHeading='At a Glance!' />
      <div className='overflow-x-auto'>
        <table className='table'>
          {/* head */}
          <thead>
            <tr className='text-2xl py-5'>
              <th>#</th>

              <th>Email</th>
              <th>Category</th>

              <th>Total Price</th>

              <th>Payment Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {payments.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>

                <td>{item.email}</td>
                <td>Food Order</td>
                <td>${item.price}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
