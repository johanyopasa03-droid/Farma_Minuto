import Producto from "../components/Producto"
import Banner from "../components/Banner"
import Footer from "../components/footer"
import "../styles/banner.css"

interface Props {
  agregarAlCarrito: () => void
  busqueda: string
}

function Home({ agregarAlCarrito, busqueda }: Props) {

  const productos = [
    {
      id: 1,
      nombre: "Acetaminofén",
      precio: 5000,
      imagen: "https://walmartni.vtexassets.com/arquivos/ids/557992-800-600?v=638708336934330000&width=800&height=600&aspect=true"
    },
    {
      id: 2,
      nombre: "Ibuprofeno",
      precio: 8000,
      imagen: "https://www.alcer-caceres.org/wp-content/uploads/2020/01/Ibuprofeno.jpg"
    },
    {
      id: 3,
      nombre: "Jarabe",
      precio: 12000,
      imagen: "https://i5.walmartimages.com/seo/Vicks-Jarabe-Cough-and-Congestion-Cold-Liquid-over-the-Counter-Medicine-Cherry-Flavor-8-fl-oz_2c846c11-eebe-4841-bf09-1bac87bab022.8a49c09f9764ca0bf791b8349f1c37ca.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF"

    },
    {
      id: 4,
      nombre: "Vitamina C",
      precio: 9000,
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiwu7Kx18XlYzWgG6P8mamF-VfILwYpj5vCA&s"

    },
    {
      id: 5,
      nombre: "Complejo B",
      precio: 25000,
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT79PH4y1QTNDBmBtrQwTEBy1BPqHrNwxG8KQ&s"
    },
    {
      id: 6,
      nombre: "Protector Solar",
      precio: 35000,
      imagen: "https://m.media-amazon.com/images/I/71KeEJHegWL.jpg"
    },
    {
      id: 7,
      nombre: "Minoxidil",
      precio: 120000,
      imagen: "https://beta1.cruzverde.com.co/on/demandware.static/-/Sites-masterCatalog_Colombia/default/dw32b5f414/images/large/574633_1_TRIPACK_MINOXIDIL_5_SOL_TOPX100mL.jpg"

    },
    {
      id: 8,
      nombre: "Enterogermina",
      precio: 60000,
      imagen: "https://beta1.cruzverde.com.co/on/demandware.static/-/Sites-masterCatalog_Colombia/default/dwcb04058d/images/large/129907_Enterogermina_Plus_Probiotico_Suspension_Oral_x5_frascos.jpg"

    },
    {
      id: 9,
      nombre: "Amoxixilina",
      precio: 5000,
      imagen: "https://beta1.cruzverde.com.co/on/demandware.static/-/Sites-masterCatalog_Colombia/default/dwc2efdb1f/images/large/30143-1-AMOXICILINA-500MG-CAP-CAJ-X-50-GENFAR.jpg"
    },
    {
      id: 10,
      nombre: "Dolex Forte",
      precio: 18000,
      imagen: "https://beta1.cruzverde.com.co/on/demandware.static/-/Sites-masterCatalog_Colombia/default/dw635dfd6d/images/large/560131_1DOLEX_FORTE_NF_(500+65)MG_TAB_REC_CAJ_X_10.jpg"
    },
    {
      id: 11,
      nombre: "Preservativos",
      precio: 12000,
      imagen: "https://beta1.cruzverde.com.co/on/demandware.static/-/Sites-masterCatalog_Colombia/default/dwbe3a64c8/images/large/269336_1_PRESERVATIVO_SENSITIVO_DELGADO_PAQ_X_3_DUREX.jpg"

    },
    {
      id: 12,
      nombre: "Pañales",
      precio: 29000,
      imagen: "https://beta1.cruzverde.com.co/on/demandware.static/-/Sites-masterCatalog_Colombia/default/dw88d3afb5/images/large/574983_1_BABYSEC_ULTRAPROTECT_G_9_30.jpg"

    }
  ]
const productosFiltrados = productos.filter(producto =>
  producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
)

  return (
 
    <div>
<Banner />
      <h1 style={{ textAlign: "center", color: "#0a7cff" }}>
        Productos
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 3fr))",
        gap: "20px",
        padding: "10px"
      }}>

        {productosFiltrados.map((p) => (
          <Producto
            key={p.id}
            nombre={p.nombre}
            precio={p.precio}
            imagen={p.imagen}
            agregarAlCarrito={agregarAlCarrito}
          />
        ))}
      </div>
<Footer/>
    </div>
  )
}

export default Home