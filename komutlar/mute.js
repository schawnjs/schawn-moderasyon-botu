const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const ms = require("ms");

exports.run = async (client, message, args) => {

    let yetkilicik = ayarlar.mutehammer;
    let mutekanal = ayarlar.mutelog;

    if(!message.member.roles.cache.get("847578556439724044") && !message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu Komutu Kullanabilmek İçin <@&${yetkilicik}> Yetkisine Sahip Olmak Zorundasın.`)

    const muterolab = message.guild.roles.cache.find(m => m.id === (ayarlar.muterol)) // mute rolü ID

    let kullanici = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if(!kullanici) return message.reply("Susturcağın Kullanıcıyı Belirtirmisin?")

    let mutecm = message.mentions.users.first() || message.guild.members.cache.find(r => r.id === args[0]);

    if(!mutecm) { return message.reply("Susturcağın Kişiyi Belirtirmisin?") }

    let sebep = args[2];

    if(!sebep) { return message.reply("Susturma Sebebini Belirtirmisin?") }

    let zaman = args[1]
   .replace("sn", "s")
   .replace("dk", "m")
   .replace("sa", "h")
   .replace("gün", "d");

    if(!zaman) { return message.reply("Bir Zaman Dilimi Girermisin? \`.mute @schawn 5m\`") }

    let zamaniste = zaman
    .replace("m", " dakika")
    .replace("s", " saniye")
    .replace("h", " saat")
    .replace("d", " gün");
  
    message.react("<a:schawntik:834484844876398622>")
   
    // yazılan kanala gönderir
    message.channel.send(new Discord.MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    .setDescription(`${message.author} Tarafından ${kullanici} adlı kişi sunucudan **${sebep}** sebebi ile **${zamaniste}** kadar chat kanallarında susturuldu.`)
    .setFooter("schâwn ❤️ Lawertz")
    .setColor("0x348f36"))
    .then(x => x.delete({ timeout: 5000 }))

    // mute loga gönderilir
    mutekanal.send(new Discord.MessageEmbed()
   .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true}))
   .setDescription(`

    Susturan Yetkili » ${message.author} (\`${message.author.id}\`)
    Susturuldu Kullanıcı » ${kullanici} (\`${kullanici.id}\`)
    Sebep » \`${sebep}\`
    Süre » \`${zamaniste}\`


      `))
     .setFooter("schâwn ❤️ Lawertz")
     .setTimestamp()

    mutecm.roles.add(muterolab) // kullanıcı susturuldu
    message.react("<a:schawntik:834484844876398622>")
 
    setTimeout(async function () {
    mutecm.roles.remove(muterolab) // kullanıcının susturulması kaldırıldı
    
    mutekanal.send(new Discord.MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    .setDescription(`
    
    **__Kullanıcının Metin Kanallarındaki Susturulması Bitti!__**

    Kullanıcı » ${kullanici} (\`${kullanici.id}\`)
    Süre » \`${ms(zaman)}\`    
    
    `))
    .setColor("GREEN")
    .setFooter("schâwn ❤️ Lawertz")
    }); 
}

exports.conf = {
    enabled: true,
    aliases: ['mute', "sustur"],
    guildOnly: false,
    permLevel: 0
  };
  
  exports.help = {
    name: 'mute',
    usage: 'mute'
  };