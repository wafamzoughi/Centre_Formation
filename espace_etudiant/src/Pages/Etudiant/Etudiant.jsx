import React from "react";
import './Etudiant.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Formations from "../../Components/Formations/Formations";
import Accueil from "../../Components/Accueil/Accueil";
import Ressourceshumaines from "../../Components/Formations/Ressources humaines/Ressourceshumaines";
import MarketingCommunication from "../../Components/Formations/MarketingCommunication/MarketingCommunication";
import BusinessManagement from "../../Components/Formations/BusinessManagement/BusinessManagement";
import BanqueFinanceImmobilier from "../../Components/Formations/banque-finance-immobilier/BanqueFinanceImmobilier";
import InformatiqueWeb from "../../Components/Formations/InformatiqueWeb/InformatiqueWeb";
import GraphismeWebdesign from "../../Components/Formations/GraphismeWebdesign/GraphismeWebdesign";
import LanguesEtrangeres from "../../Components/Formations/LanguesEtrangeres/LanguesEtrangeres";
import Cours from "../../Components/Accueil/Semestre/Semestre1/Cours/Cours";
import Devoirs from "../../Components/Accueil/Semestre/Semestre1/Devoirs/Devoirs";
import Semestre from "../../Components/Accueil/Semestre/Semestre";
import Semestre1 from "../../Components/Accueil/Semestre/Semestre1/Semestre1";


const Etudiant = () => {
    return (
        <div className="etudiant">
            
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<Accueil />}/>
                    <Route path="/Formations" element={<Formations />} />
                    <Route path="/ressources-humaines"  element={<Ressourceshumaines />} />
                    <Route path="/marketing-&-communication"  element={<MarketingCommunication />} />
                    <Route path="/business-&-management"  element={<BusinessManagement />} />
                    <Route path="/banque,-finance-&-immobilier"  element={<BanqueFinanceImmobilier />} />
                    <Route path="/informatique-&-web"  element={<InformatiqueWeb />} />
                    <Route path="/graphisme-&-webdesign"  element={<GraphismeWebdesign />} />
                    <Route path="/langues-étrangères"  element={<LanguesEtrangeres/>} />
                    <Route path="/matierecourrent/:matiere" element={<Accueil />} />
                    <Route path="/cours" element={<Cours/> } />
                    <Route path="/devoirs" element={<Devoirs/> } />
                    <Route path="/semestre-1" element={<Semestre1 /> }/>
                    <Route path="/semestre" element={<Semestre/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default Etudiant;
