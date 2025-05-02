import { ProductForm } from "@/components/product-form"
import { ProductList } from "@/components/product-list"

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Gestion de Productos</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ProductForm />
        </div>
        <div className="lg:col-span-2">
          <ProductList />
        </div>
      </div>
    </main>
  )
}
