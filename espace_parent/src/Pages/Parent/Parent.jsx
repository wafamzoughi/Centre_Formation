import React from "react";
import './Parent.css';
import { Routes, Route } from 'react-router-dom';
import Formations from "../../Components/Formations/Formations";
import Ressourceshumaines from "../../Components/Formations/Ressources humaines/Ressourceshumaines";
import MarketingCommunication from "../../Components/Formations/MarketingCommunication/MarketingCommunication";
import BusinessManagement from "../../Components/Formations/BusinessManagement/BusinessManagement";
import BanqueFinanceImmobilier from "../../Components/Formations/banque-finance-immobilier/BanqueFinanceImmobilier";
import InformatiqueWeb from "../../Components/Formations/InformatiqueWeb/InformatiqueWeb";
import GraphismeWebdesign from "../../Components/Formations/GraphismeWebdesign/GraphismeWebdesign";
import LanguesEtrangeres from "../../Components/Formations/LanguesEtrangeres/LanguesEtrangeres";
import PresencesEleves from "../../Components/PresencesEleves/PresencesEleves";
import NotesEleves from "../../Components/NotesEleves/NotesEleves";
import Sidebar from "../../Components/Sidebar/Sidebar";


const Parent = () => {
    return (
        <div className="etudiant">
            <Sidebar/>
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<Formations />}/>
                    <Route path="/Notes" element={<NotesEleves/>}/>
                    <Route path="/Presences" element={<PresencesEleves/>}  />
                    <Route path="/ressources-humaines"  element={<Ressourceshumaines />} />
                    <Route path="/marketing-&-communication"  element={<MarketingCommunication />} />
                    <Route path="/business-&-management"  element={<BusinessManagement />} />
                    <Route path="/banque,-finance-&-immobilier"  element={<BanqueFinanceImmobilier />} />
                    <Route path="/informatique-&-web"  element={<InformatiqueWeb />} />
                    <Route path="/graphisme-&-webdesign"  element={<GraphismeWebdesign />} />
                    <Route path="/langues-étrangères"  element={<LanguesEtrangeres/>} />
                    
                    
                </Routes>
            </div>
        </div>
    );
}

export default Parent;
