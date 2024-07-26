
import React, { useState } from 'react';
import './Cours.css';
import menuIcon from '../../../../assets/menu-icon.png';
import Sidebar1 from '../Sidebar1/Sidebar1';   

const Cours = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };
    return (
        <div className="semestre-wrapper">
            <img src={menuIcon} alt="menu icon" className="menu-icon" onClick={toggleSidebar} />
            <div className={`sidebar ${isSidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}>
                <Sidebar1/>
                
            </div>
            <div className="main-content">
                <div className="header">
                    <h2>Gestion du personnel</h2>
                    <p>Accueil/Semestre 1/cours/Gestion du personnel</p>
                </div>
                <div className="content-sections">
                    <div className="content-left">
                        <h3>Centre du formation </h3>
                        <p>MY-ACADEMIE</p>
                        <p>Gestion du personnel</p>
                        <p>Année universitaire 2024-2025</p>
                        <p>Enseignant: Mme.Wafa Mzoughi</p>
                    </div>
                    <div className="content-right">
                        <h3>Recherche forums</h3>
                        <input type="text" placeholder="Rechercher" />
                        <button>Recherche avancée</button>
                        <h3>Dernières annonces</h3>
                        <p>(Aucune annonce n'a encore été publiée)</p>
                        <div>
                            <form>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cours;