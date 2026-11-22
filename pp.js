// js/app.js

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();
});

// Función para cargar productos vía fetch
async function cargarProductos() {
  try {
    const respuesta = await fetch('../data/productos.json');
    
    if (!respuesta.ok) {
      throw new Error('Error al cargar los productos');
    }
    
    const productos = await respuesta.json();
    renderizarProductos(productos);
    
  } catch (error) {
    console.error('Error:', error);
    const contenedor = document.getElementById('contenedor-productos');
    contenedor.innerHTML = '<p>Error al cargar los productos. Intenta más tarde.</p>';
  }
}

// Función para renderizar las tarjetas en el DOM
function renderizarProductos(productos) {
  const contenedor = document.getElementById('contenedor-productos');
  
  // Limpiar el contenedor (por si acaso)
  contenedor.innerHTML = '';
  
  productos.forEach(producto => {
    // Crear el article
    const card = document.createElement('article');
    card.classList.add('card');
    
    // Formatear precio
    const precioFormateado = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(producto.precio);
    
    // Insertar el HTML de la tarjeta
    card.innerHTML = `
      <img src="${producto.imagen}" alt="Auricular ${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <span class="precio">${precioFormateado}</span>
    `;
    
    // Agregar la tarjeta al contenedor
    contenedor.appendChild(card);
  });
}