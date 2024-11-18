// Inicializa um array vazio para armazenar os produtos carregados
let productos = [];

// Faz uma requisição para carregar os produtos do arquivo JSON
fetch("./js/productos.json")
    .then(response => response.json()) // Converte a resposta para JSON
    .then(data => {
        productos = data; // Armazena os produtos na variável 'productos'
        cargarProductos(productos); // Chama a função para exibir os produtos na página
    });

// Seleciona o contêiner onde os produtos serão exibidos
const contenedorProductos = document.querySelector("#contenedor-productos");

// Seleciona todos os botões de categoria
const botonesCategorias = document.querySelectorAll(".boton-categoria");

// Seleciona o título principal (muda com base na categoria)
const tituloPrincipal = document.querySelector("#titulo-principal");

// Inicializa a lista de botões de "Adicionar ao carrinho" (atualizada dinamicamente)
let botonesAgregar = document.querySelectorAll(".producto-agregar");

// Seleciona o elemento onde será exibido o número de itens no carrinho
const numerito = document.querySelector("#numerito");

// Adiciona um evento de clique a todos os botões de categoria
botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible"); // Fecha o menu lateral ao clicar em uma categoria
}));

// Função para carregar e exibir os produtos escolhidos na página
function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = ""; // Limpa o conteúdo antigo do contêiner

    productosElegidos.forEach(producto => {
        // Cria um elemento <div> para cada produto
        const div = document.createElement("div");
        div.classList.add("producto"); // Adiciona a classe CSS 'producto'

        // Adiciona o conteúdo HTML do produto ao <div>
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">R$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Comprar</button>
            </div>
        `;

        contenedorProductos.append(div); // Adiciona o produto ao contêiner
    });

    actualizarBotonesAgregar(); // Atualiza os eventos dos botões de "Adicionar ao carrinho"
}

// Adiciona eventos de clique aos botões de categoria para filtrar produtos
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        // Remove a classe 'active' de todos os botões e adiciona ao botão clicado
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        // Verifica se o botão clicado é "todos" ou uma categoria específica
        if (e.currentTarget.id != "todos") {
            // Filtra os produtos da categoria selecionada
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre; // Atualiza o título principal
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton); // Carrega os produtos filtrados
        } else {
            // Caso seja "todos", exibe todos os produtos
            tituloPrincipal.innerText = "Todos os Produtos";
            cargarProductos(productos);
        }
    });
});

// Função para atualizar os eventos de clique dos botões "Adicionar ao carrinho"
function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar"); // Re-seleciona os botões

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito); // Adiciona o evento de clique
    });
}

// Variável para armazenar os produtos no carrinho
let productosEnCarrito;

// Verifica se há dados do carrinho armazenados no localStorage
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS); // Carrega os dados do localStorage
    actualizarNumerito(); // Atualiza o contador de itens no carrinho
} else {
    productosEnCarrito = []; // Inicializa um carrinho vazio
}

// Função para adicionar um produto ao carrinho
function agregarAlCarrito(e) {
    // Exibe uma notificação usando Toastify
    Toastify({
        text: "Produtos Comprados",
        duration: 3000, // Duração de 3 segundos
        close: true, // Permite fechar a notificação
        gravity: "top", // Aparece na parte superior
        position: "right", // Aparece à direita
        stopOnFocus: true, // Não fecha ao passar o mouse
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // Margem horizontal
            y: '1.5rem' // Margem vertical
        }
    }).showToast();

    const idBoton = e.currentTarget.id; // Obtém o ID do botão clicado
    const productoAgregado = productos.find(producto => producto.id === idBoton); // Encontra o produto correspondente

    // Verifica se o produto já está no carrinho
    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++; // Incrementa a quantidade
    } else {
        productoAgregado.cantidad = 1; // Adiciona com quantidade inicial 1
        productosEnCarrito.push(productoAgregado); // Adiciona ao carrinho
    }

    actualizarNumerito(); // Atualiza o número de itens no carrinho

    // Armazena o carrinho atualizado no localStorage
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

// Função para atualizar o contador de itens no carrinho
function actualizarNumerito() {
    // Soma a quantidade total de itens no carrinho
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito; // Atualiza o elemento HTML
}

// (Extra) Versão alternativa da função `cargarProductos` com efeito de atraso
function cargarProductos(productosElegidos) {
    const contenedorProductos = document.querySelector("#contenedor-productos");
    contenedorProductos.innerHTML = ""; // Limpa os produtos antigos

    productosElegidos.forEach((producto, index) => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">R$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Comprar</button>
            </div>
        `;

        // Adiciona um pequeno atraso para cada produto aparecer suavemente
        setTimeout(() => {
            div.classList.add("aparecer");
        }, index * 100); // Atraso de 100ms entre cada produto

        contenedorProductos.append(div);
    });

    actualizarBotonesAgregar(); // Atualiza os eventos dos botões
}
