import React, { useState } from 'react';
import './Semestre1.css';
import { Link } from 'react-router-dom';
import Sidebar from '../../Sidebar/Sidebar';
import menuIcon from '../../../assets/menu-icon.png';
import Cours from '../../../assets/lesson.png';
import Devoirs from '../../../assets/examen.png';
import Presences from '../../../assets/absence.png';
import Notes from '../../../assets/note.png';
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

const Semestre1 = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <div className="semestre-wrapper">
            <img src={menuIcon} alt="menu icon" className="menu-icon" onClick={toggleSidebar} />
            <div className={`sidebar ${isSidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}>
                <Sidebar />
                
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

export default Semestre1;
