// Exportando uma função que será chamada com o cliente Discord como argumento
module.exports = (client) => {
    // Definindo uma função assíncrona para lidar com os eventos
    client.handleEvents = async (eventFiles, path) => {
        // Iterando sobre os arquivos de evento fornecidos
        for (const file of eventFiles) {
            // Requerindo o arquivo de evento atual
            const event = require(`../events/${file}`);
            // Verificando se o evento deve ser tratado apenas uma vez ou várias vezes
            if (event.once) {
                // Se o evento for do tipo "once", registra-o como um evento único (once) no cliente Discord
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                // Caso contrário, registra-o como um evento recorrente (on) no cliente Discord
                client.on(event.name, (...args) => event.execute(...args, client));
            }
        }
    };
};
