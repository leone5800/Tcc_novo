from flask import Flask, request, jsonify
from twilio.rest import Client
import os

app = Flask(__name__)

# Configurações da API Twilio
account_sid = os.environ.get('TWILIO_ACCOUNT_SID')
auth_token = os.environ.get('TWILIO_AUTH_TOKEN')
whatsapp_from = 'whatsapp:+15997541602'  # Número de WhatsApp fornecido pela Twilio
client = Client(account_sid, auth_token)

# Função para gerar o link do carrinho de compras
def gerar_link_carrinho(produtos):
    base_url = "http://127.0.0.1:5501/carrinho.html?"
    params = "&".join([f"produto_id={produto['id']}&quantidade={produto['quantidade']}" for produto in produtos])
    return base_url + params

# Função para enviar mensagem pelo WhatsApp
def enviar_mensagem_whatsapp(numero_destino, mensagem):
    message = client.messages.create(
        body=mensagem,
        from_=whatsapp_from,
        to=f'whatsapp:{numero_destino}'
    )
    return message.sid

@app.route('/enviar_carrinho', methods=['POST'])
def enviar_carrinho():
    dados = request.json
    numero_cliente = dados.get("numero")
    produtos = dados.get("produtos")  # Lista de dicionários com IDs e quantidades dos produtos
    
    # Gerar o link do carrinho
    link_carrinho = gerar_link_carrinho(produtos)
    mensagem = f"Olá! Confira seu carrinho de compras: {link_carrinho}"
    
    # Enviar mensagem
    try:
        sid = enviar_mensagem_whatsapp(numero_cliente, mensagem)
        return jsonify({"status": "success", "sid": sid}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
