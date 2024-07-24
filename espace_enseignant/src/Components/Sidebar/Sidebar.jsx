import React from "react";
import './Sidebar.css';
import{Link} from 'react-router-dom';
import semestre1 from '../../assets/semestre1.png'
import semestre2 from '../../assets/semestre2.png'
import Accueil from '../../assets/home.png'
const Sidebar = () => {
    return(
        <div className="sidebar">
            <Link to={'/'} style={{textDecoration:"none"}}>
                <div className="sidebar-item">
                <img  src={Accueil} alt="" width="35" className="image" />   
                    <p>Accueil</p>
                </div>
            </Link>
            <Link to={'/semestre-1'} style={{textDecoration:"none"}}>
                <div className="sidebar-item">
                <img  src={semestre1} alt="" width="35" className="image" />
                    <p>Semestre 1</p>
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
export default Sidebar