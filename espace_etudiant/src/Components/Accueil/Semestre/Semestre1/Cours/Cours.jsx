import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cours.css';
import menuIcon from '../../../../../assets/menu-icon.png';
import PDF from '../../../../../assets/pdf.png';
import Sidebar1 from '../Sidebar1/Sidebar1';
import { useLocation } from 'react-router-dom';

const Cours = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [chapters, setChapters] = useState([]);
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const selectedMatiere = queryParams.get('matiere');

    useEffect(() => {
    

        const fetchChapters = async () => {
            try {
                const response = await axios.get('http://localhost:4000/tousleschapitres');
                setChapters(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des chapitres', error);
            }
        };

        fetchChapters();
    }, []);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    // Filtrer les chapitres selon la matière sélectionnée
    const filteredChapters = chapters.filter(chapter => chapter.nom_matiere === selectedMatiere);

    return (
        <div className="semestre-wrapper1">
            <img src={menuIcon} alt="menu icon" className="menu-icon" onClick={toggleSidebar} />
            <div className={`sidebar ${isSidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}>
                <Sidebar1 />
            </div>
            <div className="cours-form">
                <div className="header">
                    {selectedMatiere && <h2>{selectedMatiere}</h2>}
                    <p>Accueil/Semestre 1/cours/{selectedMatiere}</p>
                </div>
                <div className="content-sections">
                    <div className="content-left">
                        <h3>Centre du formation </h3>
                        <p>MY-ACADEMIE</p>
                        <p>{selectedMatiere}</p>
                        <p>Année universitaire 2024-2025</p>
                        
                    
                        <div className="published-chapters">
                            <h2>Chapitres publiés:</h2>
                            {filteredChapters.map((chapter, index) => (
                                <div key={index}>
                                    <h1>Chapitre {chapter.num_chap}: {chapter.nom_chap}</h1>
                                    <h3>Ressource:</h3>
                                    <img src={PDF} alt='pdf' width='20px'></img>
                                    <a href={`http://localhost:4000${chapter.cours_pdf}`} download>  Cours {chapter.nom_chap}</a>
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

export default Cours;
