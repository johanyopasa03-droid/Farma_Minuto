// SEGUNDA ENTREGA: este tipo centraliza la estructura de un producto.
// Asi todos los componentes usan los mismos nombres de propiedades.
export interface Producto {
  id: number
  nombre: string
  categoria: string
  precio: number
  imagen: string
  descripcion?: string
  presentacion?: string
  laboratorio?: string
}
