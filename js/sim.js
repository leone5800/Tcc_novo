// Função para enviar o carrinho para o backend
function enviarCarrinhoWhatsApp(numeroCliente) {
    const produtosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

    // Formato da requisição para o backend
    const data = {
        numero: numeroCliente, // Número do cliente no formato internacional, ex: "+5511999999999"
        produtos: produtosEnCarrito.map(produto => ({
            id: produto.id,
            quantidade: produto.cantidad
        }))
    };

    fetch("http://127.0.0.1:5000/enviar_carrinho", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            console.log("Mensagem enviada com sucesso!");
        } else {
            console.error("Erro ao enviar a mensagem:", data.message);
        }
    })
    .catch(error => console.error("Erro na requisição:", error));
}
