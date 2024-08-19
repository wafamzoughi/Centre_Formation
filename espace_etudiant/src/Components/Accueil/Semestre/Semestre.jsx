import React from 'react';
import Semestre1Icon from '../../../assets/one.png';
import Semestre2Icon from '../../../assets/two.png';
import './Semestre.css';
import { useLocation, Link } from 'react-router-dom';

const semestre1_2 = [
    {
        icon: Semestre1Icon,
        title: 'Semestre 1',
    },
    {
        icon: Semestre2Icon,
        title: 'Semestre 2',
    },
];

const Semestre = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedMatiere = queryParams.get('matiere');

    return (
        <div className="semestrecontainer1">
            {semestre1_2.map((semestre, index) => (
                <div key={index} className="semestre">
                    <img src={semestre.icon} alt="" className="semestre-icon" width={100} />
                    <h3>
                        <Link
                            to={`/${semestre.title.toLowerCase().replace(/ /g, '-')}?matiere=${encodeURIComponent(selectedMatiere)}`}
                        >
                            {semestre.title}
                        </Link>
                    </h3>
                </div>
            ))}
        </div>
    );
};

export default Semestre;
