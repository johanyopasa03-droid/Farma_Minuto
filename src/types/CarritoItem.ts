import type { Producto } from "./Producto"

// SEGUNDA ENTREGA - Tipo para carrito:
// Extiende el producto con cantidad para mostrar un carrito mas real.
export interface CarritoItem extends Producto {
  cantidad: number
}
