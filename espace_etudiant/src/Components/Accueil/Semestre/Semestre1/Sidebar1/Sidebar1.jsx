import React from "react";
import { Link, useLocation } from 'react-router-dom';
import './Sidebar1.css';
import semestre1 from '../../../../../assets/semestre1.png';
import semestre2 from '../../../../../assets/semestre2.png';
import cours from '../../../../../assets/lesson.png';
import devoirs from '../../../../../assets/examen.png';
import accueil from '../../../../../assets/home.png';

const Sidebar1 = () => {
    const location = useLocation();
    
    // Récupérer la matière courante des paramètres de requête
    const searchParams = new URLSearchParams(location.search);
    const matiereCourante = searchParams.get('matiere') || 'Gestion du personnel'; // Default to 'Gestion du personnel'

    return (
        <div className="sidebar">
            <Link to={'/'} style={{textDecoration: "none"}}>
                <div className="sidebar-item">
                    <img src={accueil} alt="accueil" width="35" className="image" />
                    <strong>Accueil</strong>
                </div>
            </Link>
            <Link to={'/semestre-1'} style={{textDecoration: "none"}}>
                <div className="sidebar-item">
                    <img src={semestre1} alt="Semestre 1" width="35" className="image" />
                    <strong>Semestre 1</strong>
                </div>
            </Link>

            <Link to={`/cours?matiere=${encodeURIComponent(matiereCourante)}`} style={{textDecoration: "none"}}>
                <div className="sidebar-item">
                    <img src={cours} alt="Cours" width="35" className="image" />
                    <strong>Cours</strong>
                </div>
            </Link>
            
            <Link to={`/devoirs?matiere=${encodeURIComponent(matiereCourante)}`} style={{textDecoration: "none"}}>
                <div className="sidebar-item">
                    <img src={devoirs} alt="Devoirs" width="35" className="image"/>
                    <strong>Devoirs</strong>
                </div>
            </Link>
            
            <Link to={'/semestre-2'} style={{textDecoration: "none"}}>
                <div className="sidebar-item">
                    <img src={semestre2} alt="Semestre 2" width="35" className="image"/>
                    <strong>Semestre 2</strong>
                </div>
            </Link>
        </div>
    );
};

export default Sidebar1;
