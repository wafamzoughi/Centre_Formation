import React from 'react';
import './Formations.css';
import MarketingCommunication from '../../assets/Marketing & Communication.png'
import Ressourceshumaines from '../../assets/Ressources humaines.png'
import BusinessManagement from '../../assets/Business & Management.png'
import BanqueFinanceImmobilier from '../../assets/Banque, Finance & Immobilier.png'
import InformatiqueWeb from '../../assets/Informatique & Web.png'
import LanguesEtrangeres from '../../assets/Langues Etrangeres.png'
import GraphismeWebdesign from '../../assets/Graphisme & Webdesign.png'
import Sidebar from '../Sidebar/Sidebar';
const formations = [
    {
        icon: Ressourceshumaines,
        title: 'Ressources humaines',
        levels: ['Bac', 'Bac +2', 'Bac +3', 'Bac +5', 'Blocs de compétences', 'Formation Métier']
    },
    {
        icon: MarketingCommunication,
        title: 'Marketing & Communication',
        levels: ['Bac +3', 'Bac +5', 'Blocs de compétences']
    },
    {
        icon: BusinessManagement,
        title: 'Business & Management',
        levels: ['Bac', 'Bac +2', 'Bac +3', 'Bac +5', 'Blocs de compétences']
    },
    {
        icon: BanqueFinanceImmobilier,
        title: 'Banque, Finance & Immobilier',
        levels: ['Bac', 'Bac +2', 'Bac +3', 'Blocs de compétences', 'Formation Métier']
    },
    
    {
        icon: InformatiqueWeb,
        title: 'Informatique & Web',
        levels: ['Bac +2', 'Bac +3', 'Bac +5', 'Blocs de compétences', 'Formation Métier']
    },
    {
        icon: LanguesEtrangeres,
        title: 'Langues Étrangères',
        levels: ['Bac', 'Bac +2', 'Bac +3', 'Blocs de compétences', 'Formation Métier']
    },
    {
        icon: GraphismeWebdesign,
        title: 'Graphisme & Webdesign',
        levels: ['Bac', 'Bac +2', 'Bac +3', 'Blocs de compétences', 'Certification', 'Formation Métier']
    },
   
];

const Formations = () => {
    return (
        <div>
            <Sidebar />
        
        <div className="formations-container">
            {formations.map((formation, index) => (
                <div key={index} className="formation">
                    <img src={formation.icon} alt="" className="formation-icon" />
                    <h3><a href={`/${formation.title.toLowerCase().replace(/ /g, '-')}`}>{formation.title}</a></h3>
                    {formation.levels.map((level, levelIndex) => (
                        <p key={levelIndex}>{level}</p>
                    ))}
                </div>
            ))}
        </div>
        </div>
    );
};

export default Formations;
