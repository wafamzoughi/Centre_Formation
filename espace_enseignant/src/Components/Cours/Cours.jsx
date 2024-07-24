import React from 'react';
import Semestre1 from '../../assets/one.png'
import Semestre2 from '../../assets/two.png'
import './Cours.css';
const Cour = [
    {
        icon: Semestre1,
        title: 'Semestre 1',
    },
    {
        icon: Semestre2,
        title: 'Semestre 2',
    },
];
const Cours = () => {
        return (
            <div className="semestre-container">
                
                {Cour.map((semestre, index) => (
                    <div key={index} className="semestre">
                        <img src={semestre.icon} alt="" className="semestre-icon" width={100} />
                        <h3><a href={`/${semestre.title.toLowerCase().replace(/ /g, '-')}`}>{semestre.title}</a></h3>
                    </div>
                ))}
            </div>
        );
    };

export default Cours;
