import React from "react";
import './Enseignant.css';
import { Routes, Route } from 'react-router-dom';
import Cours from "../../Components/Cours/Cours";
import Accueil from "../../Components/Accueil/Accueil";
import Semestre1 from "../../Components/Cours/Semestre1/Semestre1";

const Enseignant = () => {
    return (
        <div className="enseignant">
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<Accueil />} />
                    <Route path="/cours" element={<Cours />} />
                    <Route path="/devoirs" />
                    <Route path="/presences" />
                    <Route path="/notes" />
                    <Route path="/semestre-1" element={<Semestre1 />} />
                </Routes>  
            </div>   
        </div>
    );
}

export default Enseignant;
