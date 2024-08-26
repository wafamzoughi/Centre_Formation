import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar1 from '../Sidebar1/Sidebar1';
import menuIcon from '../../../../assets/menu-icon.png';
import './Presences.css';

const Presences = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [eleves, setEleves] = useState([]);
    const [attendance, setAttendance] = useState({});
    const [formations, setFormations] = useState([]);
    const [formation, setFormation] = useState('');
    const [matieres, setMatieres] = useState([]);
    const [matiere, setMatiere] = useState('');
    const [loadingMatieres, setLoadingMatieres] = useState(false);
    
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
            fetchAttendance();
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
        try {
            const response = await axios.get('http://localhost:4000/tousleseleves', {
                params: { formation }
            });
            setEleves(response.data);
            const initialAttendance = {};
            response.data.forEach(eleve => {
                initialAttendance[eleve._id] = false; // Initialisez tous les élèves comme absents
            });
            setAttendance(initialAttendance);
        } catch (error) {
            console.error('Erreur lors de la récupération des élèves', error);
        }
    };

    const fetchAttendance = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/presence/${date}`);
            const attendanceData = response.data.reduce((acc, record) => {
                acc[record.eleveId] = record.present;
                return acc;
            }, {});
            setAttendance(prev => ({ ...prev, ...attendanceData }));
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'assiduité', error);
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

    const handleAttendanceChange = (eleveId) => {
        setAttendance(prev => ({
            ...prev,
            [eleveId]: !prev[eleveId]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const attendanceData = Object.keys(attendance).map(eleveId => {
            const eleve = eleves.find(e => e._id === eleveId);
            return {
                eleveNom: eleve ? eleve.nom : '',
                elevePrenom: eleve ? eleve.prenom : '',
                date: new Date().toISOString().split('T')[0],
                present: attendance[eleveId],
                formationNom: formation,
                matiereNom: matiere || '', // Assurez-vous que matiere est défini ici
            };
        });
        
        try {
            await axios.post('http://localhost:4000/savePresence', { presence: attendanceData });
            alert('Présence enregistrée avec succès');
        } catch (error) {
            console.log('Données d\'assiduité avant l\'envoi:', attendanceData);

        }
    };

    return (
        <div className='presence-page'>
            <img src={menuIcon} alt="menu icon" className="menu-icon" onClick={toggleSidebar} />
            <div className={`sidebar ${isSidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}>
                <Sidebar1 />
            </div>
            <div className="presences-form">
            <h1>Gestion de la Présence</h1>
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
            <form onSubmit={handleSubmit}>
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Présence</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eleves.map(eleve => (
                            <tr key={eleve._id}>
                                <td>{`${eleve.nom} ${eleve.prenom}`}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={attendance[eleve._id] || false}
                                        onChange={() => handleAttendanceChange(eleve._id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button type="submit">Enregistrer</button>
            </form>
            </div>
        </div>
    );
};

export default Presences;