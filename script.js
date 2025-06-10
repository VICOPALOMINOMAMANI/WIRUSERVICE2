document.addEventListener('DOMContentLoaded', function() {
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    const productos = document.querySelectorAll('.producto');
    
    filtroBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            
            filtroBtns.forEach(b => b.classList.remove('active'));
           
            this.classList.add('active');
            
            const categoria = this.dataset.categoria;
            
            productos.forEach(producto => {
                if(categoria === 'todos' || producto.dataset.categoria === categoria) {
                    producto.style.display = 'block';
                } else {
                    producto.style.display = 'none';
                }
            });
        });
    });
});

