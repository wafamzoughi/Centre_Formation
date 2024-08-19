import React, { useState } from 'react';
import './Semestre1.css';
import { Link, useLocation } from 'react-router-dom';
import Sidebar from '../../../Sidebar/Sidebar';
import menuIcon from '../../../../assets/menu-icon.png';
import CoursIcon from '../../../../assets/lesson.png';
import DevoirsIcon from '../../../../assets/examen.png';

const accueil = [
    {   
        icon: CoursIcon,
        title: 'Cours',
    },
    {
        icon: DevoirsIcon,
        title: 'Devoirs',
    },
];

const Semestre1 = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedMatiere = queryParams.get('matiere');

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <div className="semestrewrapper">
            <img src={menuIcon} alt="menu icon" className="menu-icon" onClick={toggleSidebar} />
            <div className={`sidebar ${isSidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}>
                <Sidebar />
            </div>

            <div className={`accueil-content ${isSidebarVisible ? 'shrink' : 'expand'}`}>
                <div className="tache-container">
                    {accueil.map((tache, index) => (
                        <div key={index} className="tache">
                            <img src={tache.icon} alt={tache.title} className="tache-icon" width={100} />
                            <h3>
                                <Link
                                    to={`/${tache.title.toLowerCase()}?matiere=${encodeURIComponent(selectedMatiere)}`}
                                    className="tache-link"
                                >
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
