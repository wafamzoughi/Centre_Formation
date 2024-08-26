import React from "react";
import './Sidebar1.css';
import{Link} from 'react-router-dom';
import semestre1 from '../../../../assets/semestre1.png'
import semestre2 from '../../../../assets/semestre2.png'
import cours from '../../../../assets/lesson.png'
import devoirs from '../../../../assets/examen.png'
import notes from '../../../../assets/note.png'
import presences from '../../../../assets/absence.png'
import accueil from '../../../../assets/home.png'
const Sidebar1 = () => {
    
    return(

        <div className="sidebar2">
            <Link to={'/'} style={{textDecoration:"none"}}>
                <div className="sidebar2-item">
                <img src={accueil} alt="" width="35" className="image" />
                    <strong>Accueil</strong>
                </div>
            </Link>
            <Link to={'/semestre-1'} style={{textDecoration:"none"}}>
                <div className="sidebar2-item">
                <img  src={semestre1} alt="" width="35" className="image" />
                    <strong>Semestre 1</strong>
                </div>
            </Link>
        
            <Link to={'/cours'} style={{textDecoration:"none"}}>
                <div className="sidebar2-item">
                <img  src={cours} alt="" width="35" className="image" />
                    <strong>Cours</strong>
                </div>
            </Link>
            
            <Link to={'/devoirs'} style={{textDecoration:"none"}}>
                <div className="sidebar2-item">
                <img   src={devoirs} alt="" width="35" className="image"/>
                    <strong>Devoirs</strong>
                </div>
            </Link>
            <Link to={'/présences'} style={{textDecoration:"none"}}>
                <div className="sidebar2-item">
                <img  src={presences} alt="" width="35" className="image" />
                    <strong>Presénces</strong>
                </div>
            </Link>
            
            <Link to={'/notes'} style={{textDecoration:"none"}}>
                <div className="sidebar2-item">
                <img   src={notes} alt="" width="35" className="image"/>
                    <strong>Notes</strong>
                </div>
            </Link>
            <Link to={'/semestre-2'} style={{textDecoration:"none"}}>
                <div className="sidebar2-item">
                <img   src={semestre2} alt="" width="35" className="image"/>
                    <strong>Semestre 2</strong>
                </div>
            </Link>
            </div>
            
        
    )
}
export default Sidebar1