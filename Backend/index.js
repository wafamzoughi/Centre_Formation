const port = 4000;
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const multer = require("multer");
const path = require('path');
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/CentreDeFormation');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erreur de connexion à la base de données :'));
db.once('open', () => {
  console.log('Connexion à la base de données établie avec succès');
});
// Configuration de Multer pour le stockage des fichiers
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`);
    }
});

const upload = multer({ storage: storage });
// Schema et modèle pour Chapitre
const Chapitre = mongoose.model("Chapitre", {
    num_chap: { type: Number, required: true },
    nom_chap: { type: String, required: true },
    cours_pdf: { type: String },
    nom_matiere: { type: String, required: true },
});

// API pour ajouter un chapitre
app.post('/ajouterchapitre', upload.single('cours_pdf'), async (req, res) => {
    const { num_chap, nom_chap, nom_matiere } = req.body;
    const cours_pdf = req.file ? `/uploads/${req.file.filename}` : null;

    const chapitre = new Chapitre({
        num_chap,
        nom_chap,
        cours_pdf,
        nom_matiere,
    });

    try {
        await chapitre.save();
        res.json(chapitre);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'ajout du chapitre' });
    }
});
// API pour obtenir tous les chapitres
app.get('/tousleschapitres', async (req, res) => {
    let chapitres = await Chapitre.find({});
    res.send(chapitres);
});


// Schema et modèle pour Eleve
const Eleve = mongoose.model("Eleve", {
    id: { type: Number, required: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    cin: { type: Number, required: true },
    email: { type: String, required: true },
    tel: { type: Number, required: true },
    adresse: { type: String, default: '' },
    montantPayant: { type: Number, default: 0 },
    montantRestant: { type: Number, default: 0 },
    remise: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
});
// API pour ajouter un élève
app.post('/ajoutereleve', async (req, res) => {
    let eleves = await Eleve.find({});
    let id = eleves.length > 0 ? eleves.slice(-1)[0].id + 1 : 1;
    
    const eleve = new Eleve({
        id: id,
        nom: req.body.nom,
        prenom: req.body.prenom,
        cin: req.body.cin,
        email: req.body.email,
        tel: req.body.tel,
        adresse: req.body.adresse,
        montantPayant: req.body.montantPayant,
        montantRestant: req.body.montantRestant,
        remise: req.body.remise,
    });
    
    await eleve.save();
    res.json(eleve);
});
// API pour modifier un élève
app.put('/modifiereleve/:id', async (req, res) => {
    const { id } = req.params;
    const { nom, prenom, cin, email, tel, adresse, montantPayant, montantRestant, remise } = req.body;

    try {
        const updatedEleve = await Eleve.findOneAndUpdate(
            { _id: id },
            { nom, prenom, cin, email, tel, adresse, montantPayant, montantRestant, remise },
            { new: true } // Pour retourner le document mis à jour
        );

        if (updatedEleve) {
            res.json(updatedEleve);
        } else {
            res.status(404).json({ error: 'Élève non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'élève' });
    }
});
// API pour supprimer un élève
app.post('/supprimereleve', async (req, res) => {
    try {
        await Eleve.findByIdAndDelete(req.body.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression d eleve-' });
    }
});
// API pour obtenir tous les élèves
app.get('/tousleseleves', async (req, res) => {
    let eleves = await Eleve.find({});
    res.send(eleves);
});



const EnseignantSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    cin: { type: Number, required: true },
    email: { type: String, required: true },
    tel: { type: Number, required: true },
    adresse: { type: String, required: true },
    typeContrat: { type: String, enum: ['CDI', 'CDD', 'CIVP', 'Karama'], required: true },
    specialite: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

const Enseignant = mongoose.model("Enseignant", EnseignantSchema);
module.exports = Enseignant;


// API pour ajouter un enseignant
app.post('/ajouterenseignant', async (req, res) => {
    try {
        const { nom, prenom, cin, email, tel, adresse, typeContrat, specialite } = req.body;

        // Vérifiez si la matière existe
        const matiere = await Matiere.findOne({ matiere: specialite });
        if (!matiere) {
            return res.status(400).json({ error: 'Matière non trouvée' });
        }

        const enseignant = new Enseignant({
            nom,
            prenom,
            cin,
            email,
            tel,
            adresse,
            typeContrat,
            specialite: matiere.matiere,
        });

        await enseignant.save();
        
        // Ajouter également au personnel
        const personnel = new Personnel({
            id: enseignant._id,
            nom,
            prenom,
            cin,
            email,
            tel,
            adresse,
            typeContrat,
            typePersonnel: 'Enseignant', // Définir le typePersonnel comme Enseignant
        });

        await personnel.save();
        res.json(enseignant);
        
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'enseignant' });
    }
});


app.post('/supprimerenseignant', async (req, res) => {
    const { id } = req.body;
    
    try {
        // Supprimer l'enseignant de la collection Enseignant
        const enseignant = await Enseignant.findOneAndDelete({ _id: id });
        
        if (!enseignant) {
            return res.status(404).json({ error: 'Enseignant non trouvé' });
        }

        // Supprimer le personnel de la collection Personnel
        await Personnel.findOneAndDelete({ email: enseignant.email });

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'enseignant' });
    }
});

// API pour modifier un enseignant
app.put('/modifierenseignant/:id', async (req, res) => {
    const { id } = req.params;
    const { email, tel, adresse, specialite } = req.body;

    try {
        // Vérifiez si la matière existe
        const matiere = await Matiere.findOne({ matiere: specialite });
        if (!matiere) {
            return res.status(400).json({ error: 'Matière non trouvée' });
        }

        const updatedEnseignant = await Enseignant.findOneAndUpdate(
            { _id: id },
            { email, tel, adresse, specialite: matiere.matiere }, // Stocke le nom de la matière directement
            { new: true } // Pour retourner le document mis à jour
        );

        if (updatedEnseignant) {
            res.json(updatedEnseignant);
        } else {
            res.status(404).json({ error: 'Enseignant non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'enseignant' });
    }
});

app.get('/touslesenseignants', async (req, res) => {
    try {
        const enseignants = await Enseignant.find({}).populate('specialite', 'matiere');
        res.json(enseignants);
        
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des enseignants' });
    }
});





// Schema et modèle pour Personnel
const Personnel = mongoose.model("Personnel", {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    cin: { type: Number, required: true },
    email: { type: String, required: true },
    tel: { type: Number, required: true },
    adresse: { type: String, required: true },
    typeContrat: { type: String, enum: ['CDI', 'CDD', 'CIVP', 'Karama'], required: true },
    typePersonnel: { type: String, enum: ['Administratif', 'Enseignant', 'Technicien', 'Autre'], required: true },
    date: { type: Date, default: Date.now },
});

// API pour ajouter un personnel 
app.post('/ajouterpersonnel', async (req, res) => {
    let personnels = await Personnel.find({});
    let id = personnels.length > 0 ? personnels.slice(-1)[0].id + 1 : 1;
    
    const personnel = new Personnel({
        id: id,
        nom: req.body.nom,
        prenom: req.body.prenom,
        cin: req.body.cin,
        email: req.body.email,
        tel: req.body.tel,
        adresse: req.body.adresse,
        typeContrat: req.body.typeContrat,
        typePersonnel: req.body.typePersonnel,
    });
    
    await personnel.save();
    res.json(personnel);
});

// API pour supprimer un personnel
app.post('/supprimerpersonnel', async (req, res) => {
    try {
        await Personnel.findByIdAndDelete(req.body.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du personnel' });
    }
});


// API pour obtenir tous les personnels
app.get('/touslespersonnels', async (req, res) => {
    try {
        const personnels = await Personnel.find({});
        res.json(personnels);
        
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des personnels' });
    }
});


// Schema et modèle pour matière
const Matiere = mongoose.model("Matiere", {
    id: { type: Number, required: true },
    matiere: { type: String, required: true },
    coefficient: { type: Number, required: true },
    credits: { type: Number, required: true },
    heure: { type: Number, required: true },
    formation: { type: String, enum: ['Ressources humaines', 'Marketing & Communication', 'Business & Management', 'Banque, Finance & Immobilier', 'Informatique & Web','Langues Étrangères', 'Graphisme & Webdesign' ], required: true },
    date: { type: Date, default: Date.now },
});

// API pour ajouter une matière
app.post('/ajoutermatiere', async (req, res) => {
    let matieres = await Matiere.find({});
    let id = matieres.length > 0 ? matieres.slice(-1)[0].id + 1 : 1;
    
    const matiere = new Matiere({
        id: id,
        matiere: req.body.matiere,
        coefficient: req.body.coefficient,
        credits: req.body.credits,
        heure: req.body.heure,
        formation: req.body.formation,
        
    });
    
    await matiere.save();
    res.json(matiere);
});

// API pour supprimer une matière
app.post('/supprimermatiere', async (req, res) => {
    await Matiere.findOneAndDelete({ id: req.body.id });
    res.json({ success: true });
});
// API pour modifier une matière
app.post('/modifiermatiere', async (req, res) => {
    const { id, matiere, coefficient, credits, heure, formation } = req.body;

    try {
        // Mise à jour de la matière en fonction de l'ID
        const updatedMatiere = await Matiere.findOneAndUpdate(
            { id: id },
            { matiere, coefficient, credits, heure, formation },
            { new: true } // Pour retourner le document mis à jour
        );

        if (updatedMatiere) {
            res.json(updatedMatiere);
        } else {
            res.status(404).json({ error: 'Matière non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la matière' });
    }
});


// API pour obtenir tous les matières
app.get('/touslesmatieres', async (req, res) => {
    let matieres = await Matiere.find({});
    res.send(matieres);
});





app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on Port " + port);
    } else {
        console.log("Error: " + error);
    }
});
