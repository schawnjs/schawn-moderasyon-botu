const Discord = require("discord.js");
const datab = require("quick.db");

exports.run = async (client, message, args) => {

    if(message.author.bot) return;

    const userrr = await datab.fetch(`snipe_id_${message.guild.id}`) // mesajı silen kişi
    const silinmisab = await datab.fetch(`snipe_mesaj_${message.guild.id}`) // silinen mesaj

    let schawnkisi = client.users.cache.get(userrr)

    const sıjı31 = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setDescription(`
    
    Mesajı Silen Kişi
    ${schawnkisi} - (\`${schawnkisi.id}\`)

    Silinen Mesaj: 
    **${silinmisab}**

    `)
    .setThumbnail(schawnkisi.avatarURL({ dynamic: true }))
     message.channel.send(sıjı31)
     .then(x => x.delete({ timeout: 5000 }));
     setTimeout(() => {
         message.delete()
     }, 5000);
 }

exports.conf = {
    enabled:true,
    guildOnly: false,
    aliases: ["snipe"],
    permLevel: 0,
}
exports.help = {
  name: "snipe",
  description: 'Silinen Son Mesajı Gösterir.',
  usage: 'snipe'
} 