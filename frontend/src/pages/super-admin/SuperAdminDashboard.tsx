import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import PageContainer from "../../components/layout/PageContainer";

interface DashboardStat {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ReactNode;
}

interface Center {
  id: number;
  name: string;
  location: string;
  ambulances: number;
  employees: number;
  status: "active" | "inactive" | "pending";
}

interface Activity {
  id: number;
  action: string;
  target: string;
  time: string;
  type: "create" | "update" | "delete" | "login";
}

const STATS: DashboardStat[] = [
  {
    label: "Total Centers",
    value: "12",
    change: "+1 this month",
    positive: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 21h18" />
        <path d="M5 21V7l7-4 7 4v14" />
        <path d="M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    label: "Active Users",
    value: "248",
    change: "+14 this week",
    positive: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: "Active Ambulances",
    value: "34",
    change: "2 under maintenance",
    positive: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="1" y="10" width="15" height="7" rx="2" />
        <path d="M16 12h3l3 3v2h-6" />
        <circle cx="5.5" cy="18.5" r="1.5" />
        <circle cx="18.5" cy="18.5" r="1.5" />
        <path d="M6 7v6" />
        <path d="M3 10h6" />
      </svg>
    ),
  },
  {
    label: "Today Missions",
    value: "19",
    change: "+3 from yesterday",
    positive: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
];

const CENTERS: Center[] = [
  { id: 1, name: "Beirut Center", location: "Beirut", ambulances: 6, employees: 42, status: "active" },
  { id: 2, name: "Tripoli Center", location: "Tripoli", ambulances: 4, employees: 29, status: "active" },
  { id: 3, name: "Sidon Center", location: "Sidon", ambulances: 3, employees: 21, status: "pending" },
  { id: 4, name: "Barja Center", location: "Barja", ambulances: 2, employees: 14, status: "active" },
  { id: 5, name: "Zahle Center", location: "Zahle", ambulances: 0, employees: 0, status: "inactive" },
];

const ACTIVITIES: Activity[] = [
  { id: 1, action: "New center created", target: "Sidon Center", time: "10 min ago", type: "create" },
  { id: 2, action: "Ambulance updated", target: "AMB-204", time: "25 min ago", type: "update" },
  { id: 3, action: "User login", target: "admin@erc.org", time: "40 min ago", type: "login" },
  { id: 4, action: "Center deactivated", target: "Zahle Center", time: "2 hr ago", type: "delete" },
  { id: 5, action: "Shift supervisor assigned", target: "Beirut Night Shift", time: "3 hr ago", type: "update" },
];

const StatusBadge: React.FC<{ status: Center["status"] }> = ({ status }) => {
  const styles: Record<Center["status"], string> = {
    active: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    pending: "bg-amber-50 text-amber-700 border border-amber-200",
    inactive: "bg-gray-100 text-gray-500 border border-gray-200",
  };

  const dotStyles: Record<Center["status"], string> = {
    active: "bg-emerald-500",
    pending: "bg-amber-500",
    inactive: "bg-gray-400",
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}>
      <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${dotStyles[status]}`} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const ActivityIcon: React.FC<{ type: Activity["type"] }> = ({ type }) => {
  const configs: Record<Activity["type"], { wrapper: string; icon: string; content: React.ReactNode }> = {
    create: {
      wrapper: "bg-emerald-50",
      icon: "text-emerald-600",
      content: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      ),
    },
    update: {
      wrapper: "bg-blue-50",
      icon: "text-blue-600",
      content: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
        </svg>
      ),
    },
    delete: {
      wrapper: "bg-red-50",
      icon: "text-red-500",
      content: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14H6L5 6" />
          <path d="M10 11v6M14 11v6" />
        </svg>
      ),
    },
    login: {
      wrapper: "bg-violet-50",
      icon: "text-violet-600",
      content: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
          <path d="M10 17l5-5-5-5" />
          <path d="M15 12H3" />
        </svg>
      ),
    },
  };

  const config = configs[type];

  return (
    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${config.wrapper} ${config.icon}`}>
      {config.content}
    </div>
  );
};

const SuperAdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Center["status"]>("all");

  const now = new Date();
  const greeting =
    now.getHours() < 12 ? "Good morning" : now.getHours() < 18 ? "Good afternoon" : "Good evening";

  const filteredCenters = useMemo(() => {
    return CENTERS.filter((center) => {
      const matchesSearch =
        center.name.toLowerCase().includes(search.toLowerCase()) ||
        center.location.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === "all" || center.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const quickActions = [
    {
      label: "Manage Centers",
      desc: "Create and update centers",
      path: "/super-admin/centers",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 21h18" />
          <path d="M5 21V7l7-4 7 4v14" />
          <path d="M9 21v-6h6v6" />
        </svg>
      ),
    },
    {
      label: "Manage Users",
      desc: "Admins, EMTs, drivers",
      path: "/super-admin/users",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      label: "Manage Ambulances",
      desc: "Vehicles and status",
      path: "/super-admin/ambulances",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="1" y="10" width="15" height="7" rx="2" />
          <path d="M16 12h3l3 3v2h-6" />
          <circle cx="5.5" cy="18.5" r="1.5" />
          <circle cx="18.5" cy="18.5" r="1.5" />
        </svg>
      ),
    },
    {
      label: "Reports",
      desc: "System analytics",
      path: "/super-admin/reports",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
  ];

  return (
    <PageContainer>
      <div className="space-y-8 pb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-sm font-medium text-red-600">{greeting}</p>
            <h1 className="text-2xl font-bold text-gray-900">{user?.name ?? "Super Admin"}</h1>
            <p className="mt-1 text-sm text-gray-500">
              {now.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 cursor-pointer">
              Export Report
            </button>

        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:border-gray-300 hover:shadow-md"
            >
              <div className="mb-4 flex items-start justify-between">
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
                  {stat.icon}
                </div>
              </div>

              <p className="mb-1 text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className={`text-xs font-medium ${stat.positive ? "text-emerald-600" : "text-red-500"}`}>
                {stat.change}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white xl:col-span-2">
            <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center">
              <div className="flex-1">
                <h2 className="text-base font-semibold text-gray-900">Centers Overview</h2>
                <p className="mt-0.5 text-xs text-gray-500">{CENTERS.length} total centers</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>

                  <input
                    type="text"
                    placeholder="Search centers..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-44 rounded-lg border border-gray-200 bg-gray-50 py-2 pl-8 pr-3 text-sm outline-none transition-all focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as "all" | Center["status"])}
                  className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition-all focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500"
                >
                  <option value="all">All status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Center
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Ambulances
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Employees
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Status
                    </th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                  {filteredCenters.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-10 text-center text-sm text-gray-400">
                        No centers match your search.
                      </td>
                    </tr>
                  ) : (
                    filteredCenters.map((center) => (
                      <tr key={center.id} className="group transition-colors hover:bg-gray-50">
                        <td className="px-5 py-4">
                          <p className="text-sm font-semibold text-gray-900">{center.name}</p>
                          <p className="mt-0.5 text-xs text-gray-500">{center.location}</p>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700">{center.ambulances}</td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700">{center.employees}</td>
                        <td className="px-4 py-4">
                          <StatusBadge status={center.status} />
                        </td>
                        <td className="px-4 py-4">
                          <button
                            onClick={() => navigate("/super-admin/centers")}
                            className="text-xs font-medium text-red-600 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-800"
                          >
                            Manage →
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-100 px-5 py-4">
              <h2 className="text-base font-semibold text-gray-900">Recent Activity</h2>
              <p className="mt-0.5 text-xs text-gray-500">Latest system updates</p>
            </div>

            <div className="divide-y divide-gray-50">
              {ACTIVITIES.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 px-5 py-4 transition-colors hover:bg-gray-50">
                  <ActivityIcon type={activity.type} />

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-snug text-gray-800">{activity.action}</p>
                    <p className="mt-0.5 truncate text-xs text-gray-500">{activity.target}</p>
                  </div>

                  <span className="mt-0.5 shrink-0 whitespace-nowrap text-xs text-gray-400">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 px-5 py-3">
              <button className="text-xs font-medium text-red-600 transition-colors hover:text-red-800">
                View all activity →
              </button>
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-base font-semibold text-gray-900">Quick Actions</h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 cursor-pointer">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className="group flex flex-col items-start gap-3 rounded-xl border border-gray-200 bg-white p-5 text-left transition-all duration-200 hover:border-gray-300 hover:shadow-md cursor-pointer"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600 transition-colors group-hover:bg-red-100">
                  {action.icon}
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900">{action.label}</p>
                  <p className="mt-0.5 text-xs text-gray-500">{action.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default SuperAdminDashboard;