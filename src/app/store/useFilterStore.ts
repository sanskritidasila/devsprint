import { create } from "zustand";

interface FilterState {
  searchQuery: string;
  selectedPriority: string;
  setSearchQuery: (query: string) => void;
  setSelectedPriority: (priority: string) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  searchQuery: "",
  selectedPriority: "ALL",

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedPriority: (priority) => set({ selectedPriority: priority }),
  resetFilters: () => set({ searchQuery: "", selectedPriority: "ALL" }),
}));