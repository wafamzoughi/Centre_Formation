import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NotesEleves.css';

const NotesEleves = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [formation, setFormation] = useState('');
    const [matiere, setMatiere] = useState('');
    const [notes, setNotes] = useState([]);
    const [formations, setFormations] = useState([]);
    const [matieres, setMatieres] = useState([]);
    const [loadingMatieres, setLoadingMatieres] = useState(false);
    const [loadingNotes, setLoadingNotes] = useState(false);

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
            fetchNotes();
        }
    }, [formation, matiere]);

    const fetchFormations = async () => {
        try {
            const response = await axios.get('http://localhost:4000/formations');
            setFormations(response.data);
            if (response.data.length > 0) {
                setFormation(response.data[0]._id); // Sélectionner la première formation par défaut
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des formations:', error);
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
            console.error('Erreur lors de la récupération des matières:', error);
        } finally {
            setLoadingMatieres(false);
        }
    };

    const fetchNotes = async () => {
        setLoadingNotes(true);
        try {
            const response = await axios.get('http://localhost:4000/notes-par-formation-et-matiere', {
                params: { formation, matiereId: matiere }
            });
            setNotes(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des notes:', error);
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
        <div className='notes'>
            <div className="consultation-form">
                <h1>Consultation des Notes</h1>
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
                {loadingNotes ? (
                    <p>Chargement des notes...</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Nom de l'élève</th>
                                <th>DS</th>
                                <th>Examen</th>
                                <th>TP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notes.length > 0 ? (
                                notes.map(note => (
                                    <tr key={note.eleveId._id}>
                                        <td>{`${note.eleveId.nom} ${note.eleveId.prenom}`}</td>
                                        <td>{note.ds}</td>
                                        <td>{note.examen}</td>
                                        <td>{note.tp}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">Aucune note disponible pour cette matière.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default NotesEleves;
