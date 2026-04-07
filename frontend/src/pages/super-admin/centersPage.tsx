import { useEffect, useState } from "react";
import {
  Dashboard,
  LocalShipping,
  Group,
  Assignment,
  BarChart,
  Settings,
  Search,
  NotificationsActive,
  Add,
  Visibility,
  Edit,
  CheckCircle,
  WarningAmber,
  Sync,
} from "@mui/icons-material";

import { getCenters } from "../../services/centerService";
import type { Center } from "../../types/center";
import erclogo from "../../assets/erc-logo.png";
import ercicon from "../../assets/erc-icon.png";

// ─── Sidebar ─────────────────────────────────────────────────────
const Sidebar = () => {
  const navItems = [
    { label: "Dashboard", icon: <Dashboard />, active: false },
    { label: "Centers", icon: <img src={ercicon} alt="erc-icon" className="h-8" />, active: true },
    { label: "Ambulances", icon: <LocalShipping />, active: false },
    { label: "Users", icon: <Group />, active: false },
    { label: "Missions", icon: <Assignment />, active: false },
    { label: "Reports", icon: <BarChart />, active: false },
    { label: "Settings", icon: <Settings />, active: false },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-slate-50 border-r border-slate-200 flex flex-col">
      <div className="p-6 flex flex-row items-center border-b border-slate-200">
        <img
         src={erclogo} 
         alt="Emergency & Relief Corps"
         className="h-20 text-[11px] text-slate-500 text-center mt-1"
        />

        <h1 className="text-xl font-black text-red-700">ERC</h1>

        <p className="text-xs text-slate-500 uppercase tracking-widest">
          Super Admin
        </p>
      </div>

      <nav className="flex-1 mt-4">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-4 px-8 py-4 transition-all ${
              item.active
                ? "bg-white text-red-700 border-l-4 border-red-700 font-bold"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            {item.icon}
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

// ─── Header ─────────────────────────────────────────────────────
const Header = () => (
  <header className="sticky top-0 z-40 ml-72 bg-white/80 backdrop-blur-md border-b border-slate-100 px-10 py-4 flex items-center justify-between">
    <div className="relative w-96">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fontSize="small" />
      <input
        type="text"
        placeholder="Search centers..."
        className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-full text-sm outline-none"
      />
    </div>

    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
          ERC Network
        </span>
      </div>

      <button className="text-slate-400 hover:text-red-600 transition-colors">
        <NotificationsActive />
      </button>
    </div>
  </header>
);

// ─── Stat Card ──────────────────────────────────────────────────
const StatCard = ({
  icon,
  value,
  label,
  colorClass,
}: {
  icon: React.ReactNode;
  value: number | string;
  label: string;
  colorClass: string;
}) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5 flex-1">
    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${colorClass}`}>
      {icon}
    </div>
    <div>
      <span className="text-3xl font-black text-slate-900">{value}</span>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
        {label}
      </p>
    </div>
  </div>
);

// ─── Main Page ──────────────────────────────────────────────────
export default function CentersPage() {
  const [centers, setCenters] = useState<Center[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchCenters = async (page: number) => {
    try {
      setLoading(true);
      setError("");

      const response = await getCenters(page);

      setCenters(response.data);
      setCurrentPage(response.meta.current_page);
      setLastPage(response.meta.last_page);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to fetch centers");
      setCenters([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCenters(currentPage);
  }, [currentPage]);

  const totalCenters = centers.length;
  const activeCenters = centers.filter((c) => c.is_active).length;
  const inactiveCenters = centers.filter((c) => !c.is_active).length;

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <Header />

      <main className="ml-72 p-10 max-w-400 mx-auto">
        {/* ─── Page Header ─── */}
        <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          ERC / Super Admin / Centers
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-5xl font-black text-slate-900">
              Centers Overview
            </h2>
            <p className="text-slate-500">
              Manage and monitor all ERC centers.
            </p>
          </div>

          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2">
            <Add />
            Add Center
          </button>
        </div>

        {/* ─── Stats ─── */}
        <div className="flex gap-6 mb-8">
          <StatCard
            icon={<img src={ercicon} alt="erc-icon" className="h-15"></img>}
            value={totalCenters}
            label="Total Centers"
            colorClass="bg-red-50"
          />
          <StatCard
            icon={<CheckCircle className="text-emerald-500" />}
            value={activeCenters}
            label="Active"
            colorClass="bg-emerald-50"
          />
          <StatCard
            icon={<WarningAmber className="text-amber-500" />}
            value={inactiveCenters}
            label="Inactive"
            colorClass="bg-amber-50"
          />
          <StatCard
            icon={<Sync className="text-sky-500" />}
            value="Now"
            label="Last Sync"
            colorClass="bg-sky-50"
          />
        </div>

        {/* ─── Table ─── */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100">
            <h3 className="text-lg font-bold">Centers List</h3>
            <p className="text-sm text-slate-500">
              All registered centers in the system.
            </p>
          </div>

          {loading ? (
            <div className="p-10 text-center text-slate-500">
              Loading...
            </div>
          ) : error ? (
            <div className="p-10 text-center text-red-600">
              {error}
            </div>
          ) : (
            <>
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-xs uppercase text-slate-400">
                  <tr>
                    <th className="px-8 py-4">Center</th>
                    <th className="px-8 py-4">Email</th>
                    <th className="px-8 py-4">Address</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {centers.map((center) => (
                    <tr key={center.id} className="hover:bg-slate-50">
                      <td className="px-8 py-5 font-bold">
                        {center.name}
                      </td>

                      <td className="px-8 py-5 text-sm text-slate-600">
                        {center.email}
                      </td>

                      <td className="px-8 py-5 text-sm text-slate-600">
                        {center.address}
                      </td>

                      <td className="px-8 py-5">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            center.is_active
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {center.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-8 py-5">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 hover:bg-slate-100 rounded">
                            <Visibility fontSize="small" />
                          </button>
                          <button className="p-2 hover:bg-slate-100 rounded">
                            <Edit fontSize="small" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* ─── Pagination ─── */}
              {lastPage > 1 && (
                <div className="flex justify-between items-center px-8 py-4 border-t">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                  >
                    Previous
                  </button>

                  <span className="text-sm text-slate-500">
                    Page {currentPage} of {lastPage}
                  </span>

                  <button
                    disabled={currentPage === lastPage}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}