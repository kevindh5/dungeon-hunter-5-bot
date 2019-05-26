const fs = require('fs');
const Discord = require("discord.js");
//const emoji  =new Emoji();

newGuerre = (msg, string) =>{// string correspond a msg.content
    const index = "!newGuerre";
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
                
                msg.channel.send(":punch:_________TABLEAU DE GUERRE_________:punch:").then(m =>{m.pin();});
                msg.channel.send("!aideGuerre pour l'utilisation du tableau.");
                msg.channel.send(":information_source: Leader   //   Stratégie");
                msg.channel.send(":shield: raids armurerie 1 à 3");
                msg.channel.send(":shield: raids armurerie 4 à 6");
                msg.channel.send(":shield: raids armurerie 7 à 9");
                msg.channel.send(":boom: Déclenchement Frénésie, 10 à 12");
                
                
                for(let i = 0; i < num; i++){
                    
                    let reponse = "Cbl "+(i+1)+": :star::star::star:"
                    msg.channel.send(reponse);
                }
            
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

delGuerre = (msg, data) =>{
//    console.log(data[msg.guild.name].length);
    const index = "!delGuerre";
    data = data[msg.guild.name];
    if(data.length < 1){
        msg.reply("Vous devez d'abord creer une guerre.")
    }
    else if(index === msg.content){
        
        for(let i = 0; i < data.length; i++){
            data[i].delete().catch(console.error);
        };
        msg.channel.send("Suppression total de la guerre.");
        return [] 
    }
    else if(msg.content[index.length] !== " "){
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
        else if (data.length === 0){
            msg.reply("Vous n'avez pas lancée de guerre, la commande est donc inutile");
        }
        else if (num > 30){
            msg.reply("Le nombre doit être inférieur à 30")
        }
        else{
            if(data.length < num){
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

rebootGuerre = (msg, data) =>{
    data = data[msg.guild.name]
    if(data.length < 1){
        msg.reply("Vous devez avoir lancé une guerre pour la réinitailisée")
    }
    else{
        for(let i = 0 ; i < data.length; i++){

            message = msg.channel.messages.get(data[i].id)
            react_msg = message.reactions
            react_msg.every(r => {
            if(!r.me){
                users = r.fetchUsers().then(users => {

                    users.every(user => {
                        r.remove(user)
                    });
                })
            }
            return true
            });
        }

    }
}


exports.newGuerre = newGuerre;
exports.delGuerre = delGuerre;
exports.aideGuerre = aideGuerre;
exports.aideCommande = aideCommande;
exports.rebootGuerre = rebootGuerre;