export interface Usuario {
  email: string
  password: string
  rol: "admin" | "cliente"
}