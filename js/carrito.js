// Recupera os produtos armazenados no localStorage e garante que seja um array
let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito) || []; // Se não houver nada, inicializa como um array vazio

// Seleciona os elementos do DOM relacionados ao carrinho
const contenedorCarritoVacio = document.querySelector("#carrito-vacio"); // Contêiner exibido quando o carrinho está vazio
const contenedorCarritoProductos = document.querySelector("#carrito-productos"); // Contêiner onde os produtos do carrinho serão exibidos
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones"); // Contêiner com os botões de ações (comprar, esvaziar)
const contenedorCarritoComprado = document.querySelector("#carrito-comprado"); // Mensagem exibida após finalizar a compra
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar"); // Botões de "Excluir produto"
const botonVaciar = document.querySelector("#carrito-acciones-vaciar"); // Botão para esvaziar o carrinho
const contenedorTotal = document.querySelector("#total"); // Exibe o total do carrinho
const botonComprar = document.querySelector("#carrito-acciones-comprar"); // Botão para finalizar a compra

// Função para carregar os produtos do carrinho na página
function cargarProductosCarrito() {
    // Verifica se há produtos no carrinho
    if (productosEnCarrito && productosEnCarrito.length > 0) {
        // Configura a visibilidade dos contêineres
        contenedorCarritoVacio.classList.add("disabled"); // Esconde a mensagem de carrinho vazio
        contenedorCarritoProductos.classList.remove("disabled"); // Mostra os produtos no carrinho
        contenedorCarritoAcciones.classList.remove("disabled"); // Mostra as ações do carrinho
        contenedorCarritoComprado.classList.add("disabled"); // Esconde a mensagem de compra finalizada

        // Limpa o conteúdo anterior do contêiner de produtos
        contenedorCarritoProductos.innerHTML = "";

        // Itera sobre os produtos no carrinho e os adiciona ao DOM
        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto"); // Adiciona a classe para estilização
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Quantidade</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Preço</small>
                    <p>R$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>R$${(producto.precio * producto.cantidad).toFixed(2)}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;

            contenedorCarritoProductos.append(div); // Adiciona o produto ao contêiner
        });

        actualizarBotonesEliminar(); // Atualiza os eventos dos botões de excluir
        actualizarTotal(); // Atualiza o valor total do carrinho
    } else {
        // Caso não haja produtos no carrinho, ajusta a visibilidade dos elementos
        contenedorCarritoVacio.classList.remove("disabled"); // Mostra a mensagem de carrinho vazio
        contenedorCarritoProductos.classList.add("disabled"); // Esconde os produtos
        contenedorCarritoAcciones.classList.add("disabled"); // Esconde as ações
        contenedorCarritoComprado.classList.add("disabled"); // Esconde a mensagem de compra finalizada
    }
}

// Carrega os produtos do carrinho ao abrir a página
cargarProductosCarrito();

// Função para atualizar os botões de excluir produto
function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar"); // Re-seleciona os botões de excluir

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito); // Adiciona o evento de clique para excluir
    });
}

// Função para excluir um produto do carrinho
function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id; // Obtém o ID do produto a ser removido
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton); // Encontra o índice do produto

    productosEnCarrito.splice(index, 1); // Remove o produto do array
    cargarProductosCarrito(); // Recarrega os produtos no carrinho
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito)); // Atualiza o localStorage
}

// Adiciona o evento para esvaziar o carrinho
botonVaciar.addEventListener("click", vaciarCarrito);

// Função para esvaziar o carrinho
function vaciarCarrito() {
    productosEnCarrito.length = 0; // Limpa o array
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito)); // Atualiza o localStorage
    cargarProductosCarrito(); // Recarrega o estado vazio do carrinho
}

// Função para calcular e atualizar o valor total do carrinho
function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0); // Soma os subtotais
    contenedorTotal.innerText = `R$${totalCalculado.toFixed(2)}`; // Exibe o total no DOM
}

// Função para gerar uma mensagem formatada para WhatsApp com os itens do carrinho
function gerarMensagemWhatsApp() {
    if (productosEnCarrito.length === 0) return ""; // Retorna vazio se o carrinho estiver vazio

    let mensagem = "Olá! Seu pedido está pronto. Confira os itens:\n\n";

    // Adiciona os detalhes de cada produto na mensagem
    productosEnCarrito.forEach(producto => {
        mensagem += `- ${producto.titulo} (Quantidade: ${producto.cantidad})\n`;
    });

    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0); // Calcula o total
    mensagem += `\nTotal: R$${totalCalculado.toFixed(2)}`; // Adiciona o total na mensagem

    return mensagem;
}

// Adiciona o evento de clique para finalizar a compra
botonComprar.addEventListener("click", comprarCarrito);

// Função para finalizar a compra e enviar mensagem no WhatsApp
function comprarCarrito() {
    const mensagem = gerarMensagemWhatsApp(); // Gera a mensagem formatada
    if (!mensagem) {
        alert("Seu carrinho está vazio."); // Exibe alerta se o carrinho estiver vazio
        return;
    }

    const telefone = "5515997541602"; // Número de WhatsApp para envio
    const urlWhatsApp = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`; // Cria o link para WhatsApp

    productosEnCarrito.length = 0; // Limpa o carrinho
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito)); // Atualiza o localStorage

    // Ajusta a visibilidade dos elementos para mostrar a mensagem de compra finalizada
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

    window.open(urlWhatsApp, "_blank"); // Abre o link do WhatsApp em uma nova aba
}
