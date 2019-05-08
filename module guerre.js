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
                const author = msg.author.username;
                let vert = msg.guild.emojis.get('573106067777650689');
                let bleu = msg.guild.emojis.get('573115452511879168');
                if(vert === undefined){
                    vert = ":green_apple:" 
                };
                if(bleu === undefined){
                    bleu = ':droplet:'
                };
                
                msg.channel.send(":information_source: Leader   //   Stratégie");
                msg.channel.send(":information_source: Préparation Frénésie, raid armurie 1 à 9");
                msg.channel.send(":information_source: Déclenchement de la Frénésie, rai armurie 10 à12");
                
                
                for(let i = 0; i < parseInt(num/3); i++){
                    let c1 = (3*i+1);
                    let c2 = (3*i+2);
                    let c3 = (3*i+3)
                    if(c1 < 10){//pour que se soit plus hestetique
                        c1 = "0"+c1
                    };
                    if(c2 < 10){
                        c2 = "0"+c2
                    };
                    if(c3 < 10){
                        c3 = "0"+c3
                    };
                    
                    
                    let reponse = "Cbl "+c1+": :star::star::star: Cbl "+c2+": "+vert.toString()+vert.toString()+vert.toString()+" Cbl "+c3+": "+ bleu.toString()+bleu.toString()+bleu.toString();
                    msg.channel.send(reponse);
                }
                
                if(num-parseInt(num/3)*3 === 1 && parseInt(num/3)*3+1 < 10){
                    msg.channel.send("Cbl 0"+(parseInt(num/3)*3+1)+": :star::star::star:");
                }
                else if(num-parseInt(num/3)*3 === 1){
                    msg.channel.send("Cbl "+(parseInt(num/3)*3+1)+": :star::star::star:");
                }
                else if(num-parseInt(num/3)*3 === 2 && parseInt(num/3)*3+1 < 10){
                    msg.channel.send("Cbl 0"+(parseInt(num/3)*3+1)+": :star::star::star: Cbl 0"+(parseInt(num/3)*3+2)+": "+vert.toString()+vert.toString()+vert.toString());
                }
                else if(num-parseInt(num/3)*3 === 2){
                     msg.channel.send("Cbl "+(parseInt(num/3)*3+1)+": :star::star::star: Cbl "+(parseInt(num/3)*3+2)+": "+vert.toString()+vert.toString()+vert.toString());   
                }
                
                msg.channel.send("!aideGuerre pour l'utilisation du tableau.");
                msg.guild.members.every(members => {// on envoie un message d'alerte pour tout les membres 

                    if(members.user.username === author){
                        members.send("Une guerre a commencé !!!");
                    };

                    return true
                });
            }
            else{
                msg.reply("Le nombre de joueurs ennemis doit être inferieur à 31.")
            };
              
            
        };
    };
};

delGuerre = (msg, data, discord) =>{
    console.log(data[msg.guild.name].length);
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
        else{
            
            
            let lastLigne = data[0].content;
            
            let NbDeCbl;
            for(let i = lastLigne.length-1; i>-1; i--){
                if(Number.isInteger(parseInt(lastLigne[i-1]) + parseInt(lastLigne[i]))){
                    NbDeCbl = parseInt(lastLigne[i-1]+lastLigne[i]);
                    break;
                };
            };

            console.log(NbDeCbl);
            
            if(NbDeCbl <= num){
                msg.reply("Vous devez mettre un nombre inferieur à "+ NbDeCbl);
            }
            else{
                for(let i = 0; i < data.length; i++){
                    
                    lastLigne = data[i].content;
                    const m = data[i];
                    if(NbDeCbl-2 <= num && num <= NbDeCbl){
                        console.log("change");
                        if(num - parseInt(num/3)*3 !== 0){
                            const strNum = (num+1<10) ? "0"+(num+1) : (num+1).toString();
                            
                            for(let e = lastLigne.length-1; e>-1; e--){
                                if(Number.isInteger(parseInt(lastLigne[e-1]) + parseInt(lastLigne[e])) && lastLigne[e-1]+lastLigne[e] === strNum){
                                    const reponse = lastLigne.substr(0,e-5);
                                    console.log(reponse);
//                                    console.log(data);
                                    data[i].edit(reponse);
                                    break;
                                };
                            };

                        }
                        else{
                            console.log("delete");
                            data[i].delete();
                            NbDeCbl -= 3;
                        }
    //                    console.log("2")
    //                    data[0].delete();
                    }
                    else{
                        NbDeCbl -= 3;
                        data[i].delete();
                    }
                }
//                for(let i = 0; i < data.length; i++){
//                    
//                }
            }
            
                
            
            
        }
        
    }
//    
//    
//    msg.channel.fetchMessages({limit: 10}).then(
//        m => {
//            for(let i = 0; i< data.length; i++){
//                console.log(m.get(data[i]).content);
//                console.log('------------------------------------------------------------------')
//            };
//        }
//    ).catch(console.error);
    
   
    
   
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