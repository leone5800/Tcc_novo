// Função para formatar a lista de produtos em uma mensagem para o WhatsApp
function gerarMensagemWhatsApp() {
    if (productosEnCarrito.length === 0) return ""; // Se o carrinho estiver vazio, retorna vazio

    // Inicia a mensagem com um cumprimento e introdução
    let mensagem = "Olá! Seu pedido no site está pronto. Confira os itens do seu carrinho:\n\n";

    // Itera sobre os produtos no carrinho para adicionar nome e quantidade de cada item
    productosEnCarrito.forEach(produto => {
        mensagem += `- ${produto.titulo} (Quantidade: ${produto.cantidad})\n`;
    });

    // Adiciona o total do pedido
    const totalCalculado = productosEnCarrito.reduce((acc, produto) => acc + (produto.precio * produto.cantidad), 0);
    mensagem += `\nTotal: R$${totalCalculado.toFixed(2)}`;

    return mensagem;
}

// Modifica a função comprarCarrito para incluir o link de WhatsApp com a mensagem gerada
function comprarCarrito() {
    // Gera a mensagem do WhatsApp
    const mensagem = gerarMensagemWhatsApp();
    if (!mensagem) {
        alert("Seu carrinho está vazio.");
        return;
    }

    // URL do WhatsApp com a mensagem codificada para o envio
    const telefone = "5515997541602"; // Substitua pelo número desejado
    const urlWhatsApp = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

    // Limpa o carrinho como anteriormente
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    // Atualiza a interface do carrinho
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

    // Redireciona para o WhatsApp
    window.open(urlWhatsApp, "_blank");
}
