import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cours.css';
import menuIcon from '../../../../assets/menu-icon.png';
import PDF from'../../../../assets/pdf.png'
import Sidebar1 from '../Sidebar1/Sidebar1';

const Cours = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const [chapterNumber, setChapterNumber] = useState('');
    const [chapterName, setChapterName] = useState('');
    const [courseFile, setCourseFile] = useState(null);
    const [subjectName, setSubjectName] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [chapters, setChapters] = useState([]);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axios.get('http://localhost:4000/touslesmatieres');
                setSubjects(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des matières', error);
            }
        };

        const fetchChapters = async () => {
            try {
                const response = await axios.get('http://localhost:4000/tousleschapitres');
                setChapters(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des chapitres', error);
            }
        };

        fetchSubjects();
        fetchChapters();
    }, []);

    const handlePublish = async () => {
        const formData = new FormData();
        formData.append('num_chap', chapterNumber);
        formData.append('nom_chap', chapterName);
        formData.append('cours_pdf', courseFile);
        formData.append('nom_matiere', subjectName);

        try {
            const response = await axios.post('http://localhost:4000/ajouterchapitre', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Ajouter le chapitre à la liste des chapitres
            const newChapter = response.data;
            setChapters([...chapters, newChapter]);

            alert('Chapitre ajouté avec succès');
        } catch (error) {
            alert('Erreur lors de l\'ajout du chapitre');
        }

        setChapterNumber('');
        setChapterName('');
        setCourseFile(null);
        setSubjectName('');
    };

    return (
        <div className="semestre-wrapper">
            <img src={menuIcon} alt="menu icon" className="menu-icon" onClick={toggleSidebar} />
            <div className={`sidebar ${isSidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}>
                <Sidebar1/>
            </div>
            <div className="cours-form">
                <div className="header">
                    <h2>Gestion du personnel</h2>
                    <p>Accueil/Semestre 1/cours/Gestion du personnel</p>
                </div>
                <div className="content-sections">
                    <div className="content-left">
                        <h3>Centre du formation </h3>
                        <p>MY-ACADEMIE</p>
                        <p>Gestion du personnel</p>
                        <p>Année universitaire 2024-2025</p>
                        <p>Enseignant: Mme.Wafa Mzoughi</p>
                        
                        <div className="container">
                            <h1>Ajouter un Chapitre</h1>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label>Numéro du Chapitre :</label>
                                    <input
                                        type="text"
                                        value={chapterNumber}
                                        onChange={(e) => setChapterNumber(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Nom du Chapitre :</label>
                                    <input
                                        type="text"
                                        value={chapterName}
                                        onChange={(e) => setChapterName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Cours (PDF) :</label>
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        onChange={(e) => setCourseFile(e.target.files[0])}
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
                        <div className="published-chapters">
                            <h2>Chapitres publiés:</h2>
                            {chapters.map((chapter, index) => (
                                <div key={index}>
                                    <h1>Chapitre {chapter.num_chap}: {chapter.nom_chap}</h1>
                                    <h3>Ressource:</h3>
                                    <img src={PDF} alt='pdf' width='20px'></img>
                                    <a href={`http://localhost:4000${chapter.cours_pdf}`} download>  Cours {chapter.nom_chap}</a>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="content-right">
                        <h3>Recherche forums</h3>
                        <input type="text" placeholder="Rechercher" />
                        <button>Recherche avancée</button>
                        <h3>Dernières annonces</h3>
                        <p>(Aucune annonce n'a encore été publiée)</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cours;
