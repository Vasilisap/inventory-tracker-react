import { useState } from "react";
import {
  useCreateInventoryItem,
  useDeleteInventoryItem,
  useInventoryItems,
  useUpdateInventoryItem,
} from "../features/inventory/hooks/useInventory";

import AddItemModal from "../components/ui/AddItemModal";
import { useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import ConfirmDeleteModal from "../components/ui/ConfirmDeleteModal";

import { useInventoryFilters } from "../features/inventory/hooks/useInventoryFilters";
import InventoryTable from "../components/ui/InventoryTable";

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // "create" || "edit"
  const [editingItem, setEditingItem] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const { items, isLoading, isError } = useInventoryItems();
  const { mutate: createItem, isPending: isCreating } =
    useCreateInventoryItem();
  const { mutate: updateItem, isPending: isUpdating } =
    useUpdateInventoryItem();
  const { mutate: deleteItem, isPending: isDeleting } =
    useDeleteInventoryItem();

  const {
    searchValue,
    setSearchValue,
    sortBy,
    setSortBy,
    items: sortedItems,
  } = useInventoryFilters(items || []);

  // Simple stats
  const totalItems = items?.length ?? 0;
  const totalQuantity =
    items?.reduce((sum, item) => sum + (item.quantity ?? 0), 0) ?? 0;
  const inUseCount =
    items?.filter((item) => item.status === "in_use").length ?? 0;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      category: "",
      quantity: 1,
      location: "",
      status: "available",
      notes: "",
    },
  });

  function openCreateModal() {
    setModalMode("create");
    setEditingItem(null);
    reset({
      name: "",
      category: "",
      quantity: 1,
      location: "",
      status: "available",
      notes: "",
    });
    setIsModalOpen(true);
  }

  function openEditModal(item) {
    setModalMode("edit");
    setEditingItem(item);

    reset({
      name: item.name ?? "",
      category: item.category ?? "",
      quantity: item.quantity ?? 1,
      location: item.location ?? "",
      status: item.status ?? "available",
      notes: item.notes ?? "",
    });

    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingItem(null);
  }

  function onSubmit(values) {
    const payload = {
      ...values,
      quantity: Number(values.quantity) || 1,
    };

    if (modalMode === "create") {
      createItem(payload, {
        onSuccess: () => {
          closeModal();
        },
      });
    } else if (modalMode === "edit" && editingItem) {
      updateItem(
        { id: editingItem.id, updates: payload },
        {
          onSuccess: () => {
            closeModal();
          },
        }
      );
    }
  }

  function openDeleteModal(item) {
    setItemToDelete(item);
    setDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setDeleteModalOpen(false);
    setItemToDelete(null);
  }

  function confirmDelete() {
    if (!itemToDelete) return;

    deleteItem(itemToDelete.id, {
      onSuccess: () => {
        closeDeleteModal();
      },
    });
  }

  const isSubmitting = modalMode === "create" ? isCreating : isUpdating;

  return (
    <div className="h-full flex flex-col gap-8">
      <header className="flex flex-col gap-4 mb-6">
        {/* Title row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#EE6338] mb-1">
              Overview
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50">
              Inventory dashboard
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Track computers, cables, and other equipment in one place.
            </p>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            {/* You could add filter buttons here later */}
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={openCreateModal}
              leftIcon={<span className="text-base leading-none">＋</span>}
            >
              Add item
            </Button>
          </div>
        </div>

        {/* Stats row */}
        {!isLoading && !isError && items && items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            {/* Total items */}
            <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-4 py-3 flex flex-col gap-1">
              <span className="text-[11px] uppercase tracking-wide text-slate-400">
                Total items
              </span>
              <span className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                {totalItems}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Unique inventory records
              </span>
            </div>

            {/* Total quantity */}
            <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-4 py-3 flex flex-col gap-1">
              <span className="text-[11px] uppercase tracking-wide text-slate-400">
                Total quantity
              </span>
              <span className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                {totalQuantity}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Sum of all item units
              </span>
            </div>

            {/* In use */}
            <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-[#EE6338]/5 dark:bg-[#EE6338]/10 px-4 py-3 flex flex-col gap-1">
              <span className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-300">
                In use
              </span>
              <span className="text-xl font-semibold text-[#EE6338]">
                {inUseCount}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-300">
                Items currently in use
              </span>
            </div>
          </div>
        )}
      </header>

      <div>
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Items Overview
          </h2>

          {isLoading ? (
            <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-6 py-6 text-sm text-slate-500 dark:text-slate-400">
              Loading inventory…
            </div>
          ) : isError ? (
            <div className="rounded-2xl border border-red-100 bg-red-50 px-6 py-4 text-sm text-red-700">
              Could not load inventory. Please try again.
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 px-6 py-10 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                No items yet.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Start by adding your first computer, cable, or other equipment.
              </p>
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={openCreateModal}
                leftIcon={<span className="text-base leading-none">+</span>}
              >
                Add item
              </Button>
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-6 mb-3">
                {/* Search */}
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full sm:max-w-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#EE6338]"
                />

                {/* Sort */}
                <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                  <span>Sort by</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1 text-[11px] outline-none focus:ring-2 focus:ring-[#f24a2f]/60"
                  >
                    <option value="created_desc">Newest first</option>
                    <option value="created_asc">Oldest first</option>
                    <option value="name_asc">Name A–Z</option>
                    <option value="qty_desc">Quantity (high → low)</option>
                  </select>
                </div>
              </div>

              <InventoryTable
                items={sortedItems}
                isDeleting={isDeleting}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
              />
            </>
          )}
        </section>
      </div>

      {isModalOpen && (
        <AddItemModal
          mode={modalMode}
          onClose={closeModal}
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
        />
      )}

      <ConfirmDeleteModal
        open={deleteModalOpen}
        itemName={itemToDelete?.name}
        onCancel={closeDeleteModal}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}
