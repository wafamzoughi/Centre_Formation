import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cours from '../../assets/lesson.png';
import Devoirs from '../../assets/examen.png';
import Presences from '../../assets/absence.png';
import Notes from '../../assets/note.png';
import './Accueil.css';

// Sample static data for illustration
const accueil = [
    {   
        icon: Cours,
        title: 'Cours',
    },
    {
        icon: Devoirs,
        title: 'Devoirs',
    },
    {
        icon: Presences,
        title: 'Présences',
    },
    {
        icon: Notes,
        title: 'Notes',
    },
];

const Accueil = () => {
    const [matieres, setMatieres] = useState([]);

    useEffect(() => {
        const fetchMatieres = async () => {
            try {
                const response = await axios.get('http://localhost:4000/touslesmatieres');
                setMatieres(response.data);
            } catch (error) {
                console.error('Error fetching matieres:', error);
            }
        };

        fetchMatieres();
    }, []);

    return (
        <div className="accueil-layout">
            <div className="sidebar">
                {matieres.map((matieres, index) => (
                    <Link  style={{ textDecoration: "none" }} >
                        <div className="sidebar-item">
                            <p>{matieres.matiere}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="accueil-content">
                <div className="tache-container">
                    {accueil.map((tache, index) => (
                        <div key={index} className="tache">
                            <img src={tache.icon} alt={tache.title} className="tache-icon" width={100} />
                            <h3>
                                <Link to={`/${tache.title.toLowerCase().replace(/ /g, '-')}`} className="tache-link">
                                    {tache.title}
                                </Link>
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Accueil;
