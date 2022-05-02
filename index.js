const Discord = require("discord.js")
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_VOICE_STATES"] });

client.login(process.env.token);

client.once('ready', () => {
    console.log('Artemis bot on')
});

client.on("ready", () => {
    client.user.setActivity(`c!help and c!play`, { type: "STREAMING" });
});

//help
client.on("messageCreate", (message) => {
   
        if (message.content == "c!help") {
            var embed = new Discord.MessageEmbed()
                .setTitle("🎓 HELP ARTEMIS-BOT 🎓")
                .setColor("#2f3135")
                .setDescription("**Artemis-bot,music-bot**")
                .setThumbnail("https://2.bp.blogspot.com/--kdlEa4SrTE/WKRYKoQkpEI/AAAAAAAAA5A/FYNPZEmUp6wxnjtToEGk9pIo4QDigY-8gCLcB/s1600/music%2Bgif%2B3.gif")
            
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({ dynamic: true })
                )
    
                .addFields(
                    {
                         name: 'c!play', 
                         value: 'Riproduce un brano da YouTube, spotify o soundcloud', 
                         inline: true
                    },
                    {
                        name: 'c!pause', 
                        value: 'Mette in pausa il brano attualmente in riproduzione', 
                        inline: true
                   },
                   {
                        name: 'c!resume', 
                        value: 'Riprendi la riproduzione del brano', 
                        inline: true
                    },
                    {
                        name: 'c!queue', 
                        value: 'Mostra la coda di riproduzione e il brano in corso.', 
                        inline: true
                    },
                    {
                        name: 'c!stop', 
                        value: 'Ferma la riproduzione', 
                        inline: true
                    },
                    {
                        name: 'c!skip', 
                        value: 'Salta il brano attualmente in riproduzione', 
                        inline: true
                    },
                    {   name: 'c!invite',
                        value: 'invite bot',
                        inline: true
                    },
                );
    
    
            message.channel.send({ embeds: [embed] })
        };
    });

    client.on("messageCreate", (message) => {
   
        if (message.content == "c!invite") {
            var embed = new Discord.MessageEmbed()
                .setTitle("**invite bot**")
                .setColor("#2f3135")
                .setDescription("**Artemis-bot**")
                .setThumbnail("https://2.bp.blogspot.com/--kdlEa4SrTE/WKRYKoQkpEI/AAAAAAAAA5A/FYNPZEmUp6wxnjtToEGk9pIo4QDigY-8gCLcB/s1600/music%2Bgif%2B3.gif")
            
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({ dynamic: true })
                )
    
                .addFields(
                    {
                         name: 'Invite', 
                         value: `https://discord.com/api/oauth2/authorize?client_id=928040044655177779&permissions=534760651072&scope=bot`, 
                         inline: true
                    },
                    {
                        name: 'ufficial discord server', 
                        value: `https://discord.gg/vhNGkZuA45`, 
                        inline: true
                   },
                    
                );
    
    
            message.channel.send({ embeds: [embed] })
        };
    });

    //music
    const { DisTube } = require("distube")
    //Plugin facoltativi
    const { SpotifyPlugin } = require("@distube/spotify")
    const { SoundCloudPlugin } = require("@distube/soundcloud")
    
    const distube = new DisTube(client, {
        youtubeDL: false,
        plugins: [new SpotifyPlugin(), new SoundCloudPlugin()],
        leaveOnEmpty: true,
        leaveOnStop: true
    })
    
    client.on("messageCreate", message => {
        if (message.content.startsWith("c!play")) {
            const voiceChannel = message.member.voice.channel
            if (!voiceChannel) {
                return message.channel.send("Devi essere in un canale vocale")
            }
    
            const voiceChannelBot = message.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
            if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id) {
                return message.channel.send("Qualun'altro sta già ascoltando della musica")
            }
    
            let args = message.content.split(/\s+/)
            let query = args.slice(1).join(" ")
    
            if (!query) {
                return message.channel.send("Inserisci la canzone che vuoi ascoltare")
            }
    
            distube.play(voiceChannelBot || voiceChannel, query, {
                member: message.member,
                textChannel: message.channel,
                message: message
            })
        }
    
        if (message.content == "c!pause") {
            const voiceChannel = message.member.voice.channel
            if (!voiceChannel) {
                return message.channel.send("Devi essere in un canale vocale")
            }
    
            const voiceChannelBot = message.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
            if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id) {
                return message.channel.send("Qualun'altro sta già ascoltando della musica")
            }
    
            try {
                distube.pause(message)
                    .catch(() => { return message.channel.send("Nessuna canzone in riproduzione o canzone già in pausa") })
            } catch {
                return message.channel.send("Nessuna canzone in riproduzione o canzone già in pausa")
            }
    
            message.channel.send("Song paused")
        }
    
        if (message.content == "c!resume") {
            const voiceChannel = message.member.voice.channel
            if (!voiceChannel) {
                return message.channel.send("Devi essere in un canale vocale")
            }
    
            const voiceChannelBot = message.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
            if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id) {
                return message.channel.send("Qualun'altro sta già ascoltando della musica")
            }
    
            try {
                distube.resume(message)
                    .catch(() => { return message.channel.send("Nessuna canzone in riproduzione o canzone già in riproduzione") })
            } catch {
                return message.channel.send("Nessuna canzone in riproduzione o canzone già in riproduzione")
            }
    
            message.channel.send("Song resumed")
        }
    
        if (message.content == "c!queue") {
            const voiceChannel = message.member.voice.channel
            if (!voiceChannel) {
                return message.channel.send("Devi essere in un canale vocale")
            }
    
            const voiceChannelBot = message.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
            if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id) {
                return message.channel.send("Qualun'altro sta già ascoltando della musica")
            }
    
            let queue = distube.getQueue(message)
    
            if (!queue) return message.channel.send("Coda vuota")
    
            let totPage = Math.ceil(queue.songs.length / 10)
            let page = 1
    
            let songsList = ""
            for (let i = 10 * (page - 1); i < 10 * page; i++) {
                if (queue.songs[i]) {
                    songsList += `${i + 1}. **${queue.songs[i].name.length <= 100 ? queue.songs[i].name : `${queue.songs[i].name.slice(0, 100)}...`}** - ${queue.songs[i].formattedDuration}\r`
                }
            }
    
            let embed = new Discord.MessageEmbed()
                .addField("Queue", songsList)
                .setFooter({ text: `Page ${page}/${totPage}` })
    
            let button1 = new Discord.MessageButton()
                .setLabel("Indietro")
                .setStyle("PRIMARY")
                .setCustomId("indietro")
    
            let button2 = new Discord.MessageButton()
                .setLabel("Avanti")
                .setStyle("PRIMARY")
                .setCustomId("avanti")
    
            if (page == 1) button1.setDisabled()
            if (page == totPage) button2.setDisabled()
    
            let row = new Discord.MessageActionRow()
                .addComponents(button1)
                .addComponents(button2)
    
            message.channel.send({ embeds: [embed], components: [row] })
                .then(msg => {
                    const collector = msg.createMessageComponentCollector()
    
                    collector.on("collect", i => {
                        i.deferUpdate()
    
                        if (i.user.id != message.author.id) return i.reply({ content: "Questo bottone non è tuo", ephemeral: true })
    
                        if (i.customId == "indietro") {
                            page--
                            if (page < 1) page = 1
                        }
                        if (i.customId == "avanti") {
                            page++
                            if (page > totPage) page = totPage
                        }
    
                        let songsList = ""
                        for (let i = 10 * (page - 1); i < 10 * page; i++) {
                            if (queue.songs[i]) {
                                songsList += `${i + 1}. **${queue.songs[i].name.length <= 100 ? queue.songs[i].name : `${queue.songs[i].name.slice(0, 100)}...`}** - ${queue.songs[i].formattedDuration}\r`
                            }
                        }
    
                        let embed = new Discord.MessageEmbed()
                            .addField("Queue", songsList)
                            .setFooter({ text: `Page ${page}/${totPage}` })
    
                        let button1 = new Discord.MessageButton()
                            .setLabel("Indietro")
                            .setStyle("PRIMARY")
                            .setCustomId("indietro")
    
                        let button2 = new Discord.MessageButton()
                            .setLabel("Avanti")
                            .setStyle("PRIMARY")
                            .setCustomId("avanti")
    
                        if (page == 1) button1.setDisabled()
                        if (page == totPage) button2.setDisabled()
    
                        let row = new Discord.MessageActionRow()
                            .addComponents(button1)
                            .addComponents(button2)
    
                        msg.edit({ embeds: [embed], components: [row] })
                    })
                })
        }
    
        if (message.content == "c!skip") {
            const voiceChannel = message.member.voice.channel
            if (!voiceChannel) {
                return message.channel.send("Devi essere in un canale vocale")
            }
    
            const voiceChannelBot = message.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
            if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id) {
                return message.channel.send("Qualun'altro sta già ascoltando della musica")
            }
    
            try {
                distube.skip(message)
                    .catch(() => { return message.channel.send("Nessuna canzone in riproduzione o canzone successiva non presente") })
            } catch {
                return message.channel.send("Nessuna canzone in riproduzione o canzone successiva non presente")
            }
    
            message.channel.send("Song skipped")
        }
    
        if (message.content == "c!previous") {
            const voiceChannel = message.member.voice.channel
            if (!voiceChannel) {
                return message.channel.send("Devi essere in un canale vocale")
            }
    
            const voiceChannelBot = message.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
            if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id) {
                return message.channel.send("Qualun'altro sta già ascoltando della musica")
            }
    
            try {
                distube.previous(message)
                    .catch(() => { return message.channel.send("Nessuna canzone in riproduzione o canzone precedente non presente") })
            } catch {
                return message.channel.send("Nessuna canzone in riproduzione o canzone precedente non presente")
            }
    
            message.channel.send("Previous song")
        }
    
        if (message.content == "c!stop") {
            const voiceChannel = message.member.voice.channel
            if (!voiceChannel) {
                return message.channel.send("Devi essere in un canale vocale")
            }
    
            const voiceChannelBot = message.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
            if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id) {
                return message.channel.send("Qualun'altro sta già ascoltando della musica")
            }
    
            try {
                distube.stop(message)
                    .catch(() => { return message.channel.send("Nessuna canzone in riproduzione") })
            } catch {
                return message.channel.send("Nessuna canzone in riproduzione")
            }
    
            message.channel.send("Queue stopped")
        }
    })
    
    distube.on("addSong", (queue, song) => {
        let embed = new Discord.MessageEmbed()
            .setTitle("Song added")
            .addField("Song", song.name)
    
        queue.textChannel.send({ embeds: [embed] })
    })
    
    distube.on("playSong", (queue, song) => {
        let embed = new Discord.MessageEmbed()
            .setTitle("Playing song...")
            .addField("Song", song.name)
            .addField("Requested by", song.user.toString())
    
        queue.textChannel.send({ embeds: [embed] })
    })
    
    distube.on("searchNoResult", (message, query) => {
        message.channel.send("Canzone non trovata")
    })
