import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product, SortField, SortDirection, SortOption } from "@/types/product"

interface ProductState {
  products: Product[]
  searchQuery: string
  sortOption: SortOption
  addProduct: (product: Omit<Product, "id" | "creacion">) => void
  deleteProduct: (id: string) => void
  setSearchQuery: (query: string) => void
  setSortOption: (field: SortField, direction: SortDirection) => void
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: [],
      searchQuery: "",
      sortOption: { field: "creacion", direction: "desc" },

      addProduct: (product) =>
        set((state) => {
          const newProduct: Product = {
            ...product,
            id: crypto.randomUUID(),
            creacion: new Date().toISOString(),
          }

          return { products: [...state.products, newProduct] }
        }),

      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        })),

      setSearchQuery: (query) => set({ searchQuery: query }),

      setSortOption: (field, direction) =>
        set({
          sortOption: { field, direction },
        }),
    }),
    {
      name: "product-storage",
    },
  ),
)
