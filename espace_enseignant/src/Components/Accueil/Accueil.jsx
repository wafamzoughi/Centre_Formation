import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import './Accueil.css';

const Accueil = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [matiere, setMatiere] = useState('');
    const [error, setError] = useState('');
    const [matieres, setMatieres] = useState([]);
    const [selectedMatiere, setSelectedMatiere] = useState(null);
    const navigate = useNavigate();
    const { matiereCourante } = useParams(); // Récupère la matière depuis les paramètres d'URL

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

    useEffect(() => {
        if (matiereCourante) {
            setSelectedMatiere(matiereCourante);
        }
    }, [matiereCourante]);

    const handleLogin = async () => {
        setError(''); // Reset error state before attempting login
        try {
            console.log('Attempting login with:', { email, cin: password, matiere });
            const response = await axios.post('http://localhost:4000/login', { email, cin: password, matiere });
            console.log('Login response:', response.data);
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                navigate('/semestre');
            } else {
                setError(response.data.error || 'Adresse email, CIN ou matière incorrect');
            }
        } catch (error) {
            console.error('Error during login:', error.response?.data || error);
            setError('Adresse email, CIN ou matière incorrect');
        }
    };
    
    

    const handleSidebarClick = (matiere) => {
        setSelectedMatiere(matiere);
        setMatiere(matiere);
        navigate(`/matierecourrent/${matiere}`); // Met à jour l'URL
    };

    return (
        <div className="accueil-layout">
            <div className="sidebar-accueil">
                {matieres.map((matiere, index) => (
                    <div 
                        key={index} 
                        className="sidebar-accueil-item" 
                        onClick={() => handleSidebarClick(matiere.matiere)}
                    >
                        <p>{matiere.matiere}</p>
                    </div>
                ))}
            </div>
            
            {selectedMatiere && (
                <div className="login-container">
                    <h1>Se connecter</h1>
                    {error && <p className="error-message">{error}</p>}
                    <div className="login-form">
                        <input
                            type="email"
                            name="email"
                            placeholder="Votre Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Votre CIN"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button onClick={handleLogin}>Connexion</button>
                </div>
            )}
        </div>
    );
};

export default Accueil;
