// Importação dos construtores necessários para criar comandos slash
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

// Exportação do módulo para utilização em outros arquivos
module.exports = {
    // Definição dos dados do comando slash
    data: new SlashCommandBuilder()
        .setName('attnotes') // Define o nome do comando
        .setDescription('Mostre o que foi alterado nesta atualização!') // Define a descrição do comando
        // Adiciona opções para o comando, como versão, o que foi adicionado, corrigido e removido
        .addStringOption(option =>
            option
                .setName('versão')
                .setDescription('Qual o numero da versão?')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('descrição')
                .setDescription('Faça comemtario na att. note')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('novo')
                .setDescription('O que foi adicionado?')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('corrigido')
                .setDescription('O que foi corrigido?')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('removido')
                .setDescription('O que foi removido?')
                .setRequired(true)),

    // Função para executar o comando
    async execute(interaction, options, client, interactionUser) {
        // Extrai os valores das opções do comando
        const ver = interaction.options.getString('versão');
        const desc = interaction.options.getString('descrição');
        const neew = interaction.options.getString('novo');
        const edited = interaction.options.getString('corrigido');
        const deleted = interaction.options.getString('removido');

        // Cria um objeto de embed para informar que as notas foram enviadas com sucesso
        let embed1 = new EmbedBuilder()
            .setColor('#d34a4a')
            .setDescription('⊹ Patch Note enviada com sucesso.');

        // Cria um objeto de embed contendo as notas de atualização
        let embed2 = new EmbedBuilder()
            .setColor('#d34a4a')
            .setTitle(`**📝 Notas de Atualização - v${ver}**`)
            .setDescription(`${desc}`)
            .addFields(
                { name: '🎉 Novidades:', value: `⊹ ${neew.split(';;').join('\n⊹ ')}\n` }, // Divide as novidades em linhas
                { name: '🐛 Correções:', value: `⊹ ${edited.split(';;').join('\n⊹ ')}\n` }, // Divide as correções em linhas
                { name: '🗑️ Removido:', value: `⊹ ${deleted.split(';;').join('\n⊹ ')}\n` }, // Divide os itens removidos em linhas
            )
            .setTimestamp();

        // Responde à interação do usuário com o embed de confirmação
        await interaction.reply({ embeds: [embed1], ephemeral: true });
        // Envia o embed com as notas de atualização para um canal específico no servidor
        await interaction.guild.channels.cache.get('1172865588729753668').send({ embeds: [embed2] });
    }
}
