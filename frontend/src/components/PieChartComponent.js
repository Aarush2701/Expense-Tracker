// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28FDB', '#FF6666'];

// function PieChartComponent() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchSummary = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get(`${process.env.REACT_APP_API_URL}/expenses/category-summary`, {
//           headers: {
//             Authorization: token
//           }
//         });

//         console.log('✅ Pie Chart Data:', res.data);
//         setData(res.data);
//       } catch (err) {
//         console.error('❌ Failed to fetch category summary:', err.message);
//       }
//     };

//     fetchSummary();
//   }, []);

//   return (
//     <div className="piechartdiv">
//       <h2 className="piecharthead">Expenses by Category</h2>

//       {data.length === 0 ? (
//         <p className="piechart-empty">No categorized expenses to display.</p>
//       ) : (
//         <PieChart width={600} height={450}>
//           <Pie
//             data={data}
//             dataKey="amount"
//             nameKey="category"
//             cx="50%"
//             cy="50%"
//             outerRadius={150}
//             label={({ category, amount }) => `${category}: ₹${amount}`}
//           >
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip formatter={(value, name) => [`₹${value}`, name]} />
//           <Legend
//             layout="horizontal"
//             verticalAlign="bottom"
//             align="center"
//             wrapperStyle={{ marginTop: '20px' }}
//             payload={data.map((entry, index) => ({
//               id: entry.category,
//               value: `${entry.category}: ₹${entry.amount}`,
//               type: 'square',
//               color: COLORS[index % COLORS.length]
//             }))}
//           />
//         </PieChart>
//       )}
//     </div>
//   );
// }

// export default PieChartComponent;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28FDB', '#FF6666'];

function PieChartComponent() {
  const [data, setData] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 410);
    };
    handleResize(); // run initially
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/expenses/category-summary', {
          headers: {
            Authorization: token,
          },
        });
        setData(res.data);
      } catch (err) {
        console.error('❌ Failed to fetch category summary:', err.message);
      }
    };

    fetchSummary();
  }, []);

  const formatLabel = ({ category, amount }) =>
    isMobile ? '' : `${category}: ₹${amount}`;

  return (
    <div
      className="piechartdiv"
      style={{
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '10px',
        boxSizing: 'border-box',
      }}
    >
      <h2
        className="piecharthead"
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          marginBottom: '10px',
        }}
      >
        Expenses by Category
      </h2>

      {data.length === 0 ? (
        <p className="piechart-empty" style={{ textAlign: 'center' }}>
          No categorized expenses to display.
        </p>
      ) : (
        <div
          style={{
            width: '100%',
            height: isMobile ? '300px' : '450px',
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={isMobile ? 100 : 150}
                label={formatLabel}
                labelLine={!isMobile}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`₹${value}`, name]} />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{
                  fontSize: isMobile ? '12px' : '14px',
                  paddingTop: '10px',
                  textAlign: 'center',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default PieChartComponent;
