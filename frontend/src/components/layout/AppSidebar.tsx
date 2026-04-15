import { NavLink } from "react-router-dom";
import erclogo from "../../assets/erc-logo.png";
import { superAdminNavItems } from "../../config/superAdminNav";

export default function AppSidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-slate-50 border-r border-slate-200 flex flex-col">
      <div className="p-6 flex items-center gap-3 border-b border-slate-200">
        <img
          src={erclogo}
          alt="Emergency & Relief Corps"
          className="h-16 w-auto object-contain"
        />

        <div>
          <h1 className="text-xl font-black text-red-700 leading-none">ERC</h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
            Super Admin
          </p>
        </div>
      </div>

      <nav className="flex-1 mt-4">
        {superAdminNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `w-full flex items-center gap-4 px-8 py-4 transition-all ${
                isActive
                  ? "bg-white text-red-700 border-l-4 border-red-700 font-bold"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`
            }
          >
            <span className="flex items-center justify-center">{item.icon}</span>
            <span className="text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}