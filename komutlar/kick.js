const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");
const moment = require("moment");
require("moment-duration-format");

exports.run = function (client, message, args) {

      //-----------------------KOD-BAŞLANGIÇ-----------------------\\

    if(!message.member.hasPermission("KİCK_MEMBERS")) return message.channel.send("Bu yetkiyi kullanabilmek için **Üyeleri At** yetkisine sahip olmalısın.")

      let knl = ayarlar.botkomut;
      let schawn = message.mentions.users.first() || message.guild.members.cache.get(args[0]); // schâwn
      let sebep = args.slice(1).join(' ') || "Sebep Belirtilmemiş";
      let kickkanal = ayarlar.kicklog;

      if(message.channel.id !== knl) return message.reply("Bu Komutu Sadece <#847578740925923348> Kanalında Kullanabilirsin!")

      if(!schawn) return message.reply("Kickleyeceğin Kişiyi Belirtirmisin?")  // schâwn

      if(!sebep) return message.reply("Kickleme Sebebini Belirtirmisin?")

      if(schawn.id === message.author.id) return message.reply("Kendini Kickleyemezsin!")

      if(!message.guild.member(schawn).kickable) return message.reply("Bu Kişiyi Kickleyemezsin!")

        
        message.guild.member(schawn).kick(sebep) // kullanıcı kicklendi

        message.react("<a:schawntik:834484844876398622>").then(() => {
          setTimeout(() => {
    
          message.delete()
          },5000);
        })
            
         const kicklendi = new Discord.MessageEmbed()
         .setAuthor(message.author.tag, message.author.avatarURL())
         .setTitle("Sunucudan Bir Kullanıcı Kicklendi!")
         .setColor("0x348f36")
         .setDescription(`
           
              Kickleyen Yetkili » ${message.author} (\`${message.author.id}\`)
              Kicklenen Kullanıcı » ${schawn} (\`${schawn.id}\`)
              Sebep » \`${sebep}\`
              Tarih » \`${moment(Date.now()).format("HH:mm:ss DD MMMM YYYY")}\`

            `)
         .setFooter("schâwn ❤️ Lawertz")
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