const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");
const moment = require("moment");
require("moment-duration-format");

exports.run = async (client, message, args) => {

        //-----------------------KOD-BAŞLANGIÇ---------------------\\
 
        let yetkilicik = ayarlar.banyetkili;
        let knl = ayarlar.botkomut;
        let scháwn = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        let sebep = args.slice(1).join(' ') || "Sebep Belirtilmemiş";
        let guild = message.guild;
        let bankanal = ayarlar.banlog;

        if(!message.member.roles.cache.get(yetkilicik)) return message.reply(`**Bu Komutu Kullanabilmek İçin <@&${yetkilicik}> Yetkisine Sahip Olmak Zorundasın.**`)

        if(message.channel.id !== knl) return message.channel.send("**Bu Komutu Sadece \`Bot Komut\` Kanalında Kullanabilirsin!**")

        if(!scháwn) return message.channel.send("**Yasaklıcağın Kullanıcıyı Belirtirmisin?**")  

        if(!sebep) return message.channel.send("**Yasaklama Sebebini Belirtirmisin?**")

        if(scháwn.id === message.author.id) return message.channel.send("**Kendini Yasaklayamazsın!**")

        if(scháwn.id === client.user.id) return message.channel.send("**Botu Yasaklayamazsın!**")

        else
        guild.members.ban(scháwn) // Kullanıcı banlandı
         message.channel.send(new Discord.MessageEmbed()
            .setDescription(`${message.author} Tarafından ${scháwn} adlı kişi sunucudan başarıyla yasaklandı.`)
            .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
            .setFooter("scháwn ❤️ Pulsé")
            .setColor("0x348f36"))
            .then(x => x.delete({ timeout: 5000 }))

        message.react("✅").then(() => {
          setTimeout(() =>  {

          message.delete()
          },5000);
        })
        
         const banlandı = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL())
          .setColor("0x348f36")
          .setDescription(`
           
              Yasaklayan Yetkili » ${message.author} (\`${message.author.id}\`)
              Yasaklanan Kullanıcı » ${scháwn} (\`${scháwn.id}\`)
              Sebep » \`${sebep}\`
              Tarih » \`${moment(Date.now()).format("HH:mm:ss DD MMMM YYYY")}\`

          `)
          .setFooter("scháwn ❤️ Pulsé")
          .setTimestamp()
          
          client.channels.cache
          .get(bankanal)
          .send(banlandı) 
    }

exports.conf = {
  enabled: true,
  aliases: ['ban'],
  guildOnly: false,
  permLevel: 0
};

exports.help = {
  name: 'ban',
  usage: 'ban'
};
  