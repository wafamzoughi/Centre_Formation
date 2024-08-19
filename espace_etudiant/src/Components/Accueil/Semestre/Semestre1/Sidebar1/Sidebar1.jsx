import React from "react";
import './Sidebar1.css';
import{Link} from 'react-router-dom';
import semestre1 from '../../../../../assets/semestre1.png'
import semestre2 from '../../../../../assets/semestre2.png'
import cours from '../../../../../assets/lesson.png'
import devoirs from '../../../../../assets/examen.png'


const Sidebar1 = () => {
    
    return(

        <div className="sidebar">
            
            <Link to={'/semestre-1'} style={{textDecoration:"none"}}>
                <div className="sidebar-item">
                <img  src={semestre1} alt="" width="35" className="image" />
                    <p>Semestre 1</p>
                </div>
            </Link>
        
            <Link to={'/cours?matiere=Gestion%20du%20personnel'} style={{textDecoration:"none"}}>
                <div className="sidebar-item">
                <img  src={cours} alt="" width="35" className="image" />
                    <p>Cours</p>
                </div>
            </Link>
            
            <Link to={'/devoirs?matiere=Gestion%20du%20personnel'} style={{textDecoration:"none"}}>
                <div className="sidebar-item">
                <img   src={devoirs} alt="" width="35" className="image"/>
                    <p>Devoirs</p>
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