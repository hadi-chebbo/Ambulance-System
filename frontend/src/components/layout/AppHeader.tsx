import { NotificationsActive, Search } from "@mui/icons-material";

type AppHeaderProps = {
  searchPlaceholder?: string;
};

export default function AppHeader({
  searchPlaceholder = "Search...",
}: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-40 ml-72 bg-white/80 backdrop-blur-md border-b border-slate-100 px-10 py-4 flex items-center justify-between">
      <div className="relative w-96">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          fontSize="small"
        />
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-full text-sm outline-none"
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
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
}