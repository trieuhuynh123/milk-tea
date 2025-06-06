import { useEffect, useState } from 'react';
import MainLayout from '../../components/MainLayout';
import axios from 'axios';
import { apiURL } from '../../config/constanst';
import Chart from 'react-apexcharts';

export default function DashBoard() {
  const [dailyStats, setDailyStats] = useState<{ date: string; count: number; revenue: number }[]>(
    [],
  );
  const [topProducts, setTopProducts] = useState<
    { productId: number; productName: string; totalQuantity: number }[]
  >([]);
  const [lowRevenueStores, setLowRevenueStores] = useState<
    { storeId: number; storeName: string; totalRevenue: number }[]
  >([]);

  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 29);
    return d.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${apiURL}/orders/statistics`, {
          params: { startDate, endDate },
        });

        const sorted = [...res.data.data.dailyStats].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );

        setDailyStats(sorted);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    }

    fetchData();
  }, [startDate, endDate]);

  useEffect(() => {
    async function fetchTopProducts() {
      try {
        const res = await axios.get(`${apiURL}/orders/statistics/product`, {
          params: { startDate, endDate },
        });
        setTopProducts(res.data.data);
      } catch (error) {
        console.error('Error fetching top products:', error);
      }
    }

    fetchTopProducts();
  }, [startDate, endDate]);

  useEffect(() => {
    async function fetchLowRevenueStores() {
      try {
        const res = await axios.get(`${apiURL}/store/statistics`, {
          params: { startDate, endDate },
        });
        setLowRevenueStores(res.data.data);
      } catch (error) {
        console.error('Error fetching low revenue stores:', error);
      }
    }

    fetchLowRevenueStores();
  }, [startDate, endDate]);

  const commonOptions = {
    chart: {
      id: 'basic-line',
      zoom: { enabled: false },
    },
    xaxis: {
      categories: dailyStats.map((d) => d.date),
      title: { text: 'Ngày' },
    },
    stroke: {
      curve: 'smooth' as 'smooth',
    },
  };

  return (
    <MainLayout
      title="Tổng quan thông tin của sàn"
      content={
        <div className="container mx-auto space-y-8 p-4">
          {/* Bộ lọc ngày */}
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex flex-col text-sm font-medium text-gray-700">
              Ngày bắt đầu:
              <input
                type="date"
                value={startDate}
                max={endDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </label>
            <label className="flex flex-col text-sm font-medium text-gray-700">
              Ngày kết thúc:
              <input
                type="date"
                value={endDate}
                min={startDate}
                max={new Date().toISOString().split('T')[0]}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </label>
          </div>

          {/* Biểu đồ tổng hợp */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Đơn hàng */}
            <div className="rounded-xl bg-white p-4 shadow-md">
              <h3 className="mb-4 text-center text-lg font-semibold">Số đơn hàng theo ngày</h3>
              <Chart
                options={{
                  ...commonOptions,
                  yaxis: {
                    title: { text: 'Số đơn' },
                    min: 0,
                    labels: { formatter: (val: number) => Math.round(val).toString() },
                  },
                }}
                series={[{ name: 'Số đơn', data: dailyStats.map((d) => d.count) }]}
                type="line"
                height={300}
                width="100%"
              />
            </div>

            {/* Doanh thu */}
            <div className="rounded-xl bg-white p-4 shadow-md">
              <h3 className="mb-4 text-center text-lg font-semibold">Doanh thu theo ngày</h3>
              <Chart
                options={{
                  ...commonOptions,
                  yaxis: {
                    title: { text: 'Doanh thu (VND)' },
                    min: 0,
                    labels: {
                      formatter: (val: number) =>
                        val.toLocaleString('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                          maximumFractionDigits: 0,
                        }),
                    },
                  },
                  tooltip: {
                    y: {
                      formatter: (val: number) =>
                        val.toLocaleString('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                          maximumFractionDigits: 0,
                        }),
                    },
                  },
                }}
                series={[{ name: 'Doanh thu', data: dailyStats.map((d) => d.revenue) }]}
                type="line"
                height={300}
                width="100%"
              />
            </div>
          </div>

          {/* Top sản phẩm bán chạy */}
          <div className="rounded-xl bg-white p-4 shadow-md">
            <h3 className="mb-4 text-center text-lg font-semibold">Top 5 sản phẩm bán chạy nhất</h3>
            <Chart
              options={{
                chart: { id: 'top-products-bar', toolbar: { show: false } },
                xaxis: {
                  categories: topProducts.map((p) => p.productName),
                  title: { text: 'Sản phẩm' },
                },
                yaxis: {
                  title: { text: 'Số lượng bán ra' },
                  min: 0,
                  labels: { formatter: (val: number) => Math.round(val).toString() },
                },
                plotOptions: { bar: { horizontal: false } },
                dataLabels: { enabled: true },
              }}
              series={[{ name: 'Số lượng', data: topProducts.map((p) => p.totalQuantity) }]}
              type="bar"
              height={350}
              width="100%"
            />
          </div>

          {/* Store doanh thu thấp */}
          <div className="rounded-xl bg-white p-4 shadow-md">
            <h3 className="mb-4 text-center text-lg font-semibold">
              Top 5 cửa hàng có doanh thu thấp nhất
            </h3>
            <Chart
              options={{
                chart: { id: 'low-revenue-stores-bar', toolbar: { show: false } },
                xaxis: {
                  categories: lowRevenueStores.map((s) => s.storeName),
                  title: { text: 'Cửa hàng' },
                },
                yaxis: {
                  title: { text: 'Doanh thu (VND)' },
                  min: 0,
                  labels: {
                    formatter: (val: number) =>
                      val.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                        maximumFractionDigits: 0,
                      }),
                  },
                },
                tooltip: {
                  y: {
                    formatter: (val: number) =>
                      val.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                        maximumFractionDigits: 0,
                      }),
                  },
                },
                plotOptions: { bar: { horizontal: false } },
                dataLabels: {
                  enabled: true,
                  formatter: (val: number) =>
                    val.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                      maximumFractionDigits: 0,
                    }),
                },
              }}
              series={[{ name: 'Doanh thu', data: lowRevenueStores.map((s) => s.totalRevenue) }]}
              type="bar"
              height={350}
              width="100%"
            />
          </div>
        </div>
      }
    />
  );
}
