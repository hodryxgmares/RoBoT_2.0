var Discord = require('discord.js');

exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission('BAN_MEMBERS')) return msg.reply('You can\'t use that!');

    var user = msg.mentions.users.first();
    if(!user) return msg.reply('Tu doit mentionner un utilisateur !');

    var member;

    try {
        member = await msg.guild.members.fetch(user);
    } catch(err) {
        member = null;
    }

    if(member){
        if(member.hasPermission('MANAGE_MESSAGES')) return msg.reply('Je ne peut pas ban cette utilisateur  !');
    }

    var reason = args.splice(1).join(' ');
    if(!reason) return msg.reply('Tu n\'a pas dit la raison !');

    var channel = msg.guild.channels.cache.find(c => c.name === 'logs');

    var log = new Discord.MessageEmbed()
    .setTitle('Utilisateur ban ')
    .addField('Utilisateur :', user, true)
    .addField('Par:', msg.author, true)
    .addField('La raison :', reason)
    .setColor("#d54e12")
    channel.send(log);

    var msg = new Discord.MessageEmbed()
    .setTitle('tu a été ban pour la raison suivant : ')
    .setDescription(reason);

    try {
        await user.send(msg);
    } catch(err) {
        console.warn(err);
    }

    msg.guild.members.ban(user); // This should not be user.id like I said in my video. I made a mistake. Sorry! :)

    msg.channel.send(`**${user}** has been banned by **${msg.author}**!`);
}