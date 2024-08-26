import React from "react";
import './Sidebar.css';
import{Link} from 'react-router-dom';
import tableau_de_bord from '../../assets/dashboard.png'
import eleves from '../../assets/eleves.png'
import enseignant from '../../assets/enseignant.png'
import formations from '../../assets/formations.png'
import note from '../../assets/note.png'
import personnelles from '../../assets/personelles.png'
import absence from '../../assets/absence.png'

const Sidebar = () => {
    return(
        <div className="sidebar">
            <Link to={'/'} style={{textDecoration:"none"}}>
                <div className="sidebar-item">
                <img src={tableau_de_bord} alt="" width="35" />
                    <strong>Tableau de bord</strong>
                </div>
            </Link>
            <Link to={'/Eleves'} style={{textDecoration:"none"}}>
                <div className="sidebar-item">
                <img src={eleves} alt="" width="35" />
                    <strong>Elèves</strong>
                </div>
            </Link>
            <Link to={'/Formations'} style={{textDecoration:"none"}}>
                <div className="sidebar-item">
                <img src={formations} alt="" width="35" />   
                    <strong>Formations</strong>
                </div>
            </Link>
            <Link to={'/Personnels'}  style={{textDecoration:"none"}}>
                <div className="sidebar-item">
                <img src={personnelles} alt="" width="35" />    
                    <strong>Personnels</strong>
                </div>
            </Link>
            <Link to={'/Enseignants'} style={{textDecoration:"none"}}>
                <div className="sidebar-item">
                <img src={enseignant} alt="" width="35" />
                    <strong>Enseignants</strong>
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