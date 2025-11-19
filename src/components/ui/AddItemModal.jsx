import { HiX } from "react-icons/hi";
import Button from "./Button";

// src/components/ui/AddItemModal.jsx
export default function AddItemModal({
  mode = "create", // "create" | 'edit'
  onClose,
  onSubmit,
  register,
  errors,
  isSubmitting,
}) {
  const isEdit = mode === "edit";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 shadow-xl p-6 md:p-7">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              {isEdit ? "Edit inventory item" : "Add inventory item"}
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              {isEdit
                ? "Update the details for this item."
                : "Keep the details simple and focused."}
            </p>
          </div>
          <Button type="button" variant="icon" size="icon" onClick={onClose}>
            <HiX />
          </Button>
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          {/* Name */}
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
              Item name
            </label>
            <input
              type="text"
              placeholder="e.g. Office Laptop"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#f24a2f]/60"
              {...register("name", { required: "Item name is required" })}
            />
            {errors.name && (
              <p className="text-[11px] text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Category + Quantity */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                Category
              </label>
              <input
                type="text"
                placeholder="e.g. Computer, Cable"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#f24a2f]/60"
                {...register("category", { required: "Category is required" })}
              />
              {errors.category && (
                <p className="text-[11px] text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                Quantity
              </label>
              <input
                type="number"
                min={1}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#f24a2f]/60"
                {...register("quantity", {
                  required: "Quantity is required",
                  valueAsNumber: true,
                  min: { value: 1, message: "Must be at least 1" },
                })}
              />
              {errors.quantity && (
                <p className="text-[11px] text-red-500">
                  {errors.quantity.message}
                </p>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
              Location (optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Office shelf A"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#f24a2f]/60"
              {...register("location")}
            />
          </div>

          {/* Status */}
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
              Status
            </label>
            <select
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#f24a2f]/60"
              {...register("status")}
            >
              <option value="available">Available</option>
              <option value="in_use">In use</option>
              <option value="repair">In repair</option>
              <option value="retired">Retired</option>
            </select>
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
              Notes (optional)
            </label>
            <textarea
              rows={3}
              placeholder="Serial number, condition, extra details…"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#f24a2f]/60 resize-none"
              {...register("notes")}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <Button type="button" variant="outline" size="xs" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="xs"
              isLoading={isSubmitting}
              loadingText="Adding…"
            >
              {isEdit ? "Save changes" : "Add item"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
