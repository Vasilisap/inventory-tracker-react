import { useMemo, useState } from "react";

export function useInventoryFilters(items = []) {
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState("created_desc");
  // "created_desc", "created_asc", "name_asc", "qty_desc"

  const filteredAndSortedItems = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    // 1) Filter
    const filtered = items.filter((item) => {
      if (!normalizedSearch) return true;

      const name = item.name?.toLowerCase() || "";
      const category = item.category?.toLowerCase() || "";
      const location = item.location?.toLowerCase() || "";
      const notes = item.notes?.toLowerCase() || "";

      return (
        name.includes(normalizedSearch) ||
        category.includes(normalizedSearch) ||
        location.includes(normalizedSearch) ||
        notes.includes(normalizedSearch)
      );
    });

    // 2) Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "created_asc":
          return new Date(a.created_at) - new Date(b.created_at);

        case "name_asc":
          return a.name.localeCompare(b.name);

        case "qty_desc":
          return (b.quantity ?? 0) - (a.quantity ?? 0);

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
