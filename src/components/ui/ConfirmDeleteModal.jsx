import Button from "./Button";

export default function ConfirmDeleteModal({
  open,
  itemName,
  onCancel,
  onConfirm,
  isDeleting,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 shadow-xl p-6">
        <div className="mb-3">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
            Delete item
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Are you sure you want to delete
            {itemName ? (
              <>
                {" "}
                <span className="font-medium text-slate-700 dark:text-slate-100">
                  “{itemName}”
                </span>
                ?
              </>
            ) : (
              " this item?"
            )}{" "}
            This action cannot be undone.
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 pt-3">
          <Button
            type="button"
            variant="outline"
            size="xs"
            onClick={onCancel}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            size="xs"
            className="bg-red-600 hover:bg-red-700 focus-visible:ring-red-600"
            onClick={onConfirm}
            isLoading={isDeleting}
            loadingText="Deleting…"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
