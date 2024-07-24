import React from "react";
import './Navbar.css';
import menuIcon from '../../assets/menu-icon.png'; 

const Navbar = ({ toggleSidebar }) => {
    return(
        <div className="navbar">
            <img src={menuIcon} alt="menu icon" className="menu-icon" onClick={toggleSidebar} /> 
            <div className="nav-logo-name">
                <h2>ESPACE</h2>
                <h3>ENSEIGNANT</h3>
            </div>
        </div>
    );
}
export default Navbar;
