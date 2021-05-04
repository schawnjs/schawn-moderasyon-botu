const Discord = require("discord.js"); // scháwn 
const client = new Discord.Client(); 
const ayarlar = require("./ayarlar.json"); 
const chalk = require("chalk"); 
const moment = require("moment"); 
var Jimp = require("jimp"); 
const { Client, Util } = require("discord.js"); 
const fs = require("fs"); 
const db = require("quick.db");
const express = require("express");   
require("./util/eventLoader.js")(client); // scháwn 
const path = require("path"); 
const snekfetch = require("snekfetch");  
const ms = require("ms"); 
const tags = require("common-tags");

var prefix = ayarlar.prefix;  // scháwn 

const log = message => {
  
  console.log(`${message}`); 
};

client.commands = new Discord.Collection(); 
client.aliases = new Discord.Collection(); 
fs.readdir("./komutlar/", (err, files) => { // scháwn 
  
  if (err) console.error(err); 
  
  log(` ${files.length} Botun komutları yüklenecek...`); 
  files.forEach(f => {
    
    let props = require(`./komutlar/${f}`);  // scháwn 
    log(`[KOMUT] | ${props.help.name} Eklendi.`); 
    client.commands.set(props.help.name, props); 
    props.conf.aliases.forEach(alias => {
      
      client.aliases.set(alias, props.help.name); 
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => { // scháwn 
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name); // scháwn 
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => { // scháwn 
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`); // scháwn 
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)]; // scháwn 
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias); // scháwn 
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }

  let permlvl = 0; // scháwn 
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted"))); // scháwn 
});
client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

//------------------------------------------------------ÜSTE-ELLEMENE-GEREK-YOK-----------------------------------------------------\\

//------------------------------------------------------TAG-----------------------------------------------------\\

client.on("message", message => {
  let tagla = ayarlar.tag;
  if(message.content.toLowerCase() === "tag")
   return message.channel.send(`\`${tagla}\``)
});

client.on("message", message => {
  let tagla = ayarlar.tag;
  if(message.content.toLowerCase() === ".tag")
   return message.channel.send(`\`${tagla}\``)
});

client.on("message", message => {
  let tagla = ayarlar.tag;
  if(message.content.toLowerCase() === "!tag")
   return message.channel.send(`\`${tagla}\``)
});

//------------------------------------------------------TAG--------------------------------------------------------\\

  //--------------------------------------------------------MESSAGE-LOG--------------------------------------------------------\\

 client.on("messageDelete", (message) => {

  if(message.author.bot) return;

   let scháwn = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
    .setColor("#ff000")
    .setDescription(`
     
      **Mesajı Silen Kişi**
     > <@${message.author.id}>
      **Silinen Mesaj**
     > ${message.content}
     **Mesajın Silindiği Kanal**
     > ${message.channel}
     **Mesajın Silindiği Kanal ID**
     > (\`${message.channel.id}\`)
     
    `)
    .setTimestamp()
    .setThumbnail(message.author.avatarURL({ dynamic: true }))
    .setFooter("schâwn ❤️ Pulsé")

    client.channels.cache
    .get(ayarlar.messagelog)
    .send(scháwn)
})

client.on("messageUpdate", (eskiMsj, yeniMsj) => {

  if(yeniMsj.author.bot) return;

   let scháwn = new Discord.MessageEmbed()
    .setAuthor(yeniMsj.author.tag, yeniMsj.author.avatarURL({ dynamic: true }))
    .setColor("#ff000")
    .setDescription(`
     
      **Mesajı Sahibi**
     > <@${yeniMsj.author.id}>
      **Mesaj Linki**
     > [Tıkla](${yeniMsj.url})
      **Eski Mesaj**
     > ${eskiMsj.content}
      **Yeni Mesaj**
     > ${yeniMsj.content}
     **Mesajın Düzenlendiği Kanal**
     > ${yeniMsj.channel}
     **Mesajın Düzenlendiği Kanal ID**
     > (\`${yeniMsj.channel.id}\`)
     
    `)
    .setTimestamp()
    .setThumbnail(yeniMsj.author.avatarURL({ dynamic: true }))
    .setFooter("schâwn ❤️ Pulsé")

    client.channels.cache
    .get(ayarlar.messagelog)
    .send(scháwn)
})  

  //--------------------------------------------------------MESSAGE-LOG------------------------------------------------------\\


  //------------------------------------------------------AFK------------------------------------------------------\\

client.on("message" , async message => {
  
  if(!message.guild) return;
  if(message.content.startsWith(ayarlar.prefix+"afk")) return;
  
  let afk = message.mentions.users.first()
  
  const scháwn = db.fetch(`afkid_${message.author.id}_${message.guild.id}`)
  const Başet = db.fetch(`afkAd_${message.author.id}_${message.guild.id}`)

 if(afk){
   const sebep = db.fetch(`afkSebep_${afk.id}_${message.guild.id}`)
   const scháwn3 = db.fetch(`afkid_${afk.id}_${message.guild.id}`)
      if(message.content.includes(scháwn3)){

       message.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription(`<@` + message.author.id + `> Etiketlediğiniz Kişi Afk \nSebep: **${sebep}**`))
   }
 }
  if(message.author.id === scháwn){

message.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription(`<@${scháwn}> Başarıyla Afk Modundan Çıktınız`))

   db.delete(`afkSebep_${message.author.id}_${message.guild.id}`)
   db.delete(`afkid_${message.author.id}_${message.guild.id}`)
   db.delete(`afkAd_${message.author.id}_${message.guild.id}`)

     message.member.setNickname(Başet)   
  }
});

 //------------------------------------------------------AFK------------------------------------------------------\\

//------------------------------------------------------BOTU-SESE-SOKMA------------------------------------------------------\\

client.on("ready", function () {
   const sesegircm = ayarlar.botses;
    client.channels.cache
    .get(sesegircm)
    .join()
    .catch(err => {
      throw err; 
   });
});

//------------------------------------------------------BOTU-SESE-SOKMA------------------------------------------------------\\

//------------------------------------------------------SA-AS------------------------------------------------------\\

   client.on("message", async message => {
    let scháwn = await db.fetch(`saas_${message.guild.id}`)
      if(scháwn === "acik") {

        if(message.content.toLowerCase() === "sa") {
        return message.reply("**Aleyküm Selam Hoşgeldin!**")
       }
        if(message.content.toLowerCase() === "selam") {
        return message.reply("**Aleyküm Selam Hoşgeldin!**")
       }
       if(message.content.toLowerCase() === "slm") {
        return message.reply("**Aleyküm Selam Hoşgeldin!**")
       }
       if(message.content.toLowerCase() === "selamun aleyküm") {
        return message.reply("**Aleyküm Selam Hoşgeldin!**")
       } 
       if(message.content.toLowerCase() === "sea") {
        return message.reply("**Aleyküm Selam Hoşgeldin!**")
       }
       if(message.content.toLowerCase() === "s.a") {
        return message.reply("**Aleyküm Selam Hoşgeldin!**")
       }
      }
   });
  
//------------------------------------------------------SA-AS------------------------------------------------------\\

//------------------------------------------------------CAPS-KORUMA------------------------------------------------------\\
  
    client.on("message", async message => {
       
          if(message.content.length > 3) {
          if(db.fetch(`capscik_${message.guild.id}`)) {

            let schawn = message.content.toUpperCase();
            if(message.content == schawn) {

              if(!message.member.hasPermission("ADMINISTRATOR")) {
                                   
                  message.delete();

                  return message.channel.send(`**Bu Sunucuda Büyük Harf Kullanmak Yasaktır!**`)
                   .then(x => x.delete({ timeout: 5000 }))
              }
            }
          }
        }
      });

//------------------------------------------------------CAPS-KORUMA------------------------------------------------------\\

//------------------------------------------------------REKLAM-ENGEL------------------------------------------------------\\

client.on("message", async message => {
   let reklm = await db.fetch(`rklm_${message.guild.id}`)
   if(reklm == "acik") {

   const reklamab = [
    ".com",
    ".net",
    ".xyz",
    ".tk",
    ".pw",
    ".io",
    ".me",
    ".gg",
    "www.",
    "https",
    "http",
    ".gl",
    ".org",
    ".com.tr",
    ".biz",
    "net",
    ".rf.gd",
    ".az",
    ".party",
    "discord.gg"
   ];

   if(reklamab.some(word => message.content.toLowerCase().includes(word))) {
    try {

      if(!message.member.hasPermission("ADMINISTRATOR")) {
      message.delete()
        
        return message.channel.send(`**Bu Sunucuda Reklam Yapmak Yasaktır!**`)
         .then(x => x.delete({ timeout: 5000 }))
         
      }
    } catch (err) {
      console.log(err)
    }
   }
  }
if(!reklm) return;
})

//------------------------------------------------------REKLAM-ENGEL------------------------------------------------------\\

//------------------------------------------------------KÜFÜR-ENGEL------------------------------------------------------\\

client.on("message", async message => {
   let küfr = await db.fetch(`kfr_${message.guild.id}`)
   if(küfr == "acik") {

   const küfürab = ["orospu", "amık", "Oç", "0ç", "yavşak", "y3a3rram", "a.m.k", "A.M.K", "or1spu", "anan1 s1k1m", "orospu evladı", "ananı sikim", "anneni sikim", "anneni sikeyim", "ananı sikeyim", "ağzına sıçim", "ağzına sıçayım", "ağzına s", "ambiti", "amını", "amını s", "amcık", "amcik", "amcığını", "amciğini", "amcığını", "amcığını s", "amck", "amckskm", "amcuk", "amına", "amına k", "amınakoyim", "amına s", "amunu", "amını", "amın oğlu", "amın o", "amınoğlu", "amnskm", "anaskm", "ananskm", "amkafa", "amk çocuğu", "amk oç", "piç", "amk ç", "amcıklar", "amq", "amındaki", "amnskm", "ananı", "ananın am", "ananızın", "aneni", "aneni s", "annen", "anen", "ananın dölü", "sperm", "döl", "anasının am", "anası orospu", "orospu", "orosp,", "kahpe", "kahbe", "kahße", "ayklarmalrmsikerim", "ananı avradını", "avrat", "avradını", "avradını s", "babanı", "babanı s", "babanın amk", "annenin amk", "ananın amk", "bacını s", "babası pezevenk", "pezevenk", "pezeveng", "kaşar", "bitch", "yarrak", "cibiliyetini", "bokbok", "bombok", "dallama", "götünü s", "ebenin", "ebeni", "ecdadını", "gavat", "gavad", "ebeni", "fahişe", "sürtük", "fuck", "gotten", "götten", "göt", "gtveren", "gttn", "gtnde", "gtn", "hassiktir", "hasiktir", "hsktr", "haysiyetsiz", "ibne", "ibine", "ipne", "kaltık", "kancık", "kevaşe", "kevase", "kodumun", "orosbu", "fucker", "penis", "porno", "sikiş", "s1kerim", "puşt", "sakso", "skcm", "siktir", "sktr", "skecem", "skeym", "slaleni", "sokam", "sokuş", "sokarım", "sokarm", "sokaym", "şerefsiz", "şrfsz", "sürtük", "taşak", "taşşak", "tasak", "tipini s", "yarram", "yararmorospunun", "yarramın başı", "yarramınbaşı", "yarraminbasi", "yrrk", "zikeyim", "zikik", "zkym", "amk", "mk", "oç"];

   if(küfürab.some(word => message.content.toLowerCase().includes(word))) {
    try {

      if(!message.member.hasPermission("ADMINISTRATOR")) {
      message.delete()
        
        return message.channel.send(`**Bu Sunucuda Küfür Etmek Yasaktır!**`)
         .then(x => x.delete({ timeout: 5000 }))
         
      }
    } catch (err) {
      console.log(err)
    }
   }
  }
if(!küfr) return;
})

//------------------------------------------------------KÜFÜR-ENGEL------------------------------------------------------\\

//------------------------------------------------------EVER-HERE-ENGEL------------------------------------------------------\\

client.on("message", async message => {

  let e = await db.fetch(`evr_${message.guild.id}`)
  if(e == "acik") {
 
  try {

    const everab = ["@everyone", "@here"];

    if(everab.some(word => message.content.toLowerCase().includes(word))) {

    if(!message.member.hasPermission("ADMINISTRATOR")) { 

      message.delete(); 

       return message.channel.send(`**Bu Sunucuda \`Ever\` Veya \`Here\` Atmak Yasaktır!**`)
      } 
    }
  } catch (err) {
    console.log(err)
   }
  }
  if(!e) return;
 });

//------------------------------------------------------EVER-HERE-ENGEL------------------------------------------------------\\

//------------------------------------------------------GELEN-GİDEN------------------------------------------------------\\

client.on("guildMemberAdd", member => {

  let hosgldn = client.channels.cache.find(c => c.id === "HOSGELDİN-BB KANAL ID")

    hosgldn.send(`**${member} Aramıza Katıldı.**`)
});

client.on("guildMemberRemove", member => {

  let sktrgt = client.channels.cache.find(c => c.id === "HOSGELDİN-BB KANAL ID")

   sktrgt.send(`**${member} Aramızdan Ayrıldı.**`)
});

//------------------------------------------------------GELEN-GİDEN------------------------------------------------------\\

//------------------------------------------------------MOD-LOG-------------------------------------------------------\\

// KANAL OLUŞTURMA
client.on("channelCreate", async channel => {

  let kanal = new Discord.MessageEmbed()
   .setColor("#e6ff00")
   .setDescription(`
     **__Sunucuda Bir Kanal Oluşturuldu!__**
   
     Oluşturulan Kanal: **${channel.name}**
     Kanal ID: (\`${channel.id}\`)

   `)
   .setTimestamp()
   .setFooter("schâwn | Mod-log Sistemi.")
  
   client.channels.cache
   .get(ayarlar.modlog)
   .send(kanal)
  
  }) 
  
  // KANAL SİLME
  client.on("channelDelete", async channel => {

   let kanal = new Discord.MessageEmbed()
   .setColor("#e6ff00")
   .setDescription(`
     **__Sunucuda Bir Kanal Silindi!__**

     Silinen Kanal: **${channel.name}**
     Kanal ID: (\`${channel.id}\`)

   `) 
   .setTimestamp()
   .setFooter("schâwn | Mod-log Sistemi.")

   client.channels.cache
   .get(ayarlar.modlog)
   .send(kanal)

  })

  // ROL SİLME
  client.on("roleDelete", async role => {

  let rol = new Discord.MessageEmbed()
   .setColor("#ffffff")
   .setDescription(`
     **__Sunucuda Bir Rol Silindi!__**

     Silinen Rol: **${role.name}**
     Rol ID: (\`${rol.id}\`)

   `)
   .setTimestamp()
   .setFooter("schâwn | Mod-log Sistemi.")

   client.channels.cache
   .get(ayarlar.modlog)
   .send(rol)

  })

  // ROL OLUŞTURMA
  client.on("roleCreate", async role => {

   let rol = new Discord.MessageEmbed()
    .setColor("#ffffff")
    .setDescription(`
     **__Sunucuda Bir Rol Oluşturuldu!__**

     Oluşturulan Rol: **${role.name}**

    `)
    .setTimestamp()
    .setFooter("schâwn | Mod-log Sistemi.")

    client.channels.cache
    .get(ayarlar.modlog)
    .send(rol)
  })
  
  //------------------------------------------------------MOD-LOG-------------------------------------------------------\\

client.login(process.env.token); 

// güle güle kullanın la muah
