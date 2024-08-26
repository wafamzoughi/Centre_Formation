import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './Accueil.css';

const Accueil = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [formations, setFormations] = useState([]);
    const [selectedMatiere, setSelectedMatiere] = useState(null);
    const navigate = useNavigate();
    const { matiereCourante } = useParams();

    useEffect(() => {
        const fetchFormations = async () => {
            try {
                const response = await axios.get('http://localhost:4000/formations-with-teachers');
                setFormations(response.data);
            } catch (error) {
                console.error('Error fetching formations:', error);
            }
        };

        fetchFormations();
    }, []);

    useEffect(() => {
        if (matiereCourante) {
            setSelectedMatiere(matiereCourante);
        }
    }, [matiereCourante]);

    const handleLogin = async () => {
        setError(''); // Reset error state before attempting login
        try {
            console.log('Attempting login with:', { email, cin: password, matiere: selectedMatiere });
            const response = await axios.post('http://localhost:4000/login', { email, cin: password, matiere: selectedMatiere });
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

    const handleMatiereSelect = (matiere) => {
        setSelectedMatiere(matiere);
        navigate(`/matierecourrent/${matiere}`); // Met à jour l'URL
    };

    return (
        <div className="accueil-layout">
            <div className="sidebar-accueil">
                {formations.map((formation, index) => (
                    <div key={index} className="sidebar-formation">
                        <h3 className="sidebar-formations">{formation.formation}</h3>
                        {formation.matieres.map((matiere, matiereIndex) => (
                            <div 
                                key={matiereIndex} 
                                className="sidebar-accueil-item" 
                                onClick={() => handleMatiereSelect(matiere.matiere)}
                            >
                                <Link to={`/matierecourrent/${matiere.matiere}`} className="matiere-link" style={{textDecoration:"none"}}>
                                    <strong>{matiere.matiere}</strong>
                                </Link>
                            </div>
                        ))}
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
