import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CashflowChart = ({ data }) => {
  return (
    <div className="bg-white dark:bg-neutral-800 p-4 rounded-xl border border-gray-200 dark:border-neutral-700 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Grafik Cashflow Bulanan
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => `Rp${value.toLocaleString()}`} />
          <Line type="monotone" dataKey="saldo" stroke="#841618" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CashflowChart;
