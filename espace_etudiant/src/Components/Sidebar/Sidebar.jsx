import React from "react";
import './Sidebar.css';
import formations from '../../assets/formations.png'
import accueil from '../../assets/home.png'
import{Link} from 'react-router-dom';


const Sidebar = () => {
    return(
        <div className="sidebar">
            <Link to={'/'} style={{textDecoration:"none"}}>
                <div className="sidebar-item">
                <img src={accueil} alt="" width="35" />
                    <strong>Accueil</strong>
                </div>
            </Link>
            <Link to={'/Formations'} style={{textDecoration:"none"}}>
                <div className="sidebar-item">
                <img src={formations} alt="" width="35" />   
                    <strong>Formations</strong>
                </div>
            </Link>
            
        </div>
    )
}
export default Sidebar