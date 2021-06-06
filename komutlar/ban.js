const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");
const moment = require("moment");
require("moment-duration-format");

exports.run = async (client, message, args) => {

        //-----------------------KOD-BAŞLANGIÇ---------------------\\
 
        let yetkilicik = ayarlar.banhammer;
        let knl = ayarlar.botkomut;
        let schawn = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        let sebep = args.slice(1).join(' ') || "Sebep Belirtilmemiş";
        let guild = message.guild;
        let bankanal = ayarlar.banlog;

        if(!message.member.roles.cache.get("847578555247755268") && !message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu Komutu Kullanabilmek İçin <@&${yetkilicik}> Yetkisine Sahip Olmak Zorundasın.`)

        if(message.channel.id !== knl) return message.reply("Bu Komutu Sadece <#850793635813654588> Kanalında Kullanabilirsin!")

        if(!schawn) return message.reply("Yasaklıcağın Kullanıcıyı Belirtirmisin?")  

        if(!sebep) return message.reply("Yasaklama Sebebini Belirtirmisin?")

        if(schawn.id === message.author.id) return message.reply("Kendini Yasaklayamazsın!")

        if(schawn.id === client.user.id) return message.reply("Botu Yasaklayamazsın!")

        else
        guild.members.ban(schawn) // Kullanıcı banlandı
        
         message.channel.send(new Discord.MessageEmbed()
            .setDescription(`${message.author} Tarafından ${schawn} adlı kişi sunucudan başarıyla yasaklandı.`)
            .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
            .setFooter("schâwn ❤️ Lawertz")
            .setColor("0x348f36"))
            .then(x => x.delete({ timeout: 5000 }))

        message.react("<a:schawntik:834484844876398622>").then(() => {
          setTimeout(() =>  {

          message.delete()
          },5000);
        })
        
         const banlandı = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL())
          .setColor("0x348f36")
          .setDescription(`
           
              Yasaklayan Yetkili » ${message.author} (\`${message.author.id}\`)
              Yasaklanan Kullanıcı » ${schawn} (\`${schawn.id}\`)
              Sebep » \`${sebep}\`
              Tarih » \`${moment(Date.now()).format("HH:mm:ss DD MMMM YYYY")}\`

          `)
          .setFooter("schawn ❤️ Lawertz")
          .setTimestamp()
          
          client.channels.cache
          .get(bankanal)
          .send(banlandı) 
    }

exports.conf = {
  enabled: true,
  aliases: ['ban', "yasakla"],
  guildOnly: false,
  permLevel: 0
};

exports.help = {
  name: 'ban',
  usage: 'ban'
};