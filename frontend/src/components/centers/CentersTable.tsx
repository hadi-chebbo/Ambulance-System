import { Edit, Visibility } from "@mui/icons-material";
import type { Center } from "../../types/center";
import CenterStatusBadge from "./CenterStatusBadge";
import Pagination from "../ui/Pagination";
import Loader from "../ui/Loader";

type CentersTableProps = {
  centers: Center[];
  loading: boolean;
  error: string;
  currentPage: number;
  lastPage: number;
  onPrevious: () => void;
  onNext: () => void;
};

export default function CentersTable({
  centers,
  loading,
  error,
  currentPage,
  lastPage,
  onPrevious,
  onNext,
}: CentersTableProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-8 py-6 border-b border-slate-100">
        <h3 className="text-lg font-bold">Centers List</h3>
        <p className="text-sm text-slate-500">
          All registered centers in the system.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader size={70} />
        </div>
      ) : error ? (
        <div className="p-10 text-center text-red-600">{error}</div>
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
                  <td className="px-8 py-5 font-bold">{center.name}</td>
                  <td className="px-8 py-5 text-sm text-slate-600">{center.email}</td>
                  <td className="px-8 py-5 text-sm text-slate-600">{center.address}</td>
                  <td className="px-8 py-5">
                    <CenterStatusBadge isActive={center.is_active} />
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

          <Pagination
            currentPage={currentPage}
            lastPage={lastPage}
            onPrevious={onPrevious}
            onNext={onNext}
          />
        </>
      )}
    </div>
  );
}