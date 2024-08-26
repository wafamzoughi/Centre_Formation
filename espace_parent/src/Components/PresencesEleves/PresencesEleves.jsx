import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PresencesEleves.css';

const PresencesEleves = () => {
    const [formation, setFormation] = useState('');
    const [matiere, setMatiere] = useState('');
    const [presences, setPresences] = useState([]);
    const [formations, setFormations] = useState([]);
    const [matieres, setMatieres] = useState([]);
    const [loadingMatieres, setLoadingMatieres] = useState(false);
    const [loadingPresences, setLoadingPresences] = useState(false);

    useEffect(() => {
        fetchFormations();
    }, []);

    useEffect(() => {
        if (formation) {
            fetchMatieres();
        }
    }, [formation]);

    useEffect(() => {
        if (formation && matiere) {
            fetchPresences();
        }
    }, [formation, matiere]);

    const fetchFormations = async () => {
        try {
            const response = await axios.get('http://localhost:4000/formations');
            setFormations(response.data);
            if (response.data.length > 0) {
                setFormation(response.data[0]._id); // Select the first formation by default
            }
        } catch (error) {
            console.error('Error fetching formations:', error);
            alert('Erreur lors de la récupération des formations.');
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
                setMatiere(response.data[0]._id); // Select the first subject by default
            }
        } catch (error) {
            console.error('Error fetching subjects:', error);
            alert('Erreur lors de la récupération des matières.');
        } finally {
            setLoadingMatieres(false);
        }
    };

    const fetchPresences = async () => {
        setLoadingPresences(true);
        try {
            const response = await axios.get('http://localhost:4000/touslespresences', {
                params: { formation, matiere }
            });
            console.log(response.data); // Log the response
            setPresences(response.data);
        } catch (error) {
            console.error('Error fetching presences:', error);
            alert('Erreur lors de la récupération des présences.');
        } finally {
            setLoadingPresences(false);
        }
    };
    
    const handleFormationChange = (e) => {
        setFormation(e.target.value);
    };

    const handleMatiereChange = (e) => {
        setMatiere(e.target.value);
    };

    return (
        <div className='presences'>
            <div className="consultation-form">
                <h1>Consultation des Présences</h1>
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
                {loadingPresences ? (
                    <p>Chargement des présences...</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Nom de l'élève</th>
                                <th>Présent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {presences.length > 0 ? (
                                presences.map(presence => (
                                    <tr key={presence.eleveId._id}>
                                        <td>{new Date(presence.date).toLocaleDateString('fr-FR')}</td>
                                        <td>{`${presence.eleveId.nom} ${presence.eleveId.prenom}`}</td>
                                        <td>{presence.present ? 'Présent' : 'Absent'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">Aucune présence disponible pour cette matière.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default PresencesEleves;
