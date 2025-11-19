import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import {
  formatDate,
  formatStatus,
  getStatusVariant,
} from "../../utils/helpers";
import Badge from "./Badge";
import Button from "./Button";

export default function InventoryTable({
  items,
  isDeleting,
  onEdit,
  onDelete,
}) {
  if (!items || items.length === 0) {
    return (
      <div className="rounded-2xl bg-white/80 dark:bg-slate-900/80 shadow-sm border border-slate-100 dark:border-slate-800 px-6 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
        No matching results
      </div>
    );
  }
  return (
    <div className="rounded-2xl bg-white/80 dark:bg-slate-900/80 shadow-sm border border-slate-100 dark:border-slate-800">
      {/* Scroll wrapper */}
      <div className="block w-full overflow-x-auto">
        <table className="min-w-[720px] w-full border-collapse text-sm">
          <thead className="bg-slate-50/70 dark:bg-slate-900/40">
            <tr className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
              <th className="text-left px-6 py-3">Added</th>
              <th className="text-left px-6 py-3">Item</th>
              <th className="text-left px-6 py-3">Qty</th>
              <th className="text-left px-6 py-3">Category / Status</th>
              <th className="text-left px-6 py-3">Notes</th>
              <th className="text-right px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {items.map((item) => (
              <tr
                key={item.id}
                className="bg-transparent hover:bg-slate-50/70 dark:hover:bg-slate-900/40 transition-colors"
              >
                {/* Added */}
                <td className="px-6 py-3 align-middle whitespace-nowrap">
                  <span className="text-slate-600 dark:text-slate-300 text-xs">
                    {formatDate(item.created_at)}
                  </span>
                </td>

                {/* Item name */}
                <td className="px-6 py-3 align-middle">
                  <span className="text-slate-900 dark:text-slate-50 font-medium">
                    {item.name}
                  </span>
                </td>

                {/* Quantity */}
                <td className="px-6 py-3 align-middle whitespace-nowrap">
                  <span className="text-slate-600 dark:text-slate-300 text-xs">
                    {item.quantity}
                  </span>
                </td>

                {/* Category + Status badges */}
                <td className="px-6 py-3 align-middle">
                  <div className="flex flex-col gap-1">
                    <Badge variant="gray">
                      {item.category || "Uncategorized"}
                    </Badge>
                    <Badge variant={getStatusVariant(item.status)}>
                      {formatStatus(item.status)}
                    </Badge>
                  </div>
                </td>

                {/* Notes */}
                <td className="px-6 py-3 align-middle">
                  <span className="text-slate-500 dark:text-slate-400 text-xs block max-w-xs truncate">
                    {item.notes || "—"}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-3 align-middle">
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="icon"
                      size="icon"
                      onClick={() => onEdit(item)}
                    >
                      <HiOutlinePencil />
                    </Button>
                    <Button
                      type="button"
                      variant="icon"
                      size="icon"
                      onClick={() => onDelete(item)}
                      isLoading={isDeleting}
                      className="text-red-700"
                    >
                      <HiOutlineTrash />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
