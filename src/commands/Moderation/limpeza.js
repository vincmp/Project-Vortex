const { SlashCommandBuilder, EmbedBuilder, Client, Intents } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('limpar')
    .setDescription('Limpa as mensagens do chat.')
    .addIntegerOption(option =>
      option.setName('quantidade')
        .setDescription('Quantas mensagens deseja limpar? (máximo de 100)')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100)
    ),
  async execute(interaction) {
    // Obter a quantidade de mensagens a serem apagadas
    const quantidade = interaction.options.getInteger('quantidade');

    // Obter o canal de texto onde o comando foi usado
    const channel = interaction.channel;

    // Limpar as mensagens
    channel.bulkDelete(quantidade, true)
      .then(messages => {
        interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setColor('#d34a4a')
              .setTitle('**🗑️ - Serviço de Limpeza.**')
              .setDescription(` ⊹ ${messages.size} mensagens foram limpas com sucesso!`)
          ],
          ephemeral: true
        });
      })
      .catch(error => {
        interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setColor('#d34a4a')
              .setTitle('**🗑️ - Serviço de Limpeza.**')
              .setDescription(`⊹ Erro ao limpar mensagens: ${error.message}`)
          ],
          ephemeral: true
        });
      });
  }
};