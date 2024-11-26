import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Type A', value: 500 },
  { name: 'Type B', value: 300 },
  { name: 'Type AB', value: 200 },
  { name: 'Type O', value: 1000 },
];

const COLORS = ['#FF8042', '#00C49F', '#FFBB28', '#0088FE'];

const PieChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height={400}> {/* Increased the height for better display */}
      <PieChart>
        <Pie 
          data={data} 
          dataKey="value" 
          nameKey="name" 
          outerRadius={150} 
          innerRadius={75}
          fill="#8884d8" 
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
