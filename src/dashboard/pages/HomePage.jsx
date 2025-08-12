"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearAllUserErrors } from "@/store/slices/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

function HomePage() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const { isAuthenticated, user, error } = useSelector(
    (state) => state.user || {}
  );

  const [hasWelcomed, setHasWelcomed] = useState(false);
  const [taskCounts, setTaskCounts] = useState({
    "To Do": 0,
    "In Progress": 0,
    Review: 0,
    Done: 0,
  });

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    document.title = "Imagine House | Dashboard";
  }, []);

  // ✅ Toast welcome only once
  useEffect(() => {
    if (isAuthenticated && user?.fullName && !hasWelcomed) {
      toast.success(`Selamat Datang, ${user.fullName}!`);
      setHasWelcomed(true);
    }
  }, [isAuthenticated, user, hasWelcomed]);

  // ✅ Handle error & auth redirect
  useEffect(() => {
    if (typeof error === "string" && error.trim() !== "") {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }

    if (!isAuthenticated) {
      navigateTo("/login");
    }
  }, [error, isAuthenticated, dispatch, navigateTo]);

  // ✅ Fetch task counts & transactions
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await axios.get("/api/v1/task/counts");
        const countsData = res.data.counts || [];

        const newCounts = {
          "To Do": 0,
          "In Progress": 0,
          Review: 0,
          Done: 0,
        };

        countsData.forEach(({ status, count }) => {
          if (newCounts.hasOwnProperty(status)) {
            newCounts[status] = count;
          }
        });

        setTaskCounts(newCounts);
      } catch (err) {
        console.error("Failed to fetch task counts:", err);
      }
    };

    const fetchTransactions = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/finance");
        setTransactions(res.data);
      } catch (err) {
        console.error("Gagal mengambil data transaksi:", err);
      }
    };

    if (isAuthenticated) {
      fetchCounts();
      fetchTransactions();
    }
  }, [isAuthenticated]);

  // ✅ Chart data
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, cur) => acc + cur.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, cur) => acc + cur.amount, 0);

  const saldo = totalIncome - totalExpense;

  const chartData = [
    { name: "Income", amount: totalIncome },
    { name: "Expense", amount: totalExpense },
  ];

  const cashflowData = [];
  for (let i = 1; i <= 12; i++) {
    const monthName = [
      "",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ][i];

    const income = transactions
      .filter(
        (t) => t.type === "income" && new Date(t.date).getMonth() + 1 === i
      )
      .reduce((acc, cur) => acc + cur.amount, 0);

    const expense = transactions
      .filter(
        (t) => t.type === "expense" && new Date(t.date).getMonth() + 1 === i
      )
      .reduce((acc, cur) => acc + cur.amount, 0);

    cashflowData.push({
      month: monthName,
      saldo: income - expense,
    });
  }

  return (
    <PageTransition>
      <div className="flex flex-col gap-6 p-6 w-full">
        <h1 className="text-4xl font-bold text-[#841618]">Dashboard📊</h1>

        {/* ✅ Total Saldo */}
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-xl border border-gray-200 dark:border-neutral-700 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            💰 Total Saldo
          </h2>
          <p className="text-2xl font-bold text-[#841618]">
            Rp{saldo.toLocaleString("id-ID")}
          </p>
        </div>
        <h1 className="text-4xl font-bold text-[#841618]">Project Tracker🚀</h1>

        {/* ✅ Task Counts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {["To Do", "In Progress", "Review", "Done"].map((title) => (
            <div
              key={title}
              className="rounded-xl border bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-900"
            >
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {title}
              </h2>
              <p className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white">
                {taskCounts[title] ?? 0}
              </p>
            </div>
          ))}
        </div>

        <h1 className="text-4xl font-bold text-[#841618]">
          Finance Tracker 💰
        </h1>

        {/* ✅ Income vs Expense Chart */}
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-xl border border-gray-200 dark:border-neutral-700 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Grafik Income vs Expense
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `Rp${value.toLocaleString()}`} />
              <Bar dataKey="amount" fill="#841618" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ✅ Cashflow Chart */}
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-xl border border-gray-200 dark:border-neutral-700 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Grafik Cashflow Bulanan
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cashflowData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `Rp${value.toLocaleString()}`} />
              <Line type="monotone" dataKey="saldo" stroke="#841618" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </PageTransition>
  );
}

export default HomePage;
