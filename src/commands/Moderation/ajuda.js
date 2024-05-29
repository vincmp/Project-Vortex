// Importando o construtor SlashCommandBuilder do pacote '@discordjs/builders'
const { SlashCommandBuilder } = require('@discordjs/builders');
// Importando a classe EmbedBuilder do pacote 'discord.js'
const { EmbedBuilder } = require('discord.js');

// Exportando um objeto que representa um comando slash
module.exports = {
    // Definindo os dados do comando slash
    data: new SlashCommandBuilder()
        .setName('ajuda')
        .setDescription('Veja os comandos disponiveis! (EM DESENVOLVIMENTO)'),

    // Função assíncrona para executar o comando
    async execute(interaction) {
        // Criando um novo embed para enviar como resposta à interação
        let embed = new EmbedBuilder()
            .setColor('#d34a4a')
            .setTitle('**❔ Lista de Comandos Disponiveis.**')
            .setDescription(`⊹ Olá, me chamo <@1217155580318191718>!\n Minha função é lhe auxiar no dia a dia do discord, para isto trago uma seleta quantidade de comandos, veja abaixo quais estão disponiveis.\n‎ `)
            .addFields(
                { name: '📜| CATEGORIA', value: 'TEXTO', inline: true },
                { name: '📜| CATEGORIA', value: 'TEXTO', inline: true },
                { name: '📜| CATEGORIA', value: 'TEXTO', inline: true },
            );
        // Respondendo à interação com o embed criado
        await interaction.reply({ embeds: [embed] });
    }
};
