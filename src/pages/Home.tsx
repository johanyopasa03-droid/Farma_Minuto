import Producto from "../components/Producto"

function Home() {

  const productos = [
    { id: 1, nombre: "Acetaminofén", precio: 5000 },
    { id: 2, nombre: "Ibuprofeno", precio: 8000 },
    { id: 3, nombre: "Jarabe para la tos", precio: 12000 }
  ]

  return (
    <div style={{padding:"20px"}}>

      <h1 style={{textAlign:"center", color:"#0a7cff"}}>
        Farmaminuto
      </h1>

      <div
        style={{
          display:"grid",
          gridTemplateColumns:"repeat(3,1fr)",
          gap:"20px",
          marginTop:"30px"
        }}
      >

        {productos.map(producto => (
          <Producto
            key={producto.id}
            nombre={producto.nombre}
            precio={producto.precio}
          />
        ))}

      </div>

    </div>
  )
}

export default Home