import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Devoirs.css';
import menuIcon from '../../../../assets/menu-icon.png';
import PDF from '../../../../assets/pdf.png';
import Sidebar1 from '../Sidebar1/Sidebar1';

const Devoirs = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [assignmentFile, setAssignmentFile] = useState(null);
    const [subjectName, setSubjectName] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:4000/utilisateur', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
                setSubjectName(response.data.specialite); // Assignez automatiquement la matière de l'utilisateur
            } catch (error) {
                console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
            }
        };

        const fetchSubjects = async () => {
            try {
                const response = await axios.get('http://localhost:4000/touslesmatieres');
                setSubjects(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des matières', error);
            }
        };

        const fetchAssignments = async () => {
            try {
                const response = await axios.get('http://localhost:4000/touslesdevoirs');
                setAssignments(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des devoirs', error);
            }
        };

        fetchUserData();
        fetchSubjects();
        fetchAssignments();
    }, []);

    const handlePublish = async () => {
        const formData = new FormData();
        formData.append('devoir_pdf', assignmentFile);
        formData.append('nom_matiere', subjectName);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:4000/ajouterdevoir', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            const newAssignment = response.data;
            setAssignments([...assignments, newAssignment]);

            alert('Devoir ajouté avec succès');
        } catch (error) {
            alert('Erreur lors de l\'ajout du devoir');
        }

        setAssignmentFile(null);
    };

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    // Filtrer les devoirs selon la spécialité de l'utilisateur
    const filteredAssignments = assignments.filter(assignment => assignment.nom_matiere === user?.specialite);

    return (
        <div className="semestre-wrapper">
            <img src={menuIcon} alt="menu icon" className="menu-icon" onClick={toggleSidebar} />
            <div className={`sidebar ${isSidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}>
                <Sidebar1 />
            </div>
            <div className="devoirs-form">
                <div className="header">
                    {user && <h2>{user.specialite}</h2>}
                    <p>Accueil/Semestre 1/Devoirs</p>
                </div>
                <div className="content-sections">
                    <div className="content-left">
                        <h3>Centre de formation</h3>
                        <p>MY-ACADEMIE</p>
                        <p>Année universitaire 2024-2025</p>
                        <p>Enseignant: Mme.{user?.nom} {user?.prenom}</p>

                        <div className="container">
                            <h1>Ajouter un Devoir</h1>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label>Devoir (PDF) :</label>
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        onChange={(e) => setAssignmentFile(e.target.files[0])}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Nom du Matière : </label>
                                    <select
                                        value={subjectName}
                                        onChange={(e) => setSubjectName(e.target.value)}
                                        required
                                    >
                                        <option value="">Sélectionner une matière</option>
                                        {subjects.map((subject) => (
                                            <option key={subject.id} value={subject.matiere}>
                                                {subject.matiere}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button type="button" onClick={handlePublish}>
                                    Publier
                                </button>
                            </form>
                        </div>
                        <div className="published-assignments">
                            <h2>Devoirs publiés:</h2>
                            {filteredAssignments.map((assignment, index) => (
                                <div key={index}>
                                    <h3>Devoir:</h3>
                                    <img src={PDF} alt='pdf' width='20px' />
                                    <a href={`http://localhost:4000${assignment.devoir_pdf}`} download>Devoir {assignment.nom_matiere}</a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Devoirs;
