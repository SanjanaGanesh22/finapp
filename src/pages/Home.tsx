import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  
  // Mock data - in a real app, this would come from your backend
  const accountBalance = 5280.42;
  const monthlyIncome = 4200.00;
  const monthlySpending = 3150.75;
  const savings = 1049.25;

  // Monthly spending trend data
  const monthlyTrend = [
    { month: 'Jan', amount: 2800 },
    { month: 'Feb', amount: 3200 },
    { month: 'Mar', amount: 3100 },
    { month: 'Apr', amount: 3400 },
    { month: 'May', amount: 2900 },
    { month: 'Jun', amount: 3150 },
  ];

  // Find max amount for scaling
  const maxAmount = Math.max(...monthlyTrend.map(item => item.amount));

  const recentTransactions = [
    { id: 1, merchant: 'Grocery Store', amount: -85.42, date: '2024-03-15', category: 'Groceries' },
    { id: 2, merchant: 'Salary Deposit', amount: 2100.00, date: '2024-03-14', category: 'Income' },
    { id: 3, merchant: 'Netflix', amount: -15.99, date: '2024-03-13', category: 'Entertainment' },
    { id: 4, merchant: 'Gas Station', amount: -45.00, date: '2024-03-12', category: 'Transportation' },
    { id: 5, merchant: 'Freelance Payment', amount: 500.00, date: '2024-03-11', category: 'Income' },
  ];

  const spendingByCategory = [
    { category: 'Housing', amount: 1200, percentage: 38 },
    { category: 'Food', amount: 600, percentage: 19 },
    { category: 'Transportation', amount: 400, percentage: 13 },
    { category: 'Entertainment', amount: 300, percentage: 10 },
    { category: 'Utilities', amount: 250, percentage: 8 },
    { category: 'Other', amount: 400, percentage: 12 },
  ];

  // Handle sign out
  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/20">
            Add Transaction
          </button>
          <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
            Export
          </button>
          
          {/* Dropdown Menu */}
          <div className="relative dropdown-container">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              <span className="text-2xl">👤</span>
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl py-1 z-10 border border-gray-700">
                <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                  Account
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                  Link
                </button>
                <button 
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-blue-500/50 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Balance</p>
              <h3 className="text-2xl font-bold text-white">${accountBalance.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-full">
              <span className="text-blue-400 text-xl">$</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-green-500/50 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Monthly Income</p>
              <h3 className="text-2xl font-bold text-green-400">${monthlyIncome.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-green-500/10 rounded-full">
              <span className="text-green-400 text-xl">↑</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-red-500/50 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Monthly Spending</p>
              <h3 className="text-2xl font-bold text-red-400">${monthlySpending.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-red-500/10 rounded-full">
              <span className="text-red-400 text-xl">↓</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-purple-500/50 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Monthly Savings</p>
              <h3 className="text-2xl font-bold text-purple-400">${savings.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-full">
              <span className="text-purple-400 text-xl">↗</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Recent Transactions</h2>
            <button className="text-blue-400 hover:text-blue-300">View All</button>
          </div>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-800 rounded-full">
                    <span className="text-gray-400">💳</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{transaction.merchant}</p>
                    <p className="text-sm text-gray-400">{transaction.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${transaction.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    ${Math.abs(transaction.amount).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-400">{transaction.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spending by Category */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Spending by Category</h2>
            <span className="text-gray-400 text-xl">📊</span>
          </div>
          <div className="space-y-4">
            {spendingByCategory.map((category) => (
              <div key={category.category}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-300">{category.category}</span>
                  <span className="text-sm text-gray-400">${category.amount}</span>
                </div>
                <div className="w-full bg-gray-900 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Spending Trend */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
          <h2 className="text-lg font-semibold text-white mb-6">Monthly Spending Trend</h2>
          <div className="h-64 flex items-end justify-between">
            {monthlyTrend.map((item) => (
              <div key={item.month} className="flex flex-col items-center">
                <div 
                  className="w-8 bg-blue-500 rounded-t-md"
                  style={{ 
                    height: `${(item.amount / maxAmount) * 100}%`,
                    minHeight: '20px'
                  }}
                ></div>
                <span className="mt-2 text-sm text-gray-400">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Income vs Expenses */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
          <h2 className="text-lg font-semibold text-white mb-6">Income vs Expenses</h2>
          <div className="flex items-center justify-center h-64">
            <div className="relative w-48 h-48">
              {/* Donut chart using CSS */}
              <div className="absolute inset-0 rounded-full border-8 border-gray-700"></div>
              <div 
                className="absolute inset-0 rounded-full border-8 border-green-500"
                style={{ 
                  clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
                  transform: `rotate(${(monthlyIncome / (monthlyIncome + monthlySpending)) * 360}deg)`
                }}
              ></div>
              <div 
                className="absolute inset-0 rounded-full border-8 border-red-500"
                style={{ 
                  clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
                  transform: `rotate(${(monthlySpending / (monthlyIncome + monthlySpending)) * 360}deg)`
                }}
              ></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm text-gray-400">Income</span>
                <span className="text-lg font-bold text-green-400">${monthlyIncome.toLocaleString()}</span>
                <span className="text-sm text-gray-400 mt-1">Expenses</span>
                <span className="text-lg font-bold text-red-400">${monthlySpending.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 