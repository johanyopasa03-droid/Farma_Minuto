interface Props {
  nombre: string
  precio: number
  imagen: string
  agregarAlCarrito: () => void
}

function Producto({ nombre, precio, imagen, agregarAlCarrito }: Props) {

  return (

    <div
      style={{
        minWidth: "200px",
        borderRadius: "12px",
        padding: "15px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        textAlign: "center",
        background: "white",
        cursor: "pointer",
        transition: "0.3s"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)"
      }}
    >

      <img
        src={imagen}
        alt={nombre}
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
          borderRadius: "10px"
        }}
      />

      <h3>{nombre}</h3>

      <p style={{ color: "green", fontWeight: "bold" }}>
        ${precio}
      </p>

      <button
        onClick={agregarAlCarrito}
        style={{
          background: "#0a7cff",
          color: "white",
          border: "none",
          padding: "10px",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        🛒 Comprar
      </button>

    </div>

  )
}

export default Producto