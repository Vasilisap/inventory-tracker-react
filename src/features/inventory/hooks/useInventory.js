import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createInventoryItem,
  deleteInvetoryItem,
  fetchInventoryItems,
  updateInvetoryItem,
} from "../../../services/inventory";
import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";

const INVENTORY_QUERY_KEY = ["inventory-items"];

/**
 * Fetch all inventory items for the current user.
 * RLS on Supabase makes sure the user only sees their own rows.
 */
export function useInventoryItems() {
  const { user } = useAuth();

  const { data, error, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["inventory-items", user?.id], // 🔑 per-user cache key
    queryFn: async () => {
      const { data, error } = await fetchInventoryItems();

      if (error) {
        throw new Error(error.message || "Failed to laod inventory");
      }

      return data ?? [];
    },
    enabled: !!user, // don't run until we know who the user is
  });

  return {
    items: data ?? [],
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  };
}

/**
 * Create a new inventory item.
 * Automatically attaches user_id from AuthContext.
 */

export function useCreateInventoryItem() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (values) => {
      if (!user) {
        throw new Error("You must be logged in to create items");
      }

      // values expected: { name, category, quantity, location, status, notes }
      const payload = {
        ...values,
        user_id: user.id,
      };

      const { data, error } = await createInventoryItem(payload);

      if (error) {
        throw new Error(error.message || "Failed to create item");
      }

      return data;
    },
    onSuccess: () => {
      toast.success("Item created");
      queryClient.invalidateQueries({ queryKey: INVENTORY_QUERY_KEY });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create item");
    },
  });
}

/**
 * Update an existing inventory item by id.
 * Usage: mutate({ id, updates: { name, quantity, ... } })
 */
export function useUpdateInventoryItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }) => {
      const { data, error } = await updateInvetoryItem(id, updates);

      if (error) {
        throw new Error(error.message || "Failed to update item");
      }

      return data;
    },
    onSuccess: () => {
      toast.success("Item updated");
      queryClient.invalidateQueries({ queryKey: INVENTORY_QUERY_KEY });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update item");
    },
  });
}

/**
 * Delete an inventory item by id.
 * Usage: mutate(id)
 */
export function useDeleteInventoryItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const { error } = await deleteInvetoryItem(id);

      if (error) {
        throw new Error(error.message || "Failed to delete item");
      }
    },
    onSuccess: () => {
      toast.success("Item deleted");
      queryClient.invalidateQueries({ queryKey: INVENTORY_QUERY_KEY });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete item");
    },
  });
}
