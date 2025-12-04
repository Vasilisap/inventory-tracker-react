import { useMemo, useState } from "react";

export function useInventoryFilters(items = []) {
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState("created_desc");
  // "created_desc", "created_asc", "name_asc", "serial_asc"

  const filteredAndSortedItems = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    // 1) Filter
    const filtered = items.filter((item) => {
      if (!normalizedSearch) return true;

      const name = item.name?.toLowerCase() || "";
      const category = item.category?.toLowerCase() || "";
      const location = item.location?.toLowerCase() || "";
      const notes = item.notes?.toLowerCase() || "";
      const supplier = item.supplier?.toLowerCase() || "";
      const serial = item.serial_number?.toLowerCase() || "";

      return (
        name.includes(normalizedSearch) ||
        category.includes(normalizedSearch) ||
        location.includes(normalizedSearch) ||
        notes.includes(normalizedSearch) ||
        supplier.includes(normalizedSearch) ||
        serial.includes(normalizedSearch)
      );
    });

    // 2) Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "created_asc":
          return new Date(a.created_at) - new Date(b.created_at);

        case "name_asc":
          return a.name.localeCompare(b.name);

        case "serial_asc":
          return (a.serial_number || "").localeCompare(b.serial_number || "");

        case "created_desc":
        default:
          return new Date(b.created_at) - new Date(a.created_at);
      }
    });

    return sorted;
  }, [items, searchValue, sortBy]);

  return {
    searchValue,
    setSearchValue,
    sortBy,
    setSortBy,
    items: filteredAndSortedItems,
  };
}
