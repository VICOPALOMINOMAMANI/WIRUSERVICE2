document.addEventListener('DOMContentLoaded', function() {
   
    const productosCotizar = JSON.parse(localStorage.getItem('productosCotizar')) || [];
    const productosSeleccionados = document.getElementById('productos-seleccionados');
    function mostrarProductos() {
        productosSeleccionados.innerHTML = '<h3>Productos a Cotizar</h3>';
        
        if (productosCotizar.length === 0) {
            productosSeleccionados.innerHTML += '<p>No hay productos agregados aún.</p>';
            return;
        }
        
        productosCotizar.forEach((producto, index) => {
            const divProducto = document.createElement('div');
            divProducto.className = 'producto-cotizacion';
            
            divProducto.innerHTML = `
                <div class="producto-info">
                    <h4>${producto.nombre}</h4>
                    <p>${producto.descripcion}</p>
                </div>
                <div class="producto-cantidad">
                    <input type="number" value="${producto.cantidad || 1}" min="1" data-index="${index}">
                </div>
                <button class="boton-eliminar" data-index="${index}">Eliminar</button>
            `;
            
            productosSeleccionados.appendChild(divProducto);
        });

        document.querySelectorAll('.boton-eliminar').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                productosCotizar.splice(index, 1);
                localStorage.setItem('productosCotizar', JSON.stringify(productosCotizar));
                mostrarProductos();
            });
        });
        
        document.querySelectorAll('.producto-cantidad input').forEach(input => {
            input.addEventListener('change', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const nuevaCantidad = parseInt(this.value);
                if (nuevaCantidad > 0) {
                    productosCotizar[index].cantidad = nuevaCantidad;
                    localStorage.setItem('productosCotizar', JSON.stringify(productosCotizar));
                }
            });
        });
    }
    
    mostrarProductos();
    
    document.getElementById('agregar-producto').addEventListener('click', function() {
        const productoSelect = document.getElementById('producto');
        const productoNombre = productoSelect.options[productoSelect.selectedIndex].text;
        const cantidad = parseInt(document.getElementById('cantidad').value) || 1;
        const especificaciones = document.getElementById('especificaciones').value;
        
        if (productoSelect.value === '') {
            alert('Por favor seleccione un producto');
            return;
        }
        
        let descripcion = '';
        switch(productoSelect.value) {
            case 'techo-industrial':
                descripcion = 'Panel de acero galvanizado con núcleo aislante';
                break;
            case 'pasarela':
                descripcion = 'Estructura de acero con piso antideslizante';
                break;
            case 'estructura-almacen':
                descripcion = 'Sistema de columnas y vigas para almacenes';
                break;
            case 'escalera':
                descripcion = 'Escalera fija para acceso a diferentes niveles';
                break;
            case 'cubierta':
                descripcion = 'Sistema de cubierta con diseño arquitectónico';
                break;
            case 'componentes':
                descripcion = 'Componentes para maquinaria pesada';
                break;
            default:
                descripcion = 'Producto personalizado';
        }
        
        if (especificaciones) {
            descripcion += ` (${especificaciones})`;
        }
        
        productosCotizar.push({
            nombre: productoNombre,
            descripcion: descripcion,
            cantidad: cantidad,
            tipo: productoSelect.value
        });
        
        localStorage.setItem('productosCotizar', JSON.stringify(productosCotizar));
        mostrarProductos();
        
        productoSelect.value = '';
        document.getElementById('cantidad').value = '1';
        document.getElementById('especificaciones').value = '';
    });
    
    document.getElementById('enviar-cotizacion').addEventListener('click', function() {
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        
        if (!nombre || !email || !telefono) {
            alert('Por favor complete los campos obligatorios: Nombre, Email y Teléfono');
            return;
        }
        
        if (productosCotizar.length === 0) {
            alert('Por favor agregue al menos un producto a cotizar');
            return;
        }
        
        const datosCotizacion = {
            cliente: {
                nombre: nombre,
                empresa: document.getElementById('empresa').value,
                email: email,
                telefono: telefono,
                direccion: document.getElementById('direccion').value,
                proyecto: document.getElementById('proyecto').value
            },
            productos: productosCotizar,
            observaciones: document.getElementById('observaciones').value
        };
        
        console.log('Datos de cotización a enviar:', datosCotizacion);
    
        alert('¡Cotización enviada con éxito! Nos pondremos en contacto con usted en breve.');
        
        document.querySelector('form').reset();
        localStorage.removeItem('productosCotizar');
        productosCotizar.length = 0;
        mostrarProductos();
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const productoParam = urlParams.get('producto');
    
    if (productoParam) {
        const opcionesProducto = {
            'techo-industrial': 'Techo Industrial Tipo Sandwich',
            'pasarela-industrial': 'Pasarela Industrial Antideslizante',
            'estructura-almacen': 'Estructura para Almacén Industrial',
            'escalera-metalica': 'Escalera Metálica de Servicio',
            'cubierta-metalica': 'Cubierta Metálica Arquitectónica',
            'componente-maquinaria': 'Componentes Para Maquinaria Pesada'
        };
        
        if (opcionesProducto[productoParam]) {
            document.getElementById('producto').value = productoParam.replace('-', ' ');
            window.scrollTo(0, document.getElementById('cotizacion').offsetTop);
        }
    }
});