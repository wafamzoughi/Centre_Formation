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
            <div className='loginsignup'>
            <div className="loginsignup-container"> 
                <h1>Se connecter / inscription</h1>
                <div className="loginsignup-form">
                    <input name='username'  type="text" placeholder="Votre Nom"/>
                    <input type="email" name='email'  placeholder="Votre Email"/>
                    <div><input type="password" name='password'   placeholder="Votre Mot de Passe"/>
                    
                    </div>
                </div>
                <Link to="/semestre">
                        <button>Connexion</button>
                    </Link>
                <p className="loginsignup-login">Vous avez déjà un compte ? <span >Connectez-vous ici</span></p>
                <p className="loginsignup-login">Créer un compte ? <span >Cliquez ici</span></p>
                
                <div className="loginsignup-agree">
                    <input type="checkbox" name='' id=''/>
                    <p>En continuant, j'accepte les conditions d'utilisation et la politique de confidentialité.</p>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Accueil;
