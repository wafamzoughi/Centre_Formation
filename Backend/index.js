const port = 4000;
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const multer = require("multer");
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
app.use(express.json());
app.use(cors());

// Connexion à MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/CentreDeFormation');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erreur de connexion à la base de données :'));
db.once('open', () => {
    console.log('Connexion à la base de données établie avec succès');
});

app.post('/login', async (req, res) => {
    const { email, cin, matiere } = req.body;
    console.log(`Received login request: email=${email}, cin=${cin}, matiere=${matiere}`);
    
    try {
        const enseignant = await Enseignant.findOne({ email });
        console.log(`Enseignant found: ${enseignant}`);
        
        if (!enseignant) {
            return res.status(401).json({ error: 'Email ou CIN incorrect' });
        }

        // Convert both cin values to string and trim
        const cinInput = String(cin).trim();
        const cinStored = String(enseignant.cin).trim();
        
        console.log(`cin Input: ${cinInput}, cin Stored: ${cinStored}`);
        const isMatch = cinInput === cinStored;
        console.log(`cin match: ${isMatch}`);
        
        if (!isMatch) {
            return res.status(401).json({ error: 'Email ou CIN incorrect' });
        }

        if (enseignant.specialite !== matiere) {
            return res.status(403).json({ error: 'Matière incorrecte pour cet enseignant' });
        }

        const token = jwt.sign(
            { id: enseignant._id, email: enseignant.email, matieres: enseignant.specialite },
            'your_jwt_secret',
            { expiresIn: '1h' }
        );

        res.json({ token, success: true });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
});

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token non fourni' });
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret'); // Utilisez la même clé secrète que lors de la génération du token
        req.user = decoded; // attachez les infos de l'utilisateur à la requête
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token invalide' });
    }
};
app.get('/utilisateur', authMiddleware, async (req, res) => {
    try {
        // req.user contient les informations décodées du token
        const utilisateur = await Enseignant.findById(req.user.id).select('-cin -password'); // Exclure les champs sensibles
        if (!utilisateur) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        res.json(utilisateur);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Configure multer storage
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

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Modèles Mongoose


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
    remise: Number,
    notes: [
        {
            formation: { type: mongoose.Schema.Types.ObjectId, ref: 'Formation' },
            matiere: { type: mongoose.Schema.Types.ObjectId, ref: 'Matiere' },
            ds: { type: Number, default: 0 },
            examen: { type: Number, default: 0 },
            tp: { type: Number, default: 0 }
        }
    ]
    
});

const Enseignant = mongoose.model("Enseignant",{
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

const Matiere = mongoose.model("Matiere", {
    id: { type: Number, required: true },
    matiere: { type: String, required: true },
    coefficient: { type: Number, required: true },
    credits: { type: Number, required: true },
    heure: { type: Number, required: true },
    formation: { type: String, enum: ['Ressources humaines', 'Marketing & Communication', 'Business & Management', 'Banque, Finance & Immobilier', 'Informatique & Web','Langues Étrangères', 'Graphisme & Webdesign' ], required: true },
    date: { type: Date, default: Date.now },
});

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



const Formation = mongoose.model("Formation", {
    nom: { type: String, required: true },
    duree: { type: Number, required: true },
    prix: { type: Number, required: true },
});

const Presence = mongoose.model("Presence", {
    eleveId: { type: mongoose.Schema.Types.ObjectId, ref: 'Eleve', required: true },
    date: { type: Date, required: true },
    present: { type: Boolean, required: true },
    formation: { type: mongoose.Schema.Types.ObjectId, ref: 'Formation', required: true },
    matiere: { type: mongoose.Schema.Types.ObjectId, ref: 'Matiere', required: true },
});


const Note = mongoose.model("Note", {
    eleveId: { type: mongoose.Schema.Types.ObjectId, ref: 'Eleve', required: true },
    formationId: { type: String, required: true },
    matiereId: { type: mongoose.Schema.Types.ObjectId, ref: 'Matiere', required: true },
    ds: { type: Number, default: 0 },
    examen: { type: Number, default: 0 },
    tp: { type: Number, default: 0 }
});


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
    const devoir_pdf = req.file ? `/uploads/${req.file.filename}` : null;


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
app.get('/touslesmatieres',async (req, res) => {
    let matieres = await Matiere.find({});
    res.send(matieres);
});

app.get('/matieres', async (req, res) => {
    const formation = req.query.formation;
    try {
        const matieres = await Matiere.find({ formation });
        res.json(matieres);
    } catch (error) {
        console.error('Erreur lors de la récupération des matières:', error);
        res.status(500).send('Erreur lors de la récupération des matières');
    }
});

// Fetch unique formations
app.get('/formations', async (req, res) => {
    try {
        // Récupère toutes les matières
        const matieres = await Matiere.find();
        
        // Extrait les formations uniques
        const formations = [...new Set(matieres.map(matiere => matiere.formation))];
        
        // Renvoie les formations en réponse
        res.json(formations);
    } catch (error) {
        console.error('Erreur lors de la récupération des formations depuis les matières:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des formations depuis les matières' });
    }
});

// Example route to get presence by date
app.get('/presence/:date', async (req, res) => {
    const { date } = req.params;
    try {
        const presenceRecords = await Presence.find({ date: new Date(date) })
            .populate('eleveId', 'nom prenom')
            .populate('formation', 'nom')
            .populate('matiere', 'matiere');
        res.json(presenceRecords);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'assiduité' });
    }
});

app.get('/touslespresences', async (req, res) => {
    const { formation, matiere } = req.query;

    try {
        const formationObj = await Formation.findOne({ nom: formation });
        const matiereObj = await Matiere.findById(matiere);

        if (!formationObj || !matiereObj) {
            return res.status(404).json({ message: 'Formation or Matière not found' });
        }

        const presences = await Presence.find({
            formation: formationObj._id,
            matiere: matiereObj._id,
        }).populate('eleveId');

        res.json(presences);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching presences' });
    }
});


app.post('/savePresence', async (req, res) => {
    const { presence } = req.body;

    if (!presence || !Array.isArray(presence)) {
        return res.status(400).send('La liste des présences est requise et doit être un tableau');
    }

    try {
        const savedPresences = await Promise.all(presence.map(async record => {
            const { eleveNom, elevePrenom, formationNom, matiereNom, date, present } = record;

            if (!eleveNom || !elevePrenom || !formationNom || !matiereNom || !date || present === undefined) {
                console.error('Données de présence reçues:', presence);
                throw new Error('Données de présence incomplètes');
            }

            // Find the student
            const eleve = await Eleve.findOne({ nom: eleveNom, prenom: elevePrenom });
            if (!eleve) {
                console.error(`Élève non trouvé: ${eleveNom} ${elevePrenom}`);
                throw new Error(`Élève non trouvé: ${eleveNom} ${elevePrenom}`);
            }

            // Find the formation
            const formation = await Formation.findOne({ nom: formationNom });
            if (!formation) {
                console.error(`Formation non trouvée: ${formationNom}`);
                throw new Error(`Formation non trouvée: ${formationNom}`);
            }

            // Find the subject
            const matiere = await Matiere.findById(matiereNom);
            if (!matiere) {
                console.error(`Matière non trouvée: ${matiereNom}`);
                throw new Error(`Matière non trouvée: ${matiereNom}`);
            }

            // Check for existing presence
            let existingPresence = await Presence.findOne({ eleveId: eleve._id, date });
            if (existingPresence) {
                existingPresence.present = present;
                existingPresence.formation = formation._id;
                existingPresence.matiere = matiere._id;
                return existingPresence.save();
            } else {
                const newPresence = new Presence({
                    eleveId: eleve._id,
                    date,
                    present,
                    formation: formation._id,
                    matiere: matiere._id
                });
                return newPresence.save();
            }
        }));

        res.json(savedPresences);
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement de l\'assiduité:', error); // Log the entire error
        res.status(500).send('Erreur interne du serveur');
    }
});






// API pour obtenir les présences par formation
app.get('/presences-par-formation/:formation', async (req, res) => {
    const { formation } = req.params;
    try {
        const formationObj = await Formation.findOne({ nom: formation });
        if (!formationObj) {
            return res.status(404).json({ error: 'Formation non trouvée' });
        }

        const presenceRecords = await Presence.find({ formation: formationObj._id })
            .populate('eleveId', 'nom prenom')
            .populate('formation', 'nom')
            .populate('matiere', 'matiere'); // Populate matiere field

        const formattedPresences = presenceRecords.map(record => ({
            date: record.date.toISOString().split('T')[0],
            nom: record.eleveId.nom,
            prenom: record.eleveId.prenom,
            matiere: record.matiere.matiere, // Include matiere in the response
            present: record.present
        }));

        res.json(formattedPresences);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des présences' });
    }
});

// les notes

// Sauvegarder ou mettre à jour les notes
app.post('/saveNotes', async (req, res) => {
    console.log('Requête reçue:', req.body);
    const { notes } = req.body;

    if (!notes || !Array.isArray(notes)) {
        return res.status(400).send('La liste des notes est requise et doit être un tableau');
    }

    try {
        const savedNotes = await Promise.all(notes.map(async note => {
            const { eleveId, matiereId, ds, examen, tp } = note;

            if (!eleveId || !matiereId || ds === undefined || examen === undefined || tp === undefined) {
                throw new Error('Données de note incomplètes');
            }

            const eleve = await Eleve.findById(eleveId);
            if (!eleve) {
                throw new Error(`Élève avec ID ${eleveId} non trouvé`);
            }

            const matiere = await Matiere.findById(matiereId);
            if (!matiere) {
                throw new Error(`Matière avec ID ${matiereId} non trouvée`);
            }

            const formation = matiere.formation; // Get formation from matiere

            // Chercher si une note existe déjà pour cet élève dans cette formation et matière
            let existingNote = await Note.findOne({ eleveId, formationId: formation, matiereId });

            if (existingNote) {
                // Mettre à jour la note existante
                existingNote.ds = ds;
                existingNote.examen = examen;
                existingNote.tp = tp;
                return existingNote.save();
            } else {
                // Créer une nouvelle note
                const newNote = new Note({
                    eleveId,
                    formationId: formation,
                    matiereId,
                    ds,
                    examen,
                    tp
                });
                return newNote.save();
            }
        }));

        res.json(savedNotes);
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement des notes:', error);
        res.status(500).send('Erreur interne du serveur');
    }
});

// Fetch notes by formation and matiere

app.get('/notes-par-formation-et-matiere', async (req, res) => {
    const { formation, matiereId } = req.query;

    try {
        const notes = await Note.find({ formationId: formation, matiereId })
            .populate('eleveId', 'nom prenom'); // Peupler les champs nom et prenom

        // Vérifiez ce que vous récupérez
        console.log(notes); // Ajoutez cette ligne pour voir les notes récupérées

        res.json(notes);
    } catch (error) {
        console.error('Erreur lors de la récupération des notes:', error);
        res.status(500).send('Erreur serveur');
    }
});


app.get('/formations-with-teachers', async (req, res) => {
    try {
        // Fetch data from Matiere and join with Enseignant
        const formations = await Matiere.aggregate([
            {
                $lookup: {
                    from: "enseignants",
                    localField: "specialite",  // Field in Matiere
                    foreignField: "specialite", // Field in Enseignant
                    as: "enseignants" // Output array field
                }
            },
            {
                $group: {
                    _id: "$formation",
                    matieres: {
                        $push: {
                            matiere: "$matiere",
                            
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: "formations",
                    localField: "_id",
                    foreignField: "nom",
                    as: "formationDetails"
                }
            },
            {
                $unwind: "$formationDetails"
            },
            {
                $project: {
                    _id: 0,
                    formation: "$formationDetails.nom",
                    matieres: 1
                }
            }
        ]);

        res.json(formations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des données' });
    }
});

//Dashboard 
app.get('/personnel-stats', async (req, res) => {
    try {
      const personnelStats = await Personnel.aggregate([
        {
          $group: {
            _id: "$typePersonnel",
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            typePersonnel: "$_id",
            count: 1,
            _id: 0
          }
        }
      ]);
      res.json(personnelStats);
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur' });
    }
  });

app.get('/formation-stats', async (req, res) => {
    try {
        const formationStats = await Eleve.aggregate([
        {
          $unwind: "$formations"
        },
        {
          $group: {
            _id: "$formations",
            count: { $sum: 1 }
          }
        },
        {
          $lookup: {
            from: "formations",
            localField: "_id",
            foreignField: "_id",
            as: "formationDetails"
          }
        },
        {
          $project: {
            formation: { $arrayElemAt: ["$formationDetails.nom", 0] },
            count: 1,
            _id: 0
          }
        }
      ]);
      res.json(formationStats);
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur' });
    }
  });
  
  

app.listen(port, () => {
    console.log(`Serveur backend démarré sur le port ${port}`);
});
