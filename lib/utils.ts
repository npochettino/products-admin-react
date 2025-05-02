import type { Product, SortOption } from "@/types/product"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sortAndFilterProducts(products: Product[], sortOption: SortOption, searchQuery: string): Product[] {
  // First filter by search query
  const filteredProducts = searchQuery
    ? products.filter((product) => product.nombre.toLowerCase().includes(searchQuery.toLowerCase()))
    : products

  // Then sort
  return [...filteredProducts].sort((a, b) => {
    const { field, direction } = sortOption
    const modifier = direction === "asc" ? 1 : -1

    if (field === "codigo" || field === "cantidad") {
      return (a[field] - b[field]) * modifier
    }

    if (field === "creacion") {
      return (new Date(a.creacion).getTime() - new Date(b.creacion).getTime()) * modifier
    }

    // For 'nombre'
    return a.nombre.localeCompare(b.nombre) * modifier
  })
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}
