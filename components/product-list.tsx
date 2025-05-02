"use client"
import { useProductStore } from "@/lib/store"
import { sortAndFilterProducts, formatDate } from "@/lib/utils"
import type { SortField, SortDirection } from "@/types/product"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Trash2 } from "lucide-react"
import { toast } from "../components/ui/use-toast"
import { Badge } from "../components/ui/badge"

export function ProductList() {
  const { products, searchQuery, sortOption, deleteProduct, setSearchQuery, setSortOption } = useProductStore()

  const sortedAndFilteredProducts = sortAndFilterProducts(products, sortOption, searchQuery)

  const handleSort = (field: SortField) => {
    const direction: SortDirection = sortOption.field === field && sortOption.direction === "asc" ? "desc" : "asc"

    setSortOption(field, direction)
  }

  const handleDelete = (id: string) => {
    deleteProduct(id)
    toast({
      title: "Producto eliminado",
      description: "El producto ha sido eliminado exitosamente",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Productos</CardTitle>
        <CardDescription>{sortedAndFilteredProducts.length} productos encontrados</CardDescription>
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <div className="flex-1">
            <Input
              placeholder="Buscar por nombre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
              aria-label="Buscar productos"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm whitespace-nowrap">Ordenar por:</span>
            <Select
              value={`${sortOption.field}-${sortOption.direction}`}
              onValueChange={(value) => {
                const [field, direction] = value.split("-") as [SortField, SortDirection]
                setSortOption(field, direction)
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="codigo-asc">Código (Asc)</SelectItem>
                <SelectItem value="codigo-desc">Código (Desc)</SelectItem>
                <SelectItem value="nombre-asc">Nombre (A-Z)</SelectItem>
                <SelectItem value="nombre-desc">Nombre (Z-A)</SelectItem>
                <SelectItem value="cantidad-asc">Cantidad (Asc)</SelectItem>
                <SelectItem value="cantidad-desc">Cantidad (Desc)</SelectItem>
                <SelectItem value="creacion-asc">Fecha (Antigua)</SelectItem>
                <SelectItem value="creacion-desc">Fecha (Reciente)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {sortedAndFilteredProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] cursor-pointer" onClick={() => handleSort("codigo")}>
                    Código {sortOption.field === "codigo" && <span>{sortOption.direction === "asc" ? "↑" : "↓"}</span>}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("nombre")}>
                    Nombre {sortOption.field === "nombre" && <span>{sortOption.direction === "asc" ? "↑" : "↓"}</span>}
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Descripción</TableHead>
                  <TableHead className="w-[100px] cursor-pointer" onClick={() => handleSort("cantidad")}>
                    Cantidad{" "}
                    {sortOption.field === "cantidad" && <span>{sortOption.direction === "asc" ? "↑" : "↓"}</span>}
                  </TableHead>
                  <TableHead className="w-[180px] cursor-pointer" onClick={() => handleSort("creacion")}>
                    Creación{" "}
                    {sortOption.field === "creacion" && <span>{sortOption.direction === "asc" ? "↑" : "↓"}</span>}
                  </TableHead>
                  <TableHead className="w-[80px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedAndFilteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.codigo}</TableCell>
                    <TableCell>{product.nombre}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {product.descripcion.length > 50
                        ? `${product.descripcion.substring(0, 50)}...`
                        : product.descripcion}
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.cantidad > 10 ? "default" : "destructive"}>{product.cantidad}</Badge>
                    </TableCell>
                    <TableCell className="text-xs">{formatDate(product.creacion)}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(product.id)}
                        aria-label={`Eliminar producto ${product.nombre}`}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            {searchQuery ? "No se encontraron productos con ese nombre" : "No hay productos. Crea uno nuevo."}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
