import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NotesEleves.css';

const NotesEleves = () => {
    const [eleves, setEleves] = useState([]);
    const [notes, setNotes] = useState({});
    const [formations, setFormations] = useState([]);
    const [formation, setFormation] = useState('');
    const [matieres, setMatieres] = useState([]);
    const [matiere, setMatiere] = useState('');
    const [loadingMatieres, setLoadingMatieres] = useState(false);
    const [loadingEleves, setLoadingEleves] = useState(false);
    const [loadingNotes, setLoadingNotes] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFormations();
    }, []);

    useEffect(() => {
        if (formation) {
            fetchMatieres();
        }
    }, [formation]);

    useEffect(() => {
        if (matiere) {
            fetchEleves();
            fetchNotes();
        }
    }, [matiere]);

    const fetchFormations = async () => {
        try {
            const response = await axios.get('http://localhost:4000/formations');
            setFormations(response.data);
            if (response.data.length > 0) {
                setFormation(response.data[0]._id); // Sélectionner la première formation par défaut
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des formations', error);
            setError('Erreur lors de la récupération des formations');
        }
    };

    const fetchMatieres = async () => {
        setLoadingMatieres(true);
        try {
            const response = await axios.get('http://localhost:4000/matieres', {
                params: { formation }
            });
            setMatieres(response.data);
            if (response.data.length > 0) {
                setMatiere(response.data[0]._id); // Sélectionner la première matière par défaut
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des matières', error);
            setError('Erreur lors de la récupération des matières');
        } finally {
            setLoadingMatieres(false);
        }
    };

    const fetchEleves = async () => {
        setLoadingEleves(true);
        try {
            const response = await axios.get('http://localhost:4000/tousleseleves', {
                params: { formation }
            });
            setEleves(response.data);

            const initialNotes = {};
            response.data.forEach(eleve => {
                initialNotes[eleve._id] = notes[eleve._id] || { ds: 0, examen: 0, tp: 0 };
            });
            setNotes(initialNotes);
        } catch (error) {
            console.error('Erreur lors de la récupération des élèves', error);
            setError('Erreur lors de la récupération des élèves');
        } finally {
            setLoadingEleves(false);
        }
    };

    const fetchNotes = async () => {
        setLoadingNotes(true);
        try {
            const response = await axios.get('http://localhost:4000/notes', {
                params: { matiereId: matiere } // Utiliser l'ID de la matière
            });

            const notesData = response.data.reduce((acc, note) => {
                acc[note.eleveId._id] = { ds: note.ds, examen: note.examen, tp: note.tp };
                return acc;
            }, {});

            // Ajouter les notes manquantes avec des valeurs par défaut
            const updatedNotes = { ...notes };
            Object.keys(updatedNotes).forEach(eleveId => {
                if (!notesData[eleveId]) {
                    notesData[eleveId] = { ds: 0, examen: 0, tp: 0 };
                }
            });

            setNotes(prev => ({ ...prev, ...notesData }));
        } catch (error) {
            console.error('Erreur lors de la récupération des notes', error);
            setError('Erreur lors de la récupération des notes');
        } finally {
            setLoadingNotes(false);
        }
    };

    const handleFormationChange = (e) => {
        setFormation(e.target.value);
    };

    const handleMatiereChange = (e) => {
        setMatiere(e.target.value);
    };

    return (
        <div className="notes-page">
            <h1>Liste des Notes</h1>
            <div>
                <label>Formation: </label>
                <select value={formation} onChange={handleFormationChange}>
                    {formations.length > 0 ? (
                        formations.map(f => (
                            <option key={f._id} value={f._id}>{f.nom}</option>
                        ))
                    ) : (
                        <option value="">Aucune formation disponible</option>
                    )}
                </select>
            </div>
            <div>
                <label>Matière: </label>
                <select value={matiere} onChange={handleMatiereChange}>
                    {matieres.length > 0 ? (
                        matieres.map(m => (
                            <option key={m._id} value={m._id}>{m.matiere}</option>
                        ))
                    ) : (
                        <option value="">Aucune matière disponible</option>
                    )}
                </select>
            </div>
            {loadingEleves || loadingNotes ? (
                <p>Chargement des données...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>DS</th>
                            <th>Examen</th>
                            <th>TP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eleves.length > 0 ? (
                            eleves.map(eleve => (
                                <tr key={eleve._id}>
                                    <td>{`${eleve.nom} ${eleve.prenom}`}</td>
                                    <td>{notes[eleve._id]?.ds || 0}</td>
                                    <td>{notes[eleve._id]?.examen || 0}</td>
                                    <td>{notes[eleve._id]?.tp || 0}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">Aucun élève disponible</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default NotesEleves;
