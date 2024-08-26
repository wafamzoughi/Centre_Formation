import React from "react";
import './Sidebar.css';
import{Link} from 'react-router-dom';
import formations from '../../assets/formations.png'
import note from '../../assets/note.png'
import absence from '../../assets/absence.png'

const Sidebar = () => {
    return(
        <div className="sidebar">
            
            <Link to={'/'} style={{textDecoration:"none"}}>
                <div className="sidebar-item">
                <img src={formations} alt="" width="35" />   
                    <strong>Formations</strong>
                </div>
            </Link>
            
            <Link to={'/Notes'} style={{textDecoration:"none"}}>
                <div className="sidebar-item">
                <img src={note} alt="" width="35" />    
                    <strong>Notes</strong>
                </div>
            </Link>
            <Link to={'/Presences'} style={{textDecoration:"none"}}>
                <div className="sidebar-item">
                <img src={absence} alt="" width="35" />   
                    <strong>Présences</strong>
                </div>
            </Link>
        </div>
    )
}
export default Sidebar