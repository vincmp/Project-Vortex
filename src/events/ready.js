// Exportando um objeto que representa um evento 'ready'
module.exports = {
    // Definindo o nome do evento
    name: 'ready',
    // Indicando se o evento deve ser tratado apenas uma vez
    once: true,
    // Função assíncrona para lidar com a execução do evento 'ready'
    async execute(client) {
        // Exibindo uma mensagem indicando que o bot está online
        console.log('🛰️⠀⠀⊹ BOT ONLINE.');
    },
};
