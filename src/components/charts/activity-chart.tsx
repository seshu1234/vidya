"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { name: "Mon", hours: 2.5 },
  { name: "Tue", hours: 4.0 },
  { name: "Wed", hours: 1.5 },
  { name: "Thu", hours: 3.0 },
  { name: "Fri", hours: 5.5 },
  { name: "Sat", hours: 6.0 },
  { name: "Sun", hours: 4.5 },
];

export function ActivityChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}h`}
        />
        <Tooltip 
            cursor={{fill: 'transparent'}}
            contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", borderRadius: "8px", color: "#fff" }}
            itemStyle={{ color: "#fff" }}
            formatter={(value) => [`${value} hours`, "Study Time"]}
        />
        <Bar
          dataKey="hours"
          fill="#10b981" // emerald-500
          radius={[4, 4, 0, 0]}
          barSize={40}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
