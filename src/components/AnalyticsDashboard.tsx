import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { TrendingUp, DollarSign, ShoppingBag, Users, Calendar, Flower } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface AnalyticsData {
  dailySales: Array<{ date: string; sales: number; revenue: number; orders: number }>;
  flowerTypes: Array<{ name: string; sales: number; revenue: number; color: string }>;
  shopPerformance: Array<{ shop: string; sales: number; revenue: number }>;
  monthlyTrends: Array<{ month: string; revenue: number; orders: number; customers: number }>;
}

export function AnalyticsDashboard() {
  const { state } = useApp();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [isLoading, setIsLoading] = useState(true);

  // Generate mock analytics data based on actual orders and flowers
  useEffect(() => {
    const generateAnalyticsData = (): AnalyticsData => {
      // Generate daily sales data for the last 30 days
      const dailySales = [];
      const today = new Date();
      
      for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        const sales = Math.floor(Math.random() * 50) + 10;
        const avgOrderValue = 35 + Math.random() * 30;
        const revenue = Math.floor(sales * avgOrderValue);
        const orders = Math.floor(sales * 0.8);
        
        dailySales.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          sales,
          revenue,
          orders
        });
      }

      // Generate flower type analytics
      const flowerColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];
      const flowerTypes = [
        { name: 'Roses', sales: 145, revenue: 6525 },
        { name: 'Tulips', sales: 89, revenue: 2848 },
        { name: 'Lilies', sales: 76, revenue: 2888 },
        { name: 'Sunflowers', sales: 65, revenue: 1820 },
        { name: 'Orchids', sales: 43, revenue: 2795 },
        { name: 'Daisies', sales: 58, revenue: 1450 },
        { name: 'Carnations', sales: 72, revenue: 2232 },
        { name: 'Peonies', sales: 34, revenue: 1870 }
      ].map((item, index) => ({
        ...item,
        color: flowerColors[index % flowerColors.length]
      }));

      // Generate shop performance data
      const shopPerformance = [
        { shop: 'Flowery Fragrant', sales: 156, revenue: 7020 },
        { shop: 'Bloomwell', sales: 134, revenue: 4690 },
        { shop: 'Garden Paradise', sales: 98, revenue: 5880 },
        { shop: 'Spring Blossoms', sales: 112, revenue: 4760 }
      ];

      // Generate monthly trends
      const monthlyTrends = [
        { month: 'Jan', revenue: 12500, orders: 285, customers: 220 },
        { month: 'Feb', revenue: 15800, orders: 342, customers: 275 },
        { month: 'Mar', revenue: 18200, orders: 398, customers: 310 },
        { month: 'Apr', revenue: 16900, orders: 375, customers: 295 },
        { month: 'May', revenue: 21300, orders: 456, customers: 365 },
        { month: 'Jun', revenue: 19800, orders: 425, customers: 340 }
      ];

      return {
        dailySales,
        flowerTypes,
        shopPerformance,
        monthlyTrends
      };
    };

    // Simulate loading delay
    const timer = setTimeout(() => {
      setAnalyticsData(generateAnalyticsData());
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [selectedTimeRange, state.orders]);

  if (isLoading || !analyticsData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-100 rounded-lg p-4">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate summary statistics
  const totalRevenue = analyticsData.dailySales.reduce((sum, day) => sum + day.revenue, 0);
  const totalOrders = analyticsData.dailySales.reduce((sum, day) => sum + day.orders, 0);
  const totalSales = analyticsData.dailySales.reduce((sum, day) => sum + day.sales, 0);
  const avgOrderValue = totalRevenue / totalOrders;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-800">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.name.includes('Revenue') || entry.name.includes('revenue') ? '$' : ''}{entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h2>
        </div>
        
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-600">Time Range:</label>
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value as '7d' | '30d' | '90d')}
            className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-blue-800">${totalRevenue.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Total Orders</p>
              <p className="text-2xl font-bold text-green-800">{totalOrders.toLocaleString()}</p>
            </div>
            <ShoppingBag className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Flowers Sold</p>
              <p className="text-2xl font-bold text-purple-800">{totalSales.toLocaleString()}</p>
            </div>
            <Flower className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium">Avg Order Value</p>
              <p className="text-2xl font-bold text-orange-800">${avgOrderValue.toFixed(0)}</p>
            </div>
            <Users className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Daily Sales Chart */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-purple-600" />
          Daily Sales & Revenue Trends
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analyticsData.dailySales}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EC4899" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#EC4899" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#8B5CF6"
                fillOpacity={1}
                fill="url(#colorRevenue)"
                name="Revenue ($)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#EC4899"
                fillOpacity={1}
                fill="url(#colorSales)"
                name="Flowers Sold"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Flower Types Pie Chart */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Flower Types</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData.flowerTypes}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="sales"
                  animationBegin={0}
                  animationDuration={1000}
                >
                  {analyticsData.flowerTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Shop Performance Bar Chart */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Shop Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.shopPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="shop" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                  dataKey="revenue"
                  fill="#8B5CF6"
                  name="Revenue ($)"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1000}
                />
                <Bar
                  dataKey="sales"
                  fill="#EC4899"
                  name="Sales"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1000}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Trends</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analyticsData.monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8B5CF6"
                strokeWidth={3}
                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                name="Revenue ($)"
                animationDuration={1500}
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#EC4899"
                strokeWidth={3}
                dot={{ fill: '#EC4899', strokeWidth: 2, r: 4 }}
                name="Orders"
                animationDuration={1500}
              />
              <Line
                type="monotone"
                dataKey="customers"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                name="Customers"
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}