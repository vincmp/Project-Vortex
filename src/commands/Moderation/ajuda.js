// Importando o construtor SlashCommandBuilder do pacote '@discordjs/builders'
const { SlashCommandBuilder } = require('@discordjs/builders');
// Importando a classe EmbedBuilder do pacote 'discord.js'
const { EmbedBuilder } = require('discord.js');

// Exportando um objeto que representa um comando slash
module.exports = {
    // Definindo os dados do comando slash
    data: new SlashCommandBuilder()
        .setName('ajuda')
        .setDescription('Tenha acesso aos meus comandos! (Exclusivo pra Staffs)'),

    // Função assíncrona para executar o comando
    async execute(interaction) {
        // Criando um novo embed para enviar como resposta à interação
        let embed = new EmbedBuilder()
            .setColor('#d34a4a')
            .setDescription('⊹ Em desenvolvimento!');

        // Respondendo à interação com o embed criado
        await interaction.reply({ embeds: [embed] });
    }
};
