import { Outlet } from "react-router-dom";
import DashMenu from "../Components/Dashboard/DashMenu";

const Dashboard = () => {
  return (
    <div className='flex gap-5'>
      <div className='w-64 min-h-screen '>
        <DashMenu />
      </div>
      <div className='w-full'>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
