const mongoose     = require('mongoose');
const mongoosastic = require('mongoosastic');

mongoose.connect('mongodb://localhost:27017/mongosync'); // nom de bdd ds mongo

var UserSchema = new mongoose.Schema({
    name: String
    , email: String
    , city: String
    , paragraphe: String
});

UserSchema.plugin(mongoosastic, {
    "host": "localhost",
    "port": 9200
});

var User = mongoose.model('user', UserSchema);

User.createMapping((err, mapping) => {
    console.log('mapping created');
});

var newUser = new User({
    name: 'Shahid',
    email: 'toto@codeforgeek.com',
    city: 'paris',
    paragraphe: 'e 2 octobre 2020, les pluies diluviennes de la tempête Alex s’abattaient sur les hauteurs du département des Alpes-Maritimes, générant une crue exceptionnelle de la Roya. Dans la partie française de cette vallée qui débouche en Italie, pas moins de 72 « brèches » ont partiellement voire entièrement détruit la chaussée, de nombreux ouvrages d’art, des habitations et les cimetières de Saint-Dalmas-de-Tende et de Saint-Martin-Vésubie. En emportant végétation et terrains bordiers, la crue a détruit des sites archéologiques mais également mis au jour nombre des constructions enfouies, oubliées ou méconnues ; il s’agit notamment d’installations d’exploitation de l’énergie hydraulique.\n' +
        '\n' +
        'mumbai LES MOULINS DE LA VALLÉE : TÉMOIGNAGE D’UN ÂGE D’OR INDUSTRIEL ET TECHNIQUE\n' +
        'La Vallée de la Roya a connu une intense activité artisanale et agricole aux époques moderne et contemporaine, grâce à la maîtrise de son énergie hydraulique qui a permis de travailler tout à la fois les métaux, le textile, le grain, etc. Loin d’un mode de travail traditionnel, ces technophiles ont été précurseurs dans un savoir-faire qui a permis le développement de la vallée.\n' +
        '\n' +
        'Bien que la plupart des moulins qui jalonnent la vallée de la Roya soient connus et certains encore en état comme à Breil-sur-Roya, ceux du Cairos sont mal documentés. Ils se trouvent en aval de la plaine d’Ambo qui, avec le confluent de la rivière du Cairos, constitue l’un des rares terrains plats d’un pays tout en pentes escarpées aménagées en terrasses, pour l’essentiel des oliveraies. Juste en aval du moulin débute un étroit défilé ou « clue » de Nocé, resté longtemps infranchissable.'
});

newUser.save((err) => {
    if(err) {
        console.log(err);
    }
    console.log('user added in both the databases');
})

newUser.on('es-indexed', (err, result) => {
    console.log('indexed to elastic search');
});





async function recupUser(){
    const users =  await User.find({});
    // console.log(users[0]);
    users.forEach(item =>

        console.log(item)
    );
}

recupUser();