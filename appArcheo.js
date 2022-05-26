const mongoose     = require('mongoose');
const mongoosastic = require('mongoosastic');
const {getIndexName} = require("mongoosastic/dist/utils");

// Connexion et nom de la bdd mongo
mongoose.connect('mongodb://localhost:27017/archeo');

// Création d'un nouveau schema
var SiteSchema = new mongoose.Schema({
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


// enregistrement d'un plugin pour le schema "SiteSchema"
SiteSchema.plugin(mongoosastic, {
    "host": "localhost",
    "port": 9200
});
// Ajout du plugin au modèle, pour indexer le modèle dans elasticsearch
//Par défaut, le plugin utilisera la pluralisation du nom du modèle ('sites_archeos') comme nom d'index et le nom du modèle ('sites_archeos') comme type dans elasticsearch.
var Site = mongoose.model('sites_archeo', SiteSchema);


// Création du mappage pour l'index
 Site.createMapping((err, mapping) => {
    console.log('cartographie créée');
 });



// données à insérer dans les deux bases
var newSite = new Site({
    id: 804,
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

// Enregistrement dans mongoDB
newSite.save((err) => {
    if(err) {
        console.log(err);
    }
    console.log('Le site archeologique a bien été ajouté dans archeo (mongoDB)');
})

// Indexation dans elasticSearch
newSite.on('es-indexed', (err, result) => {
    console.log('indexé à elasticSearch');
});




// Affiche la liste des sites enregistrées dans la bdd archeo (mongoDB)
async function recupSite(){
    const sites =  await Site.find({});
    // console.log(sites[0]);
    sites.forEach(item =>

        console.log(item)
    );
}

recupSite();