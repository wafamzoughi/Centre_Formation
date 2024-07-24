import React, { useState } from 'react';
import './Semestre1.css';
import Sidebar from '../../Sidebar/Sidebar';
import menuIcon from '../../../assets/menu-icon.png';

const Semestre1 = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <div className="semestre-wrapper">
            <img src={menuIcon} alt="menu icon" className="menu-icon" onClick={toggleSidebar} />
            <div className={`sidebar ${isSidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}>
                <Sidebar />
                
            </div>
            <div className="semestre-container">
                {/* Content for Semestre 1 */}
            </div>
        </div>
    );
};

export default Semestre1;
