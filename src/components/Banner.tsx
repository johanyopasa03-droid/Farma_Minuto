function Banner() {
  return (
    <section className="banner">
      {/* SEGUNDA ENTREGA - Imagen/visual:
          El banner presenta la identidad del proyecto en la pantalla inicial. */}
      <div className="banner-contenido">
        <p className="banner-etiqueta">Drogueria y bienestar</p>
        <h1>Farmaminuto</h1>
        <span>Productos esenciales, vitaminas y cuidado personal en un solo lugar.</span>
        <div className="banner-datos">
          <strong>12+</strong>
          <small>productos</small>
          <strong>24h</strong>
          <small>atencion</small>
        </div>
      </div>
    </section>
  )
}

export default Banner
