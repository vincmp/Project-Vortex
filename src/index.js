const { Client, GatewayIntentBits, Collection, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent 
    ]
});
const fs = require('fs');

client.commands = new Collection(); // Configuração de eventos e comandos.

require('dotenv').config();

//############################################################
//# +------------------------------------------------------+ #
//# |             Pasta de comandos (Handler)              | #
//# +------------------------------------------------------+ #
//############################################################

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

//############################################################
//# +------------------------------------------------------+ #
//# |               Boas-vindas & Auto-role                | #
//# +------------------------------------------------------+ #
//############################################################

(async () => {
    client.on("guildMemberAdd", async (member) => { // Tratamento de evento "guildMemberAdd".
        try {
            // Adicionar cargo de autorole
            let cargo_autorole = member.guild.roles.cache.get("1172865588712972321"); // Substitua pelo ID do cargo.
            if (cargo_autorole) {
                await member.roles.add(cargo_autorole);
                console.log(`✅ Cargo de autorole adicionado para ${member.user.tag}.`);
                
                const row = new ActionRowBuilder() // Configurar os botões.
                    .addComponents(
                        new ButtonBuilder()
                            .setURL('https://discordapp.com/channels/1172865588712972318/1172865589052723301')
                            .setLabel('Bate-Papo 💬')
                            .setStyle('Link'),
                        new ButtonBuilder()
                            .setURL('https://discordapp.com/channels/1172865588712972318/1172865588729753667')
                            .setLabel('Diretrizes 📃')
                            .setStyle('Link'),
                        new ButtonBuilder()
                            .setURL('https://discordapp.com/channels/1172865588712972318/1172865588729753668')
                            .setLabel('Anúncios 📢')
                            .setStyle('Link')
                );

                let welcome = new EmbedBuilder() // Configurar a mensagem de boas-vindas.
                    .setColor('#d34a4a')
                    .setImage('https://media.discordapp.net/attachments/1042553603879080016/1217187425399472218/standard.gif?ex=66031d20&is=65f0a820&hm=1948927340643a3b4e40d9f9ef7969d6b6a43bb50f8e4d692f0f1ae72e8da070&=')
                    .setTitle('Central de Boas Vindas')
                    .setDescription(`⊹ ${member.user}, bem-vindo(a) ao servidor! Desejamos uma boas estadia e que se divirta!`)
                    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }));

                const canal_boas_vindas = member.guild.channels.cache.get("1172865588729753669"); // Substitua pelo ID do canal.
                if (canal_boas_vindas) {
                    canal_boas_vindas.send({ embeds: [welcome], components: [row] });
                } else {
                    console.log("❌ Canal de boas-vindas não encontrado.");
                }
            } else {
                console.log("❌ O AUTOROLE não está configurado ou o ID do cargo está incorreto.");
            }
        } catch (err) {
            console.error(`❌ Não foi possível adicionar o cargo de autorole para ${member.user.tag}. Erro: ${err}`);
        }
    });

//############################################################
//# +------------------------------------------------------+ #
//# |             Funções, comandos e Eventos              | #
//# +------------------------------------------------------+ #
//############################################################

    for (const file of functions) {
        require(`./functions/${file}`)(client);
    } // Importar funções e comandos e lidar com eventos.
    
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");

//############################################################
//# +------------------------------------------------------+ #
//# |                 Login junto ao dotenv                | #
//# +------------------------------------------------------+ #
//############################################################

    client.login(process.env.token); // Login do bot.
})();