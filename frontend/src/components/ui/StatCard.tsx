import type { ReactNode } from "react";

type StatCardProps = {
    icon : ReactNode;
    value : number | string;
    label : string;
    colorClass : string;
};

export default function StatCard({
    icon,
    value,
    label,
    colorClass,
}: StatCardProps) {
    return (
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
}