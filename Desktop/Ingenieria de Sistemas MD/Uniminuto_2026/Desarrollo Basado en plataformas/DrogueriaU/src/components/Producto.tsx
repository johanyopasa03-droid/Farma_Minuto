import { useState } from "react"

interface Props {
  nombre: string
  precio: number
}

function Producto({ nombre, precio }: Props) {

  const [mensaje, setMensaje] = useState("")

  const comprar = () => {
    setMensaje("Producto agregado al carrito")
  }

  return (

    <div style={{
      border:"1px solid gray",
      padding:"15px",
      margin:"10px",
      borderRadius:"10px"
    }}>

      <h3>{nombre}</h3>

      <p>${precio}</p>

      <button onClick={comprar}>
        Comprar
      </button>

      <p>{mensaje}</p>

    </div>

  )
}

export default Producto