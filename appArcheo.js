const mongoose     = require('mongoose');
const mongoosastic = require('mongoosastic');
// Connexion et nom de la bdd mongo
mongoose.connect('mongodb://localhost:27017/archeo');

// Création d'un nouveau schema
var UserSchema = new mongoose.Schema({
    id: Number,
    Lambert_X: String,
    Lambert_Y: String,
    Region: String,
    Departement: String,
    Commune: String,
    Nom_du_site: String,
    Date_debut: String,
    Date_fin: String,
    Periodes: String,
    Themes: String,
    Type_intervention: String

});

// Connexion à elasticSearch
UserSchema.plugin(mongoosastic, {
    "host": "localhost",
    "port": 9200
});

// nom de l'index elasticSearch
var User = mongoose.model('sites_archeo', UserSchema);

User.createMapping((err, mapping) => {
    console.log('cartographie créée');
});

var newUser = new User({
    id: 801,
    Lambert_X: "831470",
    Lambert_Y: "6881060",
    Region: "Egypte",
    Departement: "Egypte",
    Commune: "Le Caire",
    Nom_du_site: "Ancienne egypte",
    Date_debut: "30/07/2001",
    Date_fin: "19/01/2002",
    Periodes: "#Néolithique#Protohistoire",
    Themes: "Pyramides",
    Type_intervention: "fouille"


});

newUser.save((err) => {
    if(err) {
        console.log(err);
    }
    console.log('Le site archeologique a bien été ajouté aux deux bases');
})

newUser.on('es-indexed', (err, result) => {
    console.log('indexé à elasticSearch');
});





async function recupUser(){
    const users =  await User.find({});
    // console.log(users[0]);
    users.forEach(item =>

        console.log(item)
    );
}

recupUser();