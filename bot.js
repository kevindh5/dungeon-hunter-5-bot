const Discord = require("discord.js");
const bot  =new Discord.Client();
const commandsLead = ["!newGuerre", "!ng", "!delGuerre", "!dg", "!rebootGuerre", "!rebootStars","!rs"];
const commands = ["!aideGuerre",  "!rename", "!r"]
const guerre  = require("./module guerre");
const ROLE = "Leader"
const NOM_BOT = "Bot Lumière"

let emoji_react;

let lastWarMsg = {}

bot.login("NTY4NzE4NDM4NzQzMTQ2NDk2.XLmLwg.gcUQx1Atz0fvlqHxab5y0B3vyAA");

bot.on("ready", ()=>{
    bot.guilds.every(g => {
        lastWarMsg[g.name] = [];

       g.channels.every((channel) =>{
//           console.log(channel.name);
//           console.log(channel.type);
           if (channel.type !== "category"){
               lastWarMsg[g.name][channel.id] = []
           }
           return true;
       });
        return true
    })
    console.log('Le bot est près');
    console.log(lastWarMsg);
    emoji_react = bot.emojis.get("577222328895930368");
});

bot.on("message", (msg) => {
    console.log(msg.channel);
//    console.log(msg.channel.id)
    if(msg.member === null){//evite un bug quand le bot envoie des messages privés
        return false;
    }
    else if(msg.author.bot === true && msg.author.username === NOM_BOT){
        
       if(msg.content.startsWith("Cbl") || msg.content.startsWith(":information_source:") || msg.content.startsWith(":shield:") || msg.content.startsWith(":boom:") || msg.content.startsWith(":punch:") || msg.content.startsWith("!aideGuerre")){
           
           if(!msg.content.startsWith(":punch:") && !msg.content.startsWith("!aideGuerre")){//POur pas que ça fasse une reaction sur TABLEUA GUERRE et a !aideGuerre
               const reaction = (msg.guild.name === "Guilde Lumière") ? emoji_react : "🆓";
               msg.react(reaction);
           }
           
           
           lastWarMsg[msg.guild.name][msg.channel.id].unshift(msg);
       }
    }
    else if(msg.member.user.bot === false && msg.content[0] === "!" ){//on regarde que ce n'est pas un bot, que cela commence par ! pour signifié une commande
        
        const role = msg.member.roles.find(role => {return role.name === ROLE}); //on voit si il al erole leader
        
        if(role !== null && estCommandLead(msg.content) !== false){//on regarde si il a le role leader
            const command = commandsLead[estCommandLead(msg.content)]
            switch(command){
                    
                case "!newGuerre": if(lastWarMsg[msg.guild.name][msg.channel.id].length > 0){//on renitialise les LastWarMsg pour que la func delGuerre marche bien.
                                        lastWarMsg[msg.guild.name][msg.channel.id] = [];
                                    };
                                    guerre.newGuerre(msg, msg.content, "!newGuerre"); //pour que cela n'aye pas voir les commandes non-leader
                    break;
                    
                case "!ng": if(lastWarMsg[msg.guild.name][msg.channel.id].length > 0){//on renitialise les LastWarMsg pour que la func delGuerre marche bien.
                                        lastWarMsg[msg.guild.name][msg.channel.id] = [];
                                    };
                                     
                                    guerre.newGuerre(msg, msg.content, "!ng"); //pour que cela n'aye pas voir les commandes non-leader
                     
                    break;
                case "!dg": guerre.delGuerre(msg, lastWarMsg,"!dg");
                    break;
                case "!delGuerre": guerre.delGuerre(msg, lastWarMsg,"!delGuerre");
                    break;
                case "!rebootGuerre": guerre.rebootReact(msg, lastWarMsg, "tout");
                    break;
                case "!rebootStars" : guerre.rebootReact(msg, lastWarMsg, "etoile");
                    break;
                case "!rs": guerre.rebootReact(msg, lastWarMsg, "etoile");
                    break;
                default:
                    msg.reply("La commande donnée n'est pas bonne.");//ne sear jamais utilisée
            };
            
        }
        else if (estCommand(msg.content) !== false){
            const command = commands[estCommand(msg.content)]
            switch(command){
                case "!aideGuerre": guerre.aideGuerre(msg);
                    break;
                case "!rename": guerre.renname(msg, lastWarMsg, "!rename");
                    break;
                case "!r": guerre.renname(msg, lastWarMsg, "!r");
                    break;
                default:
                    msg.reply("La commande donnée n'est pas bonne.");  
                    
            }
        }
        else if(role === null && estCommandLead(msg.content) !== false){
            msg.reply("Cette commande est réservé au personne ayant le rôle "+ROLE+".");
        }
//        else{
//            const command = commands[estCommand(msg.content)]
//            switch(command){
//                case "!aideGuerre": guerre.aideGuerre(msg);
//                    break;
//                case "!rename": guerre.renname(msg, lastWarMsg);
//                    break;
//                default:
//                    msg.reply("La commande donnée n'est pas bonne.");
//            };
//        }
        
    };
    
    
    
    if(msg.system && msg.type === 'PINS_ADD'){// pour enlever les messages d'épinglage quand on fait une guerre doit être fait séprément car sinn cela rentre en opposition avec d'autre if
            msg.delete().catch(console.error);
    }
    
});


bot.on("guildMemberUpdate", (before, after) =>{
    const ancienRoles = before.roles.find(role => {return role.name === ROLE});// on voit si il avait le role leader 
    const nouveauRoles = after.roles.find(role => {return role.name === ROLE}); 
    
    if(ancienRoles !== nouveauRoles){
        if(ancienRoles === null && nouveauRoles !== null){
            longMsg(after, "welcome");
        }
        else if(ancienRoles !== null && nouveauRoles === null){
            longMsg(after, "good by");
        }
    };
});

bot.on("channelCreate", channel => {
       if (channel.type !== "category"){
            lastWarMsg[channel.guild.name][channel.id] = []
        }
});

bot.on("channelDelete", channel => {
        delete lastWarMsg[channel.guild.name][channel.id];
});













function indexAlphaBtic(string, list){
    const alphaB = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    const lenS = string.length;
    string = string.toLowerCase();// on met le nom en minuscule
    for(let i = 0; i< list.length; i++){
        const lenAutre = list[i].length;
        list[i] = list[i].toLowerCase()
        if(lenS > lenAutre){
            var len = lenAutre;
        }
        else{
            var len = lenS;
        }
        
        for(let e = 0; e < len; e++){
            if(alphaB.indexOf(string[e]) < alphaB.indexOf(list[i][e])){
                return i;
            }
            else if (alphaB.indexOf(string[e]) > alphaB.indexOf(list[i][e])){
                break;
            };  
        };
        
    };
    return list.length;
};



function estCommandLead(string){
    for(let i= 0; i < commandsLead.length; i++){
        if(string.indexOf(commandsLead[i]) === 0){
            return i;
        };
    };
    return false;
};

function estCommand(string){
    for(let i= 0; i < commands.length; i++){
        if(string.indexOf(commands[i]) === 0){
            return i;
        };
    };
    return false;
};

function longMsg(after, mode){
    if(mode === "welcome"){
        after.send("Vous êtes promu au rang de "+ROLE +" !!");
        after.send("Vous avez donc accès aux commandes qui permettent de contrôler le bot: "+NOM_BOT+" (moi)!");
        after.send("Pour l'instant il y a:");
        after.send("!newGuerre [nb de joueur ennemi], elle permet de créer un tableau pour gérer les attaques; ex: "+commandsLead[0]);
        after.send(".");
        after.send("!delGuerre [num de cible conservée], elle permet de supprimer un nombre de cibles; ex: delGuerre 10");
        after.send("si vous voulez complétement enlever la guerre (donc les infos sur l'armurie et la frénésie) vous pouvez faire '!delGuerre' sans aucun nombre");
        after.send(".");
        after.send("!rebootGuerre , elle permet d'enlever les reactions , recommencer une guerre sans forcément refaire le tableau");
        after.send(".");
        after.send("!rename [nb d'une cible] : [nouveau nom] , permet de changer le nom d'une cible ex: ex !rename 12 : Raph");
        after.send(".");
        after.send("Quelques commandes ont des abrévations car elles sont souvent utilisées, pour les plus doués d'entre vous elles serviront.");
        after.send('Par conséquent:');
        after.send("!newGuerre === !ng")
        after.send("!deleteGuerre === !dg")
        after.send("!rename === !r")
    }
    else{
        after.send("Vous êtes destitué du role de "+ROLE+" ,vous n'avez plus accès aux commandes pour me contrôler.").catch(console.error);
    };
};
