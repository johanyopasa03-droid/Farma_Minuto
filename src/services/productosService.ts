import type { Producto } from "../types/Producto"

interface ProductoApiDummyJson {
  id: number
  title: string
  description: string
  category: string
  price: number
  brand?: string
  thumbnail: string
}

interface RespuestaDummyJson {
  products: ProductoApiDummyJson[]
}

interface MedicamentoOpenFda {
  indications_and_usage?: string[]
  openfda?: {
    manufacturer_name?: string[]
  }
}

interface RespuestaOpenFda {
  results: MedicamentoOpenFda[]
}

interface ProductoFarmaciaBase {
  id: number
  nombre: string
  categoria: string
  precio: number
  imagen: string
  presentacion: string
  busquedaOpenFda: string
}

const API_CUIDADO_PERSONAL =
  "https://dummyjson.com/products?limit=12&select=id,title,description,category,price,brand,thumbnail"

const API_OPEN_FDA = "https://api.fda.gov/drug/label.json"

const PRODUCTOS_FARMACIA_BASE: ProductoFarmaciaBase[] = [
  {
    id: 1001,
    nombre: "Acetaminofen",
    categoria: "Medicamentos",
    precio: 5000,
    imagen:
      "https://walmartni.vtexassets.com/arquivos/ids/557992-800-600?v=638708336934330000&width=800&height=600&aspect=true",
    presentacion: "Tabletas 500 mg",
    busquedaOpenFda: "ACETAMINOPHEN"
  },
  {
    id: 1002,
    nombre: "Ibuprofeno",
    categoria: "Medicamentos",
    precio: 8000,
    imagen: "https://www.alcer-caceres.org/wp-content/uploads/2020/01/Ibuprofeno.jpg",
    presentacion: "Caja de capsulas",
    busquedaOpenFda: "IBUPROFEN"
  },
  {
    id: 1003,
    nombre: "Jarabe",
    categoria: "Medicamentos",
    precio: 12000,
    imagen:
      "https://i5.walmartimages.com/seo/Vicks-Jarabe-Cough-and-Congestion-Cold-Liquid-over-the-Counter-Medicine-Cherry-Flavor-8-fl-oz_2c846c11-eebe-4841-bf09-1bac87bab022.8a49c09f9764ca0bf791b8349f1c37ca.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
    presentacion: "Frasco 120 ml",
    busquedaOpenFda: "DEXTROMETHORPHAN"
  },
  {
    id: 1004,
    nombre: "Vitamina C",
    categoria: "Vitaminas",
    precio: 9000,
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiwu7Kx18XlYzWgG6P8mamF-VfILwYpj5vCA&s",
    presentacion: "Tabletas masticables",
    busquedaOpenFda: "ASCORBIC ACID"
  },
  {
    id: 1005,
    nombre: "Complejo B",
    categoria: "Vitaminas",
    precio: 25000,
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT79PH4y1QTNDBmBtrQwTEBy1BPqHrNwxG8KQ&s",
    presentacion: "Capsulas",
    busquedaOpenFda: "B COMPLEX"
  },
  {
    id: 1006,
    nombre: "Protector Solar",
    categoria: "Cuidado personal",
    precio: 35000,
    imagen: "https://m.media-amazon.com/images/I/71KeEJHegWL.jpg",
    presentacion: "Tubo SPF 50",
    busquedaOpenFda: "SUNSCREEN"
  },
  {
    id: 1007,
    nombre: "Enterogermina",
    categoria: "Bienestar",
    precio: 60000,
    imagen:
      "https://beta1.cruzverde.com.co/on/demandware.static/-/Sites-masterCatalog_Colombia/default/dwcb04058d/images/large/129907_Enterogermina_Plus_Probiotico_Suspension_Oral_x5_frascos.jpg",
    presentacion: "Ampollas bebibles",
    busquedaOpenFda: "PROBIOTIC"
  },
  {
    id: 1008,
    nombre: "Panales",
    categoria: "Bebes",
    precio: 29000,
    imagen:
      "https://beta1.cruzverde.com.co/on/demandware.static/-/Sites-masterCatalog_Colombia/default/dw88d3afb5/images/large/574983_1_BABYSEC_ULTRAPROTECT_G_9_30.jpg",
    presentacion: "Paquete talla G",
    busquedaOpenFda: "DIAPER"
  }
]

const traducirCategoria = (categoria: string) => {
  const categorias: Record<string, string> = {
    beauty: "Cuidado personal",
    fragrances: "Cuidado personal",
    groceries: "Bienestar",
    "skin-care": "Cuidado personal"
  }

  return categorias[categoria] || "Productos generales"
}

const limpiarTexto = (texto?: string) => {
  return texto ? texto.replace(/\s+/g, " ").trim() : ""
}

const convertirProductoCuidadoPersonal = (producto: ProductoApiDummyJson): Producto => {
  /* REQUERIMIENTO 7 - Adaptacion de datos externos:
     DummyJSON entrega productos de belleza y cuidado personal con nombres como
     title, thumbnail y price. Aqui los convertimos al tipo Producto usado por Farmaminuto. */
  return {
    id: producto.id,
    nombre: producto.title,
    categoria: traducirCategoria(producto.category),
    precio: Math.round(producto.price * 4000),
    imagen: producto.thumbnail,
    descripcion: producto.description,
    presentacion: "Producto importado desde DummyJSON",
    laboratorio: producto.brand || "DummyJSON API"
  }
}

const consultarOpenFda = async (busqueda: string) => {
  /* REQUERIMIENTO 7 - API publica externa de farmacia:
     OpenFDA es una API publica real con informacion de medicamentos.
     Esta funcion consulta OpenFDA usando fetch para enriquecer productos de farmacia. */
  const url = `${API_OPEN_FDA}?search=${encodeURIComponent(
    `openfda.generic_name:"${busqueda}"`
  )}&limit=1`
  const respuesta = await fetch(url)

  if (!respuesta.ok) {
    throw new Error("OpenFDA no devolvio informacion para este producto")
  }

  const datos: RespuestaOpenFda = await respuesta.json()
  return datos.results[0]
}

const crearProductoFarmacia = (
  productoBase: ProductoFarmaciaBase,
  informacionApi?: MedicamentoOpenFda
): Producto => {
  /* REQUERIMIENTO 7 - Adaptacion de API externa de farmacia:
     El catalogo conserva productos de drogueria como Acetaminofen, Ibuprofeno y Jarabe.
     La informacion se complementa con la respuesta de OpenFDA cuando esta disponible.
     Asi el asistente por sintoma sigue recomendando productos de farmacia. */
  const descripcionApi = limpiarTexto(informacionApi?.indications_and_usage?.[0])
  const laboratorioApi = informacionApi?.openfda?.manufacturer_name?.[0]

  return {
    id: productoBase.id,
    nombre: productoBase.nombre,
    categoria: productoBase.categoria,
    precio: productoBase.precio,
    imagen: productoBase.imagen,
    descripcion:
      descripcionApi ||
      "Producto de farmacia incluido para orientar las recomendaciones por sintoma.",
    presentacion: productoBase.presentacion,
    laboratorio: laboratorioApi || "OpenFDA / Farmaminuto"
  }
}

const obtenerProductosFarmacia = async (): Promise<Producto[]> => {
  const consultas = await Promise.allSettled(
    PRODUCTOS_FARMACIA_BASE.map((producto) => consultarOpenFda(producto.busquedaOpenFda))
  )

  return PRODUCTOS_FARMACIA_BASE.map((productoBase, index) => {
    const resultado = consultas[index]
    const informacionApi =
      resultado.status === "fulfilled" ? resultado.value : undefined

    return crearProductoFarmacia(productoBase, informacionApi)
  })
}

const obtenerProductosCuidadoPersonal = async (): Promise<Producto[]> => {
  const respuesta = await fetch(API_CUIDADO_PERSONAL)

  if (!respuesta.ok) {
    throw new Error("No fue posible consultar DummyJSON")
  }

  const datos: RespuestaDummyJson = await respuesta.json()
  return datos.products.map(convertirProductoCuidadoPersonal)
}

export async function obtenerProductosDesdeServidor(): Promise<Producto[]> {
  /* REQUERIMIENTO 7 - Peticiones a un servidor web con fetch:
     Esta funcion centraliza peticiones a APIs externas reales.

     Explicacion para sustentacion:
     - DummyJSON aporta productos de belleza y cuidado personal.
     - OpenFDA aporta informacion externa relacionada con medicamentos.
     - Ambas consultas usan fetch y reciben respuestas JSON.
     - El catalogo final mezcla farmacia y cuidado personal sin usar un JSON local. */
  const [farmacia, cuidadoPersonal] = await Promise.all([
    obtenerProductosFarmacia(),
    obtenerProductosCuidadoPersonal()
  ])

  return [...farmacia, ...cuidadoPersonal]
}
