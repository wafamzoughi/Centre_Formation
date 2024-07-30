import React from "react";
import './Sidebar1.css';
import{Link} from 'react-router-dom';
import semestre1 from '../../../../assets/semestre1.png'
import semestre2 from '../../../../assets/semestre2.png'
import cours from '../../../../assets/lesson.png'
import devoirs from '../../../../assets/examen.png'
import notes from '../../../../assets/note.png'
import presences from '../../../../assets/absence.png'

const Sidebar1 = () => {
    
    return(

        <div className="sidebar">
            
            <Link to={'/semestre-1'} style={{textDecoration:"none"}}>
                <div className="sidebar-item">
                <img  src={semestre1} alt="" width="35" className="image" />
                    <p>Semestre 1</p>
                </div>
            </Link>
        
            <Link to={'/cours'} style={{textDecoration:"none"}}>
                <div className="sidebar-item">
                <img  src={cours} alt="" width="35" className="image" />
                    <p>Cours</p>
                </div>
            </Link>
            
            <Link to={'/devoirs'} style={{textDecoration:"none"}}>
                <div className="sidebar-item">
                <img   src={devoirs} alt="" width="35" className="image"/>
                    <p>Devoirs</p>
                </div>
            </Link>
            <Link to={'/presences'} style={{textDecoration:"none"}}>
                <div className="sidebar-item">
                <img  src={presences} alt="" width="35" className="image" />
                    <p>Presénces</p>
                </div>
            </Link>
            
            <Link to={'/notes'} style={{textDecoration:"none"}}>
                <div className="sidebar-item">
                <img   src={notes} alt="" width="35" className="image"/>
                    <p>Notes</p>
                </div>
            </Link>
            <Link to={'/semestre-2'} style={{textDecoration:"none"}}>
                <div className="sidebar-item">
                <img   src={semestre2} alt="" width="35" className="image"/>
                    <p>Semestre 2</p>
                </div>
            </Link>
            </div>
            
        
    )
}
export default Sidebar1