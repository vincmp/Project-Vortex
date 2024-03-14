// Importando as bibliotecas necessárias do Discord.js e do sistema de arquivos do Node.js
const { REST } = require("@discordjs/rest");
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

// Definindo as IDs do cliente e do servidor (guild) do Discord
const clientId = '1217155580318191718';
const guildId = '1172865588712972318';

// Exportando uma função que será chamada com o cliente Discord como argumento
module.exports = (client) => {
    // Definindo uma função assíncrona para lidar com os comandos
    client.handleCommands = async (commandFolders, path) => {
        // Inicializando um array para armazenar os comandos
        client.commandArray = [];
        // Iterando sobre as pastas de comandos fornecidas
        for (folder of commandFolders) {
            // Lendo os arquivos na pasta atual e filtrando apenas os arquivos JavaScript
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
            // Iterando sobre os arquivos de comando encontrados
            for (const file of commandFiles) {
                // Requerendo o arquivo de comando atual
                const command = require(`../commands/${folder}/${file}`);
                // Adicionando o comando ao cliente e ao array de comandos
                client.commands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON());
            }
        }

        // Inicializando uma instância do REST API do Discord
        const rest = new REST({
            version: '9'
        }).setToken(process.env.token);

        // Função assíncrona para enviar os comandos para o servidor do Discord
        (async () => {
            try {
                console.log('📁⠀⠀⊹ Carregando pasta de comandos...');

                // Enviando os comandos para o servidor do Discord
                await rest.put(
                    Routes.applicationCommands(clientId), {
                    body: client.commandArray
                },
                );

                console.log('✅⠀⠀⊹ Pasta de comandos carregada com sucesso!');
            } catch (error) {
                console.error(error);
            }
        })();
    };
};
