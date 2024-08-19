import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Devoirs.css';
import menuIcon from '../../../../../assets/menu-icon.png';
import PDF from '../../../../../assets/pdf.png';
import Sidebar1 from '../Sidebar1/Sidebar1';
import { useLocation } from 'react-router-dom';

const Devoirs = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [assignments, setAssignments] = useState([]);
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const selectedMatiere = queryParams.get('matiere');

    useEffect(() => {
    

        const fetchAssignments = async () => {
            try {
                const response = await axios.get('http://localhost:4000/touslesdevoirs');
                setAssignments(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des devoirs', error);
            }
        };

        fetchAssignments();
    }, []);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    // Filtrer les chapitres selon la matière sélectionnée
    const filteredAssignments = assignments.filter(assignment => assignment.nom_matiere === selectedMatiere);

    return (
        <div className="semestre-wrapper1">
            <img src={menuIcon} alt="menu icon" className="menu-icon" onClick={toggleSidebar} />
            <div className={`sidebar ${isSidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}>
                <Sidebar1 />
            </div>
            <div className="cours-form">
                <div className="header">
                    {selectedMatiere && <h2>{selectedMatiere}</h2>}
                    <p>Accueil/Semestre 1/Devoirs/{selectedMatiere}</p>
                </div>
                <div className="content-sections">
                    <div className="content-left">
                        <h3>Centre du formation </h3>
                        <p>MY-ACADEMIE</p>
                        <p>{selectedMatiere}</p>
                        <p>Année universitaire 2024-2025</p>
                        
                    
                        <div className="published-chapters">
                        <h2>Devoirs publiés :</h2>
                            {filteredAssignments.map((assignment, index) => (
                                <div key={index}>
                                    <h3>Devoirs :</h3>
                                    <img src={PDF} alt='pdf' width='20px' />
                                    <a href={`http://localhost:4000${assignment.devoir_pdf}`} download>Devoir {assignment.nom_matiere}</a>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="content-right">
                        <h3>Recherche forums</h3>
                        <input type="text" placeholder="Rechercher" />
                        <button>Recherche avancée</button>
                        <h3>Dernières annonces</h3>
                        <ul>
                            <li>Annonce 1</li>
                            <li>Annonce 2</li>
                            <li>Annonce 3</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Devoirs;
