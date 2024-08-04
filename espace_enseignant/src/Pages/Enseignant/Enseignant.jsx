import React from "react";
import './Enseignant.css';
import { Routes, Route } from 'react-router-dom';
import Accueil from "../../Components/Accueil/Accueil";
import Semestre1 from "../../Components/Semestre/Semestre1/Semestre1";
import Semestre from "../../Components/Semestre/Semestre";
import Cours from "../../Components/Semestre/Semestre1/Cours/Cours";
import Devoirs from "../../Components/Semestre/Semestre1/Devoirs/Devoirs";
import Presence from "../../Components/Semestre/Semestre1/Presences/Presences";

const Enseignant = () => {
    return (
        <div className="enseignant">
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<Accueil />} />
                    <Route path="/cours" element={<Cours/> } />
                    <Route path="/devoirs" element={<Devoirs/> } />
                    <Route path="/presences" element={<Presence/>}/>
                    <Route path="/notes" />
                    <Route path="/semestre-1" element={<Semestre1 />} />
                    <Route path="/semestre" element={<Semestre/>}/>
                    
                </Routes>  
            </div>   
        </div>
    );
}

export default Enseignant;
