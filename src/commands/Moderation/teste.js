const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('teste')
    .setDescription('Teste o bot'),

    async execute (interaction) {

         let embed = new EmbedBuilder()
        .setColor('#d34a4a')
        .setDescription('Estou funcionando!');

        await interaction.reply({embeds: [embed]})
    }

}