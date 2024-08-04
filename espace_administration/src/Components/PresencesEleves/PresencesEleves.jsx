import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PresencesEleves.css';

const formationsList = [
    'Informatique & Web',
    'Ressources humaines',
    'Marketing & Communication',
    'Business & Management',
    'Banque, Finance & Immobilier',
    'Langues Étrangères',
    'Graphisme & Webdesign'
];

const PresencesEleves = () => {
    const [formation, setFormation] = useState(formationsList[0]);
    const [presences, setPresences] = useState([]);

    useEffect(() => {
        fetchPresences();
    }, [formation]);

    const fetchPresences = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/presences-par-formation/${formation}`);
            setPresences(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des présences', error);
        }
    };

    const handleFormationChange = (e) => {
        setFormation(e.target.value);
    };

    return (
        <div className="presence-page">
            <h1>Gestion des Présences</h1>
            <div>
                <label>Formation: </label>
                <select value={formation} onChange={handleFormationChange}>
                    {formationsList.map((formation, index) => (
                        <option key={index} value={formation}>{formation}</option>
                    ))}
                </select>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Présence</th>
                    </tr>
                </thead>
                <tbody>
                    {presences.map((presence, index) => (
                        <tr key={index}>
                            <td>{presence.date}</td>
                            <td>{presence.nom}</td>
                            <td>{presence.prenom}</td>
                            <td>{presence.present ? 'Présent' : 'Absent'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PresencesEleves;
