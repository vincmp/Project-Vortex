// Importando a classe Interaction do Discord.js
const { Interaction } = require("discord.js");

// Exportando um objeto que representa um evento de interação (interactionCreate)
module.exports = {
    // Definindo o nome do evento
    name: 'interactionCreate',
    // Função assíncrona para lidar com a execução do evento de interação
    async execute(interaction, client) {
        // Verificando se a interação não é um comando
        if (!interaction.isCommand()) return;

        // Obtendo o comando correspondente à interação do cliente
        const command = client.commands.get(interaction.commandName);

        // Verificando se o comando foi encontrado
        if (!command) return;

        try {
            // Executando o comando correspondente à interação
            await command.execute(interaction, client);
        } catch (error) {
            // Lidando com erros que possam ocorrer durante a execução do comando
            console.log(error);
            // Respondendo à interação com uma mensagem de erro
            await interaction.reply({
                content: 'Ocorreu um erro ao executar este comando!',
                ephemeral: true
            });
        }
    },
};
