import { supabase } from "./supabase";

const TABLE = "inventory_items";

/**
 * Shape hint (not enforced, but good as a reference)
 *
 * InventoryItem:
 * {
 *   id: string;
 *   user_id: string;
 *   name: string;
 *   category: string;
 *   quantity: number;
 *   location?: string | null;
 *   status: "available" | "in_use" | "repair" | "retired" | string;
 *   notes?: string | null;
 *   created_at: string;
 *   updated_at: string;
 * }
 */

/**
 * Fetch all inventory items for the current user.
 * RLS on the table ensures each user only sees their own items.
 */
export async function fetchInventoryItems() {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  return { data, error };
}

/**
 * Fetch a single inventory item by id.
 */
export async function fetchInventoryItemById(id) {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .single();

  return { data, error };
}

/**
 * Create a new inventory item.
 *
 * IMPORTANT:
 * - You MUST pass a user_id that matches auth.uid() on the backend.
 *   In React, you’ll typically use: const { user } = useAuth(); and then user.id
 */
export async function createInventoryItem(payload) {
  // Payload can be:
  // {
  //   user_id: "uuid",
  //   name: "Office Laptop",
  //   category: "Computer",
  //   quantity: 1,
  //   location: "Main office shelf",
  //   status: "available",
  //   notes: "Dell Latitude, SN 12345"
  // }

  const { data, error } = await supabase
    .from(TABLE)
    .insert(payload)
    .select()
    .single(); // return the created row

  return { data, error };
}

/**
 * Update an existing inventory item by id.
 *
 * RLS ensures that only the owner (user_id = auth.uid()) can update.
 */
export async function updateInvetoryItem(id, updates) {
  const { data, error } = await supabase
    .from(TABLE)
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  return { data, error };
}

/**
 * Delete an inventory item by id.
 *
 * RLS ensures that only the owner can delete.
 */
export async function deleteInvetoryItem(id) {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);

  return { error };
}
