import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Accueil.css';
import Sidebar from '../Sidebar/Sidebar';

const Accueil = () => {
    const [matieres, setMatieres] = useState([]);

    useEffect(() => {
        const fetchMatieres = async () => {
            try {
                const response = await axios.get('http://localhost:4000/formations-with-teachers');
                setMatieres(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMatieres();
    }, []);

    return (
        <div>
            <Sidebar />
            <div className="accueil">
                <h1 className='Catégoriesdecours'>Catégories de cours</h1>
                {matieres.map((formation, index) => (
                    <div key={index} className="formationn">
                        <h3>{formation.formation}</h3>
                        {formation.matieres.map((matiere, matiereIndex) => (
                            <div key={matiereIndex} className="matiere">
                                <Link
                                    to={`/semestre?matiere=${encodeURIComponent(matiere.matiere)}`}
                                    className="matiere-link" style={{textDecoration:"none"}}
                                >
                                    <strong>{matiere.matiere}</strong>
                                </Link>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Accueil;
