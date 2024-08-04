import React from "react";
import './Administration.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Eleves from "../../Components/Elèves/Eleves";
import Enseignants from "../../Components/Enseignants/Enseignants";
import Personnels from "../../Components/Personnels/Personnels";
import Formations from "../../Components/Formations/Formations";
import Ressourceshumaines from "../../Components/Formations/Ressources humaines/Ressourceshumaines";
import MarketingCommunication from "../../Components/Formations/MarketingCommunication/MarketingCommunication";
import BusinessManagement from "../../Components/Formations/BusinessManagement/BusinessManagement";
import BanqueFinanceImmobilier from "../../Components/Formations/banque-finance-immobilier/BanqueFinanceImmobilier";
import InformatiqueWeb from "../../Components/Formations/InformatiqueWeb/InformatiqueWeb";
import GraphismeWebdesign from "../../Components/Formations/GraphismeWebdesign/GraphismeWebdesign";
import LanguesEtrangeres from "../../Components/Formations/LanguesEtrangeres/LanguesEtrangeres";
import PresencesEleves from "../../Components/PresencesEleves/PresencesEleves";


const Administration = () => {
    return (
        <div className="administration">
            <Sidebar />
            <div className="main-content">
                <Routes>
                    <Route path="/TableauDeBord"/>
                    <Route path="/Eleves" element={<Eleves />} />
                    <Route path="/Formations" element={<Formations />} />
                    <Route path="/Personnels" element={<Personnels />}/>
                    <Route path="/Enseignants"  element={<Enseignants />}/>
                    <Route path="/Notes" />
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

export default Administration;
