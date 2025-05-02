# Gestión de Productos

Esta aplicación permite gestionar productos, visualizarlos en una lista, filtrarlos y ordenarlos según diferentes criterios.

## Características

- Crear productos con código, nombre, descripción y cantidad
- Visualizar lista de productos
- Eliminar productos
- Ordenar productos por código, nombre, cantidad y fecha de creación
- Filtrar productos por nombre
- Persistencia de datos usando localStorage
- Diseño responsivo para móvil y desktop
- Notificaciones con toast

## Tecnologías utilizadas

- **Next.js 14**: Framework de React con App Router
- **TypeScript**: Para tipado estático
- **Zustand**: Para manejo de estado global
- **TailwindCSS**: Para estilos
- **Shadcn/UI**: Componentes de UI accesibles
- **Jest & Testing Library**: Para pruebas unitarias

## Decisiones técnicas

### Zustand vs Context API

Elegí Zustand para el manejo de estado por su simplicidad y facilidad de uso. A diferencia del Context API, Zustand:

- No requiere providers anidados
- Tiene persistencia incorporada con middleware
- Permite actualizaciones parciales del estado sin re-renderizados innecesarios

### Estructura de carpetas

\`\`\`
/app - Páginas de Next.js con App Router
/components - Componentes reutilizables
/lib - Utilidades y store
/types - Tipos de TypeScript
\`\`\`

### Persistencia de datos

Utilicé el middleware `persist` de Zustand para guardar automáticamente el estado en localStorage, lo que permite que los datos persistan después de recargar la página.

## Instalación

1. Clona el repositorio:
\`\`\`bash
git clone https://github.com/tu-usuario/gestion-productos.git
cd gestion-productos
\`\`\`

2. Instala las dependencias:
\`\`\`bash
npm install
# o
yarn install
# o
pnpm install
\`\`\`

3. Inicia el servidor de desarrollo:
\`\`\`bash
npm run dev
# o
yarn dev
# o
pnpm dev
\`\`\`

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Pruebas

Para ejecutar las pruebas:

\`\`\`bash
npm run test
# o
yarn test
# o
pnpm test
\`\`\`

## Despliegue

La aplicación está desplegada en Vercel y puedes acceder a ella en: [https://gestion-productos.vercel.app](https://gestion-productos.vercel.app)

## Mejoras futuras

- Implementar edición de productos
- Añadir categorías a los productos
- Implementar paginación para grandes volúmenes de datos
- Añadir modo oscuro
- Implementar más pruebas de integración
