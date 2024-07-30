import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Accueil.css';
const Accueil = () => {
    const [matieres, setMatieres] = useState([]);

    useEffect(() => {
        const fetchMatieres = async () => {
            try {
                const response = await axios.get('http://localhost:4000/touslesmatieres');
                setMatieres(response.data);
            } catch (error) {
                console.error('Error fetching matieres:', error);
            }
        };

        fetchMatieres();
    }, []);

    return (
        <div className="accueil-layout">
            <div className="sidebar">
                {matieres.map((matieres, index) => (
                    <Link  style={{ textDecoration: "none" }} >
                        <div className="sidebar-item">
                            <p>{matieres.matiere}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className='login'>
            <div className="login-container"> 
                <h1>Se connecter</h1>
                <div className="login-form">
                    <input type="email" name='email'  placeholder="Votre Email"/>
                    <input type="password" name='password'   placeholder="Votre Mot de Passe"/>
                    
                </div>
                <Link to="/semestre">
                    <button>Connexion</button>
                </Link>
            </div>
                
            </div>
        </div>
        
    );
};

export default Accueil;
