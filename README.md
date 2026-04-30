# Farmaminuto

Proyecto academico de drogueria desarrollado con React, TypeScript y Vite.

## Requerimientos de la segunda entrega

- Formularios y controles: `Login`, `Registro`, `Admin` y filtros de `Home`.
- Componentes y comunicacion: `App` envia props a `Navbar`, `Home`, `Carrito` y otros componentes.
- Eventos: botones de comprar, formularios, buscador, filtros y Drag and Drop.
- `useState`: se usa para formularios, carrito, busqueda, favoritos y productos.
- `useEffect`: carga datos iniciales, consulta productos y sincroniza LocalStorage.
- `fetch`: `productosService.ts` consulta APIs publicas externas: DummyJSON y OpenFDA.
- `key`: listas de productos, categorias, carrito y favoritos.
- Imagenes: productos y banner visual.
- Filtros: busqueda por texto, categoria y casilla de disponibles.
- Drag and Drop: arrastrar producto hacia la zona de favoritos.
- LocalStorage: carrito con cantidades, favoritos, usuario actual, registro y productos de admin.
- Valor agregado: favoritos por arrastrar y soltar, guardados en LocalStorage.
- Carrito mejorado: permite sumar, restar, quitar productos y calcular total.
- Admin mejorado: permite agregar y eliminar productos creados localmente.

## Archivos importantes para sustentar

- `src/App.tsx`: estados globales, comunicacion entre componentes y LocalStorage del carrito con cantidades.
- `src/services/productosService.ts`: peticiones `fetch` a DummyJSON para cuidado personal y OpenFDA para farmacia/medicamentos.
- `src/pages/Home.tsx`: uso de productos recibidos por API, filtros, favoritos, `useEffect` y renderizado con `key`.
- `src/components/ProductoCard.tsx`: evento de comprar y evento de arrastrar.
- `src/components/ZonaFavoritos.tsx`: funcion Drag and Drop y eliminacion de favoritos.
- `src/components/Carrito.tsx`: cantidades, total, quitar productos y vaciar carrito.
- `src/pages/Login.tsx`: formulario controlado y redireccion por rol.
- `src/pages/Registro.tsx`: cajas de texto, textarea, checkbox y LocalStorage.
- `src/pages/Admin.tsx`: formulario para agregar/eliminar productos y guardarlos localmente.

## Ejecutar en el computador

```bash
npm install
npm run dev
```

## Publicar en Netlify

Opcion recomendada:

1. Crear una cuenta o iniciar sesion en Netlify.
2. Subir el proyecto a GitHub.
3. En Netlify elegir "Add new site" y conectar el repositorio.
4. Configurar:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Publicar.

El archivo `netlify.toml` ya contiene esa configuracion y tambien deja listas las rutas de React Router.
