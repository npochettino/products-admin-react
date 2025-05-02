export interface Product {
  id: string
  codigo: number
  nombre: string
  descripcion: string
  cantidad: number
  creacion: string
}

export type SortField = "codigo" | "nombre" | "cantidad" | "creacion"
export type SortDirection = "asc" | "desc"

export interface SortOption {
  field: SortField
  direction: SortDirection
}
