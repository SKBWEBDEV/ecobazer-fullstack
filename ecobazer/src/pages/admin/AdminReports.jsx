import { useEffect, useState } from "react";
import {
  ShoppingCart,
  DollarSign,
  CheckCircle,
  Clock,
  FileDown,
} from "lucide-react";

import { getSalesReport } from "../../services/reportService";
import Loader from "../../components/Loader";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import * as XLSX from "xlsx";

const AdminReports = () => {
  const [report, setReport] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await getSalesReport();

        setReport(data.report || {});
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.text("EcoBazer Sales Report", 14, 20);

    doc.text(`Total Orders: ${report.totalOrders}`, 14, 35);

    doc.text(`Total Revenue: ৳ ${report.totalRevenue}`, 14, 45);

    doc.text(`Delivered Orders: ${report.deliveredOrders}`, 14, 55);

    doc.text(`Pending Orders: ${report.pendingOrders}`, 14, 65);

    autoTable(doc, {
      startY: 80,

      head: [["Product", "Sold Quantity"]],

      body: report.topProducts.map((product) => [product.name, product.sold]),
    });

    doc.save("EcoBazer-Sales-Report.pdf");
  };

  // ===========================================EXAL FUNCTION===============================================
  const exportExcel = () => {
    const excelData = [
      {
        Report: "EcoBazer Sales Report",
        Value: "",
      },

      {
        Report: "Total Orders",
        Value: report.totalOrders,
      },

      {
        Report: "Total Revenue",
        Value: `৳ ${report.totalRevenue}`,
      },

      {
        Report: "Delivered Orders",
        Value: report.deliveredOrders,
      },

      {
        Report: "Pending Orders",
        Value: report.pendingOrders,
      },

      {
        Report: "",
        Value: "",
      },

      {
        Report: "Top Selling Products",
        Value: "",
      },

      ...report.topProducts.map((product) => ({
        Report: product.name,
        Value: `${product.sold} Sold`,
      })),
    ];

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Report");

    XLSX.writeFile(workbook, "EcoBazer-Sales-Report.xlsx");
  };

 if (loading || !report) {
  return <Loader />;
}

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Sales Report</h1>

        <div className="flex gap-3">
          <button
            onClick={exportPDF}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg">
            <FileDown size={20} />
            Export PDF
          </button>

          <button
            onClick={exportExcel}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg">
            <FileDown size={20} />
            Export Excel
          </button>
        </div>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
          <ShoppingCart />

          <h2 className="mt-2">Total Orders</h2>

          <p className="text-2xl font-bold">{report.totalOrders}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
          <DollarSign />

          <h2 className="mt-2">Total Revenue</h2>

          <p className="text-2xl font-bold">৳ {report.totalRevenue}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
          <CheckCircle />

          <h2 className="mt-2">Delivered</h2>

          <p className="text-2xl font-bold">{report.deliveredOrders}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
          <Clock />

          <h2 className="mt-2">Pending</h2>

          <p className="text-2xl font-bold">{report.pendingOrders}</p>
        </div>
      </div>

      {/* Top Products */}

      <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow p-5">
        <h2 className="text-xl font-bold mb-4">Top Selling Products</h2>

        <div className="space-y-3">

  {!report.topProducts?.length && (
    <p>No products found</p>
  )}


  {report.topProducts?.map((product, index) => (

    <div
      key={index}
      className="flex justify-between border-b pb-2"
    >

      <span>
        {index + 1}. {product.name}
      </span>

      <span className="font-semibold">
        {product.sold} Sold
      </span>

    </div>

  ))}

</div>
      </div>
    </div>
  );
};

export default AdminReports;
