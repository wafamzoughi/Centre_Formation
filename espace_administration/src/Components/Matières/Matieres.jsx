import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Matieres.css';
import supp_icon from '../../assets/supp_icon.png';
import modif_icon from '../../assets/modif_icon.png';

const Matieres = ({ formationFilter }) => {
    const [formVisible, setFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        matiere: '',
        coefficient: '',
        credits: '',
        heure: '',
        formation: '',
    });
    const [tableData, setTableData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchMatieres();
    }, []);

    const fetchMatieres = async () => {
        try {
            const response = await axios.get('http://localhost:4000/touslesmatieres');
            setTableData(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des matières', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axios.post('http://localhost:4000/modifiermatiere', formData);
            } else {
                const response = await axios.post('http://localhost:4000/ajoutermatiere', formData);
                setTableData([...tableData, response.data]);
            }
            setFormData({
                id: '',
                matiere: '',
                coefficient: '',
                credits: '',
                heure: '',
                formation: '',
            });
            setFormVisible(false);
            setIsEditing(false);
            fetchMatieres();
        } catch (error) {
            console.error('Erreur lors de l\'ajout ou de la modification d\'une matière', error);
        }
    };

    const suppMatiere = async (id) => {
        await fetch('http://localhost:4000/supprimermatiere', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
        });
        fetchMatieres();
    };

    const handleEditClick = (matiere) => {
        setFormData({
            id: matiere.id,
            matiere: matiere.matiere,
            coefficient: matiere.coefficient,
            credits: matiere.credits,
            heure: matiere.heure,
            formation: matiere.formation,
        });
        setIsEditing(true);
        setFormVisible(true);
    };

    const filteredTableData = tableData.filter(item => item.formation === formationFilter);

    return (
        <div>
            <button onClick={() => setFormVisible(!formVisible)}>
                {isEditing ? 'Modifier' : 'Ajouter Nouveau'}
            </button>
            {formVisible && (
                <form onSubmit={handleSubmit} className="form">
                    <div>
                        <label>Matière:</label>
                        <input
                            type="text"
                            name="matiere"
                            value={formData.matiere}
                            onChange={handleInputChange}
                            required
                            readOnly={isEditing}
                        />
                    </div>
                    <div>
                        <label>Coefficient:</label>
                        <input
                            type="number"
                            name="coefficient"
                            value={formData.coefficient}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Crédits:</label>
                        <input
                            type="number"
                            name="credits"
                            value={formData.credits}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Heures:</label>
                        <input
                            type="number"
                            name="heure"
                            value={formData.heure}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Formation:</label>
                        <select
                            name="formation"
                            value={formData.formation}
                            onChange={handleInputChange}
                            required
                            disabled={isEditing}
                        >
                            <option value="">Sélectionner</option>
                            <option value="Ressources humaines">Ressources humaines</option>
                            <option value="Marketing & Communication">Marketing & Communication</option>
                            <option value="Business & Management">Business & Management</option>
                            <option value="Banque, Finance & Immobilier">Banque, Finance & Immobilier</option>
                            <option value="Informatique & Web">Informatique & Web</option>
                            <option value="Langues Étrangères">Langues Étrangères</option>
                            <option value="Graphisme & Webdesign">Graphisme & Webdesign</option>
                        </select>
                    </div>
                    <button type="submit">{isEditing ? 'Modifier' : 'Enregistrer'}</button>
                </form>
            )}
            <table>
                <thead>
                    <tr>
                        <th>Matière</th>
                        <th>Coefficient</th>
                        <th>Crédits</th>
                        <th>Heures</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTableData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.matiere}</td>
                            <td>{item.coefficient}</td>
                            <td>{item.credits}</td>
                            <td>{item.heure}</td>
                            <td>
                                <img
                                    onClick={() => suppMatiere(item.id)}
                                    src={supp_icon}
                                    alt="Supprimer"
                                    className="icon"
                                />
                                <img
                                    onClick={() => handleEditClick(item)}
                                    src={modif_icon}
                                    alt="Modifier"
                                    className="icon"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Matieres;
