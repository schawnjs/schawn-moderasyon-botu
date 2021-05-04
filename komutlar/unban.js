const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");
const moment = require("moment");
require("moment-duration-format");

exports.run = async (client, message, args) => {

         //-----------------------KOD-BAŞLANGIÇ-----------------------\\
  
         let yetkilicik = ayarlar.banyetkili;
         let knl = ayarlar.botkomut;
         let scháwn = args[0];
         let sebep = args.slice(1).join(' ') || "Sebep Belirtilmemiş";
         let guild = message.guild;
         let bankanal = ayarlar.banlog;

         if(!message.member.roles.cache.get(yetkilicik)) return message.reply(`**Bu Komutu Kullanabilmek İçin <@&${yetkilicik}> Yetkisine Sahip Olmak Zorundasın.**`)

         if(message.channel.id !== knl) return message.reply("**Bu Komutu Sadece Bot Komutta Kullanabilirsin!**")
  
         if(!scháwn) return message.reply("**Yasağını Kaldıracağın Kişinin ID'sini Yazarmısın?**")
         
         else {
         guild.members.unban(scháwn) // Kullanıcının banı kalktı 
          message.channel.send(new Discord.MessageEmbed()
            .setDescription(`${message.author} Tarafından \`${scháwn}\` adlı kişinin sunucudaki yasağı başarıyla kaldırıldı.`)
            .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
            .setFooter("schâwn ❤️ Pulsé")
            .setColor("0x348f36"))
            .then(x => x.delete({ timeout: 5000 }))
         }

         message.react("✅").then(() => {
         setTimeout(function () {

         message.delete()
         },5000);

         })
         
          const kaldırıldı = new Discord.MessageEmbed()
           .setAuthor(message.author.tag, message.author.avatarURL())
           .setColor("0x348f36")
           .setDescription(`
           
              Yasağı Kaldıran Yetkili » ${message.author} (\`${message.author.id}\`)
              Yasağı Kaldırılan Kullanıcı » (\`${scháwn}\`)
              Sebep » \`${sebep}\`
              Tarih » \`${moment(Date.now()).format("HH:mm:ss DD MMMM YYYY")}\`

            `)
           .setFooter("schâwn ❤️ Pulsé")
           .setTimestamp()
          
           client.channels.cache
           .get(bankanal)
           .send(kaldırıldı)  

  }

exports.conf = {
  enabled: true,
  aliases: ['unban'],
  guildOnly: false,
  permLevel: 0
};

exports.help = {
  name: 'unban',
  usage: 'unban'
};
  