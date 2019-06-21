const fs = require('fs');
const Discord = require("discord.js");
//const emoji  =new Emoji();

newGuerre = (msg, string, nom_utilisé) =>{// string correspond a msg.content
    
    const index = nom_utilisé;
    if(index === string){
       msg.reply("Il manque l'argument signifiant le nombre de joueur adverse comme: !newGuerre 15 .") 
    }
    else if(string[index.length] !== " "){
        msg.reply("Il doit avoir un espace entre la commande et le numéro, exemple: !newGuerre 30, ou !newGuerre 15 .") 
    }
    else if(string.length > index.length+1){//permet de voir si il ya plus apres que simplement la commande  car on compte l'espace
        string = string.substr(index.length+1);
        const num = parseInt(string);
        if(isNaN(num)){
            msg.reply("L'argument doit être un nombre, exemple: ou !newGuerre 15 .");
        }
        else{
            
            if(num < 31){
                const jaune = ":star:"
                const vert = (msg.guild.name === "Guilde Lumière") ? msg.guild.emojis.get('573106067777650689') : ":green_apple:";
                const bleu = (msg.guild.name === 'Guilde Lumière') ? msg.guild.emojis.get('573115452511879168') : ":droplet: "
                
                msg.channel.send(":punch:_________TABLEAU DE GUERRE_________:punch:");//.then(m =>{m.pin();});
                msg.channel.send("!aideGuerre pour l'utilisation du tableau.");
                msg.channel.send(":information_source: Leader   //   Stratégie");
                msg.channel.send(":shield: raids armurerie 1 à 3");
                msg.channel.send(":shield: raids armurerie 4 à 6");
                msg.channel.send(":shield: raids armurerie 7 à 9");
                msg.channel.send(":boom: Déclenchement Frénésie, 10 à 12");
                 console.log("Guerre cree dans "+ msg.guild.name);
                
                
                
                for(let i = 0; i < num; i++){
                    
                    const num = (i+1 < 10) ? "0"+(i+1) : i+1
                    
                    const reponse = "Cbl "+ num +": "+jaune+vert+bleu;
                    msg.channel.send(reponse);
                };
                
    
            
//                msg.guild.members.every(members => {// on envoie un message d'alerte pour tout les membres 
//
//                    if(members.user.username === author){
//                        members.send("Une guerre a commencé !!!");
//                    };
//
//                    return true
//                });
                
            }
            else{
                msg.reply("Le nombre de joueurs ennemis doit être inferieur à 31.")
            };
              
            
        };
    };
};

delGuerre = (msg, data, nom_utilisé) =>{
//    console.log(data[msg.guild.name].length);
    const index = nom_utilisé;
    data = data[msg.guild.name][msg.channel.id];
    
    if(data.length < 1){//s i on a activée une guerre 
        msg.reply("Vous n'avez pas lancée de guerre, la commande est donc inutile.")
    }
    else if(index === msg.content){//si on a écrit la commande seulement
        
        for(let i = 0; i < data.length; i++){
            data[i].delete().catch(console.error);
        };
        msg.channel.send("Suppression total de la guerre.");
        return [] 
    }
    else if(msg.content[index.length] !== " "){//si il n'y a pas l'espace
        msg.reply("Il doit avoir un espace entre la commande et le numéro, exemple: !delGuerre 25, ou !delGuerre 15 .") 
    }
    else if(msg.content.length > index.length+1){//permet de voir si il ya plus apres que simplement la commande  car on compte l'espace
        const num = parseInt(msg.content.substr(index.length+1));

        
        
        if(isNaN(num)){
            msg.reply("L'argument doit être un nombre, exemple: ou !delGuerre 15 .");
        }
        else if(num < 0){
            msg.reply("Le nombre doit être positif");    
        }
        else if(num > data.length - 7 ){
            msg.reply("Le nombre doit être inférieur à " + (data.length - 7) +".")
        }
        else{
            console.log(data.length);
            if(data.length < num){ //-7 car on enleve les 7 msg d'informations au début
                msg.reply("Le nombre doit être au moins égale au nombre max de cibles")
            }
            else{
                for(let i = 0; i < data.length; i++){
                    if( data.length-7-i > num){  //-7 car on enleve les 7 msg d'informations au début
                        data[i].delete().catch(console.error);
                    }   
                    else{
                        break
                    }
                }
            }
        }
        
    }
   
}



aideGuerre = msg =>{
    msg.member.send("Le tableau est constitué de lignes représentant chaque joueur ennemi.");
    msg.member.send("Pour indiquer que vous attaquez, vous devez ajouter des émojis en réaction en dessus de la ligne où est nommée la cible.");
    msg.member.send("Vous commencez par mettre l'émoji correspondant à votre avatar puis les émojies correspondant aux cibles que vous attaquez.");
    msg.member.send("Les émojies indiquant les cibles que vous attaquez son des chiffres sur fond coloré.");
    msg.member.send("Chaque couleur correspond à une cible et le chiffre correspond au numero d'ordre de l'étoile");
    msg.member.send("Ces emojis s'inserent en dessous de la ligne de ou des cibles. Il suffit de toucher (ou cliquer pour un ordinateur) l'émoji pour le retirer en cas de défaite.");
    msg.membrer.send("ATTENTION cette explication est por le tableau à 3 cibles, pas pour celui à une cible par ligne.")
    
};

aideCommande = msg => {
   msg.channel.send("commande en cour de construction");
   
};

rebootReact = (msg, data, type) =>{
    //si type corresponde à tout alors on supprimme toutes les reactions
    //si type === etoile alors on supprimme seulement les reactions qui sont dessous les messages de cibles
    console.log("commande rs activé")
    data = data[msg.guild.name][msg.channel.id]
    console.log(data);
    type_de_la_fonction = (type === 'tout') ? 0 : 7;  //7 correspond aux 7 messages d'infos en debut de guerre

    if(data.length < 1){
        msg.reply("Vous devez avoir lancé une guerre pour la réinitailisée")
    }
    else{
        for(let i = 0 ; i < data.length - type_de_la_fonction; i++){
            message = msg.channel.messages.get(data[i].id)
//            console.log(' ');
//            console.log(' ');
//            console.log(' ');
//            console.log(' ');
//            console.log(' ');
//            console.log(' ');
//            console.log(message);
            
            react_msg = message.reactions
            react_msg.every(r => {
            if(!r.me){
//                console.log(message.content);
                users = r.fetchUsers().then(users => {

                    users.every(user => {
                        r.remove(user).catch(console.error);
                    });
                })
            }
            return true
            });
        };

    };
};

rename = (msg, data, nom_utilisé) => {
    const nom_commande = nom_utilisé;
    data = data[msg.guild.name][msg.channel.id];
    
    console.log(msg.content[nom_commande.length])
    
    if(data.length < 1){
        msg.reply("Vous devez créer une guerre pour ensuite changer le nom d'une cible.");    
    }
    else if(msg.content === nom_commande){
        msg.reply('Il manque la cible et le joueur à changer')
    }
    else if(msg.content[nom_commande.length] !== " "){
       msg.reply('Il manque un espace entre la commande et la cible');     
    }
    else{
        let indexMid;//represente l'index du : ou /  ou >
        
        for(let i = nom_commande.length; i< msg.content.length; i++){
            
            if(msg.content[i] === ":" || msg.content[i] ==="=" || msg.content[i] ==="/" || msg.content[i] ===">"){
                indexMid = i;
            }
        }

        let num_cbl = msg.content.substr(nom_commande.length+1, (indexMid - (nom_commande.length+1)));
        const nom_newcbl = msg.content.substr(indexMid+1);
        
        if(isNaN(num_cbl)){
            msg.reply("Vous devez mettre un nombre puis : et ensuite le nom de cette cible. ex: !rename 12 : Pedro");
        }
        else if(nom_newcbl === ""){
            msg.reply("Vous devez ajouter un nombre à cette cible.");
        }
        else{
            num_cbl = parseInt(num_cbl);
            
            const cible_total = data.length - 7 //7 étant le nombre d'info au début du tableau
            
            const new_msg_index = cible_total - num_cbl
            
            if( typeof data[new_msg_index] === "undefined"){
                msg.reply("La cible demandée n'existe pas.")
            }
            else{
                
                const new_msg = data[new_msg_index].content.substr(0,6) +" "+ nom_newcbl + " " + data[new_msg_index].content.substr(6);

                data[new_msg_index].edit(new_msg).catch(console.error);

            }
        
        }
         
    }
    
}

frenesie = msg =>{
    msg.channel.send("https://cdn.discordapp.com/attachments/563858405073223701/581896877591625745/frene2.jpg");
};


exports.newGuerre = newGuerre;
exports.delGuerre = delGuerre;
exports.aideGuerre = aideGuerre;
exports.aideCommande = aideCommande;
exports.rebootReact = rebootReact;
exports.renname = rename;
exports.frenesie = frenesie;