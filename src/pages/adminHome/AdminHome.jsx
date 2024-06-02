import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaBook, FaTruck, FaUsers, FaWallet } from "react-icons/fa";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  ResponsiveContainer,
  Legend,
} from "recharts";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: states = {} } = useQuery({
    queryKey: ["admin-state"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-state");
      return res.data;
    },
  });

  const { data: chartData = [] } = useQuery({
    queryKey: ["order-state"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order-stats");
      return res.data;
    },
  });

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // custom shape for bar chart
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
  Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke='none' fill={fill} />;
  };

  // custom shape for bar chart

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill='white'
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline='central'
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const pieChartData = chartData.map((data) => {
    return { name: data.category, value: data.revenue };
  });
  return (
    <div>
      <h2 className='text-3xl'>
        Hi Welcome {user?.displayName ? user.displayName : "Back"}
      </h2>

      <div className='stats shadow w-full my-10'>
        <div className='stat'>
          <div className='stat-figure text-primary text-3xl'>
            <FaWallet />
          </div>

          <div className='stat-value text-primary'>{states?.revenue}</div>
          <div className='stat-desc text-lg'>Revenue</div>
        </div>
        <div className='stat'>
          <div className='stat-figure text-primary text-3xl'>
            <FaUsers />
          </div>

          <div className='stat-value text-primary'>{states?.users}</div>
          <div className='stat-desc text-lg'>Customers</div>
        </div>

        <div className='stat'>
          <div className='stat-figure text-primary text-3xl'>
            <FaBook />
          </div>

          <div className='stat-value text-primary'>{states?.menu}</div>
          <div className='stat-desc text-lg'>Products</div>
        </div>
        <div className='stat'>
          <div className='stat-figure text-primary text-4xl '>
            <FaTruck />
          </div>

          <div className='stat-value text-primary'>{states?.orders}</div>
          <div className='stat-desc text-lg'>Orders</div>
        </div>
      </div>
      <div className='flex'>
        <div className='w-1/2'>
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='category' />
            <YAxis />
            <Bar
              dataKey='quantity'
              fill='#8884d8'
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
              ))}
            </Bar>
          </BarChart>
        </div>
        <div className='w-1/2'>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart width={400} height={400}>
              <Legend />
              <Pie
                data={pieChartData}
                cx='50%'
                cy='50%'
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill='#8884d8'
                dataKey='value'
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
