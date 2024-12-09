import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4000 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 7000 },
  { name: "Jul", value: 5000 },
  { name: "Aug", value: 8000 },
  { name: "Sep", value: 6000 },
  { name: "Oct", value: 9000 },
  { name: "Nov", value: 7000 },
  { name: "Dec", value: 10000 },
];

const LineChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
