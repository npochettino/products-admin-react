import { render, screen, fireEvent } from "@testing-library/react"
import { ProductForm } from "./product-form"
import { useProductStore } from "@/lib/store"
import { jest } from "@jest/globals"

// Mock the store
jest.mock("@/lib/store", () => ({
  useProductStore: jest.fn(),
}))

// Mock the toast
jest.mock("@/components/ui/use-toast", () => ({
  toast: jest.fn(),
}))

describe("ProductForm", () => {
  const mockAddProduct = jest.fn()

  beforeEach(() => {
    ;(useProductStore as jest.Mock).mockImplementation((selector) => {
      return selector({ addProduct: mockAddProduct })
    })
  })

  it("renders the form correctly", () => {
    render(<ProductForm />)

    expect(screen.getByText("Crear Nuevo Producto")).toBeInTheDocument()
    expect(screen.getByLabelText("Código *")).toBeInTheDocument()
    expect(screen.getByLabelText("Nombre *")).toBeInTheDocument()
    expect(screen.getByLabelText("Cantidad *")).toBeInTheDocument()
    expect(screen.getByLabelText("Descripción")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Crear Producto" })).toBeInTheDocument()
  })

  it("submits the form with valid data", () => {
    render(<ProductForm />)

    // Fill the form
    fireEvent.change(screen.getByLabelText("Código *"), { target: { value: "1001" } })
    fireEvent.change(screen.getByLabelText("Nombre *"), { target: { value: "Producto Test" } })
    fireEvent.change(screen.getByLabelText("Cantidad *"), { target: { value: "10" } })
    fireEvent.change(screen.getByLabelText("Descripción"), { target: { value: "Descripción de prueba" } })

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: "Crear Producto" }))

    // Check if addProduct was called with the correct data
    expect(mockAddProduct).toHaveBeenCalledWith({
      codigo: 1001,
      nombre: "Producto Test",
      descripcion: "Descripción de prueba",
      cantidad: 10,
    })
  })
})
