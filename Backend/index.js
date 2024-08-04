const port = 4000;
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const multer = require("multer");
const path = require('path');

app.use(express.json());
app.use(cors());

// Connexion à MongoDB
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

// Modèles Mongoose
const Chapitre = mongoose.model("Chapitre", {
    num_chap: { type: Number, required: true },
    nom_chap: { type: String, required: true },
    cours_pdf: { type: String },
    nom_matiere: { type: String, required: true },
});

const Devoir = mongoose.model("Devoir", {
    devoir_pdf: { type: String },
    nom_matiere: { type: String, required: true },
});

const Eleve = mongoose.model("Eleve", {
    nom: String,
    prenom: String,
    cin: Number,
    email: String,
    tel: Number,
    adresse: String,
    formations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Formation' }],
    montantPayant: Number,
    montantRestant: Number,
    remise: Number
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

const Matiere = mongoose.model("Matiere", {
    id: { type: Number, required: true },
    matiere: { type: String, required: true },
    coefficient: { type: Number, required: true },
    credits: { type: Number, required: true },
    heure: { type: Number, required: true },
    formation: { type: String, enum: ['Ressources humaines', 'Marketing & Communication', 'Business & Management', 'Banque, Finance & Immobilier', 'Informatique & Web','Langues Étrangères', 'Graphisme & Webdesign' ], required: true },
    date: { type: Date, default: Date.now },
});

const Formation = mongoose.model("Formation", {
    nom: { type: String, required: true },
    duree: { type: Number, required: true },
    prix: { type: Number, required: true },
});

const Presence = mongoose.model("Presence", {
    eleveId: { type: mongoose.Schema.Types.ObjectId, ref: 'Eleve', required: true },
    date: { type: Date, required: true },
    present: { type: Boolean, required: true },
    formation: { type: mongoose.Schema.Types.ObjectId, ref: 'Formation', required: true }
});

// Routes
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

app.get('/tousleschapitres', async (req, res) => {
    try {
        const chapitres = await Chapitre.find({});
        res.send(chapitres);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des chapitres' });
    }
});

app.post('/ajouterdevoir', upload.single('devoir_pdf'), async (req, res) => {
    const { nom_matiere } = req.body;
    const devoir_pdf = req.file ? `/uploads/devoirs/${req.file.filename}` : null;

    const devoir = new Devoir({
        devoir_pdf,
        nom_matiere,
    });

    try {
        await devoir.save();
        res.json(devoir);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'ajout du devoir' });
    }
});

app.get('/touslesdevoirs', async (req, res) => {
    try {
        const devoirs = await Devoir.find({});
        res.send(devoirs);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des devoirs' });
    }
});

app.post('/ajoutereleve', async (req, res) => {
    try {
        const eleve = new Eleve(req.body);
        await eleve.save();
        res.json(eleve);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'élève' });
    }
});

app.put('/modifiereleve/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedEleve = await Eleve.findByIdAndUpdate(id, updates, { new: true });
        if (updatedEleve) {
            res.json(updatedEleve);
        } else {
            res.status(404).json({ error: 'Élève non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'élève' });
    }
});

app.post('/supprimereleve', async (req, res) => {
    try {
        await Eleve.findByIdAndDelete(req.body.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'élève' });
    }
});

app.get('/tousleseleves', async (req, res) => {
    try {
        const { formation } = req.query;  // Récupérer le paramètre de la requête
        let filter = {};

        if (formation) {
            const formationObj = await Formation.findOne({ nom: formation });
            if (formationObj) {
                filter = { formations: formationObj._id };
            }
        }

        const eleves = await Eleve.find(filter).populate('formations');
        res.send(eleves);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des élèves' });
    }
});


app.post('/ajouterenseignant', async (req, res) => {
    try {
        const { nom, prenom, cin, email, tel, adresse, typeContrat, specialite } = req.body;

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

        const personnel = new Personnel({
            nom,
            prenom,
            cin,
            email,
            tel,
            adresse,
            typeContrat,
            typePersonnel: 'Enseignant'
        });

        await personnel.save();
        res.json(enseignant);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'enseignant' });
    }
});

app.get('/touslesenseignants', async (req, res) => {
    try {
        const enseignants = await Enseignant.find({});
        res.send(enseignants);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des enseignants' });
    }
});


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

app.post('/ajouterformation', async (req, res) => {
    try {
        const formation = new Formation(req.body);
        await formation.save();
        res.json(formation);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'ajout de la formation' });
    }
});
app.get('/touteslesformations', async (req, res) => {
    try {
        const formations = await Formation.find({});
        res.send(formations);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des formations' });
    }
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


app.post('/savePresence', async (req, res) => {
    const { presence } = req.body;
    try {
        const savedPresences = await Promise.all(presence.map(async record => {
            const eleve = await Eleve.findOne({ nom: record.eleveNom, prenom: record.elevePrenom });
            if (!eleve) {
                throw new Error(`Élève avec nom ${record.eleveNom} et prénom ${record.elevePrenom} non trouvé`);
            }
            const formation = await Formation.findOne({ nom: record.formationNom });
            if (!formation) {
                throw new Error(`Formation avec nom ${record.formationNom} non trouvée`);
            }
            return await Presence.findOneAndUpdate(
                { eleveId: eleve._id, date: record.date },
                { eleveId: eleve._id, date: record.date, present: record.present, formation: formation._id },
                { upsert: true, new: true }
            );
        }));
        res.json(savedPresences);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'enregistrement de l\'assiduité' });
    }
});

// API pour obtenir les présences par formation
app.get('/presences-par-formation/:formation', async (req, res) => {
    const { formation } = req.params;
    try {
        // Trouver l'objet Formation correspondant au nom donné
        const formationObj = await Formation.findOne({ nom: formation });
        if (!formationObj) {
            return res.status(404).json({ error: 'Formation non trouvée' });
        }

        // Trouver les enregistrements de présence pour cette formation
        const presenceRecords = await Presence.find({ formation: formationObj._id })
            .populate('eleveId', 'nom prenom')
            .populate('formation', 'nom');

        // Formater les données de présence
        const formattedPresences = presenceRecords.map(record => ({
            date: record.date.toISOString().split('T')[0],
            nom: record.eleveId.nom,
            prenom: record.eleveId.prenom,
            present: record.present
        }));

        res.json(formattedPresences);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des présences' });
    }
});


app.get('/touteslespresences', async (req, res) => {
    try {
        const { date } = req.query; // Obtient la date depuis la requête
        let query = {};
        
        if (date) {
            // Filtre par date si elle est fournie
            query.date = new Date(date);
        }
        
        const presences = await Presence.find(query)
            .populate('eleveId', 'nom prenom')
            .populate('formation', 'nom');
        
        // Organiser les présences par formation et date
        const formattedPresences = presences.reduce((acc, record) => {
            const formation = record.formation.nom;
            const recordDate = record.date.toISOString().split('T')[0];
            if (!acc[formation]) {
                acc[formation] = {};
            }
            if (!acc[formation][recordDate]) {
                acc[formation][recordDate] = [];
            }
            acc[formation][recordDate].push({
                nom: record.eleveId.nom,
                prenom: record.eleveId.prenom,
                present: record.present
            });
            return acc;
        }, {});
        
        res.json(formattedPresences);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des présences' });
    }
});




app.listen(port, () => {
    console.log(`Serveur backend démarré sur le port ${port}`);
});
