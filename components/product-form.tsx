"use client"

import type React from "react"

import { useState } from "react"
import { useProductStore } from "@/lib/store"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { toast } from "@/components/ui/use-toast"

export function ProductForm() {
  const addProduct = useProductStore((state) => state.addProduct)
  const [formData, setFormData] = useState({
    codigo: "",
    nombre: "",
    descripcion: "",
    cantidad: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.codigo || !formData.nombre || !formData.cantidad) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      })
      return
    }

    // Add product
    addProduct({
      codigo: Number.parseInt(formData.codigo),
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      cantidad: Number.parseInt(formData.cantidad),
    })

    // Reset form
    setFormData({
      codigo: "",
      nombre: "",
      descripcion: "",
      cantidad: "",
    })

    toast({
      title: "Producto creado",
      description: "El producto ha sido creado exitosamente",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crear Nuevo Producto</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="codigo">Código *</Label>
              <Input
                id="codigo"
                name="codigo"
                type="number"
                placeholder="Ej: 1001"
                value={formData.codigo}
                onChange={handleChange}
                required
                aria-required="true"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cantidad">Cantidad *</Label>
              <Input
                id="cantidad"
                name="cantidad"
                type="number"
                placeholder="Ej: 10"
                value={formData.cantidad}
                onChange={handleChange}
                required
                aria-required="true"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre *</Label>
            <Input
              id="nombre"
              name="nombre"
              placeholder="Nombre del producto"
              value={formData.nombre}
              onChange={handleChange}
              required
              aria-required="true"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              name="descripcion"
              placeholder="Descripción del producto"
              value={formData.descripcion}
              onChange={handleChange}
              rows={3}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Crear Producto
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
