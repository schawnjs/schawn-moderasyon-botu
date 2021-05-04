const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");
const moment = require("moment");
require("moment-duration-format");

exports.run = function (client, message, args) {

      //-----------------------KOD-BAŞLANGIÇ-----------------------\\

    if(!message.member.hasPermission("KİCK_MEMBERS")) return message.channel.send("Bu yetkiyi kullanabilmek için **Üyeleri At** yetkisine sahip olmalısın.")

      let knl = ayarlar.botkomut;
      let scháwn = message.mentions.users.first() || message.guild.members.cache.get(args[0]); // scháwn
      let sebep = args.slice(1).join(' ') || "Sebep Belirtilmemiş";
      let kickkanal = ayarlar.kicklog;

      if(message.channel.id !== knl) return message.reply("**Bu Komutu Sadece \`Bot Komut\` Kanalında Kullanabilirsin!**")

      if(!scháwn) return message.channel.send("**Kickleyeceğin Kişiyi Belirtirmisin?**")  // scháwn

      if(!sebep) return message.channel.send("**Kickleme Sebebini Belirtirmisin?**")

      if(scháwn.id === message.author.id) return message.channel.send("**Kendini Kickleyemezsin!**")

      if(!message.guild.member(scháwn).kickable) return message.channel.send("**Bu Kişiyi Kickleyemezsin!**")

        
        message.guild.member(scháwn).kick(sebep)

        message.react("✅").then(() => {
          setTimeout(() => {
    
          message.delete()
          },5000);
        })
            
         const kicklendi = new Discord.MessageEmbed()
         .setAuthor(message.author.tag, message.author.avatarURL())
         .setColor("0x348f36")
         .setDescription(`
           
              Kickleyen Yetkili » ${message.author} (\`${message.author.id}\`)
              Kicklenen Kullanıcı » ${scháwn} (\`${scháwn.id}\`)
              Sebep » \`${sebep}\`
              Tarih  \`${moment(Date.now()).format("HH:mm:ss DD MMMM YYYY")}\`

            `)
         .setFooter("scháwn ❤️ Pulsé")
         .setTimestamp()
         
         client.channels.cache
         .get(kickkanal)
         .send(kicklendi)
         
  }

exports.conf = {
  enabled: true,
  aliases: ['kick'],
  guildOnly: false,
  permLevel: 0
};

exports.help = {
  name: 'kick',
  usage: 'kick'
};
  
