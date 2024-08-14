import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar1 from '../Sidebar1/Sidebar1';
import menuIcon from '../../../../assets/menu-icon.png';
import './Notes.css';

const Notes = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [eleves, setEleves] = useState([]);
    const [notes, setNotes] = useState({});
    const [formations, setFormations] = useState([]);
    const [formation, setFormation] = useState('');
    const [matieres, setMatieres] = useState([]);
    const [matiere, setMatiere] = useState('');
    const [loadingMatieres, setLoadingMatieres] = useState(false);
    const [loadingEleves, setLoadingEleves] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

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
    }, [date, formation, matiere]);

    const fetchFormations = async () => {
        try {
            const response = await axios.get('http://localhost:4000/formations');
            setFormations(response.data);
            if (response.data.length > 0) {
                setFormation(response.data[0]); // Sélectionner la première formation par défaut
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des formations depuis les matières', error);
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
        } finally {
            setLoadingEleves(false);
        }
    };

    const fetchNotes = async () => {
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
        }
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleFormationChange = (e) => {
        setFormation(e.target.value);
    };

    const handleMatiereChange = (e) => {
        setMatiere(e.target.value);
    };

    const handleNoteChange = (eleveId, noteType, value) => {
        const sanitizedValue = Math.max(0, Math.min(20, Number(value))); // Validation pour les notes (0-20)
        setNotes(prev => ({
            ...prev,
            [eleveId]: {
                ...prev[eleveId],
                [noteType]: sanitizedValue
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const notesData = Object.keys(notes).map(eleveId => {
            return {
                eleveId: eleveId,
                formation: formation,
                matiereId: matiere,
                ds: notes[eleveId].ds,
                examen: notes[eleveId].examen,
                tp: notes[eleveId].tp
            };
        });
    
        console.log('Notes Data:', notesData); // Inspecter les données envoyées
    
        try {
            const response = await axios.post('http://localhost:4000/saveNotes', { notes: notesData });
            console.log('Response:', response.data); // Inspecter la réponse du serveur
            alert('Notes enregistrées avec succès');
        } catch (error) {
            console.error('Erreur lors de l\'enregistrement des notes', error); // Inspecter l'erreur
            alert('Une erreur est survenue lors de l\'enregistrement des notes');
        }
    };
    
    return (
        <div className='presence-page'>
            <img src={menuIcon} alt="menu icon" className="menu-icon" onClick={toggleSidebar} />
            <div className={`sidebar ${isSidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}>
                <Sidebar1 />
            </div>
            <div className="presences-form">
                <h1>Gestion des Notes</h1>
                <div>
                    <label>Date: </label>
                    <input
                        type="date"
                        value={date}
                        onChange={handleDateChange}
                    />
                </div>
                <div>
                    <label>Formation: </label>
                    <select value={formation} onChange={handleFormationChange}>
                        {formations.map((formation) => (
                            <option key={formation} value={formation}>{formation}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Matière: </label>
                    {loadingMatieres ? (
                        <p>Chargement des matières...</p>
                    ) : (
                        <select value={matiere} onChange={handleMatiereChange}>
                            {matieres.map((matiere) => (
                                <option key={matiere._id} value={matiere._id}>{matiere.matiere}</option>
                            ))}
                        </select>
                    )}
                </div>
                {loadingEleves ? (
                    <p>Chargement des élèves...</p>
                ) : (
                    <form onSubmit={handleSubmit}>
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
                                {eleves.map(eleve => (
                                    <tr key={eleve._id}>
                                        <td>{`${eleve.nom} ${eleve.prenom}`}</td>
                                        <td>
                                            <input
                                                type="number"
                                                value={notes[eleve._id]?.ds || 0}
                                                onChange={(e) => handleNoteChange(eleve._id, 'ds', e.target.value)}
                                                min="0"
                                                max="20"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={notes[eleve._id]?.examen || 0}
                                                onChange={(e) => handleNoteChange(eleve._id, 'examen', e.target.value)}
                                                min="0"
                                                max="20"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={notes[eleve._id]?.tp || 0}
                                                onChange={(e) => handleNoteChange(eleve._id, 'tp', e.target.value)}
                                                min="0"
                                                max="20"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button type="submit">Enregistrer</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Notes;
