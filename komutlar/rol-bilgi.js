const Discord = require("discord.js");

exports.run = async (client, message, args) => {

 if(!message.member.hasPermission("ADMINISTRATOR")) return;

 let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);

 if(!rol) return message.reply("Rol Etiketle.")

 let lawertz = new Array();
 let kisiler = rol.members.forEach(schawn => { lawertz.push(`${schawn} - (\`${schawn.id}\`)`) }) // ${schawn} Kişinin adı ${schawn.id} Kişinin ID'si

 const embed = new Discord.MessageEmbed()
 .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
 .setDescription(`
 
 **Rol Bilgileri Aşağıda Belirtilmiştir.**

 \`•\` Rol Adı: ${rol}
 \`•\` Rol ID: (\`${rol.id}\`)
 \`•\` Rol Renk Kodu: \`${rol.hexColor}\`
 \`•\` Roldeki Üye Sayısı: \`${rol.members.size}\`
 
─────────────────────────

\`•\` Roldeki Üyeler: 
${rol.members.size ? lawertz.join("\n") : `Listelenemedi. \`${rol.members.size}\` kişi var.`}
 `)
 .setFooter("schâwn ❤️ Lawertz")

 return message.channel.send(embed)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["rol", "rol-bilgi", "rolbilgi"],
  permLevel: 0
}

exports.help = {
  name: "rol-bilgi",
  usage: "rol-bilgi"
}  