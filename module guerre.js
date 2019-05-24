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
                
                
                msg.channel.send(":information_source: Leader   //   Stratégie");
                msg.channel.send(":shield: Préparation Frénésie, raids armurerie 1 à 9");
                msg.channel.send(":boom: Dclcht Frénésie, raids armurie 10 à 12");
                
                
                for(let i = 0; i < num; i++){
                    
                    let reponse = "Cbl "+(i+1)+": :star::star::star:"
                    msg.channel.send(reponse);
                }
                
                
                msg.channel.send("!aideGuerre pour l'utilisation du tableau.");
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
    const index = "!delGuerre"
    if(index === msg.content){
       msg.reply("Il manque l'argument signifiant jusqu'a où vous voulez enlever de cibles: !delGuerre 15 .") 
    }
    else if(msg.content[index.length] !== " "){
        msg.reply("Il doit avoir un espace entre la commande et le numéro, exemple: !delGuerre 25, ou !delGuerre 15 .") 
    }
    else if(msg.content.length > index.length+1){//permet de voir si il ya plus apres que simplement la commande  car on compte l'espace
        const num = parseInt(msg.content.substr(index.length+1));
        data = data[msg.guild.name];

        
        
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
            console.log(data.length)
            if(data.length < num){
                msg.reply("Le nombre doit être au moins égale au nombre max de cibles")
            }
            else{
                console.log("cc")
                for(let i = 0; i < data.length; i++){
                    console.log(data.length-3-i);
                    if( data.length-3-i > num){  //-3 car on enleve les 3 msg (frenésie, declenchemnt, armurie)
                        console.log("ok")
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
    
};

aideCommande = msg => {
   msg.channel.send("commande en cour de construction");
   
};


exports.newGuerre = newGuerre;
exports.delGuerre = delGuerre;
exports.aideGuerre = aideGuerre;
exports.aideCommande = aideCommande;