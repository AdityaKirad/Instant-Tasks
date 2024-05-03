import { create } from "zustand";

type Layout = "grid" | "list";

type SortFunctionType = "earlier" | "later" | "incomplete" | "important" | "";

type TodosSortAndLayout = {
  layout: Layout;
  sortFunction: SortFunctionType;
  actions: {
    setLayout: (layout: Layout) => void;
    setSortFunction: (sortFunction: SortFunctionType) => void;
  };
};

const useStore = create<TodosSortAndLayout>()((set) => ({
  layout: "grid",

  sortFunction: "",

  actions: {
    setLayout(layout) {
      set({ layout });
    },

    setSortFunction(sortFunction) {
      set({ sortFunction });
    },
  },
}));

const useLayout = () => useStore((state) => state.layout);
const useSort = () => useStore((state) => state.sortFunction);
const useSortAndLayoutActions = () => useStore((state) => state.actions);

export { useLayout, useSort, useSortAndLayoutActions };
