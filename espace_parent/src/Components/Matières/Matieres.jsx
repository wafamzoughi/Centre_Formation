import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Matieres.css';


const Matieres = ({ formationFilter }) => {
    const [formVisible, setFormVisible] = useState(false);
    const [formations, setFormations] = useState([]);
    const [formData, setFormData] = useState({
        _id: '', // Utilisez _id pour correspondre avec votre backend
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
        fetchFormations();
    }, []);

    const fetchMatieres = async () => {
        try {
            const response = await axios.get('http://localhost:4000/touslesmatieres');
            setTableData(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des matières', error);
        }
    };

    const fetchFormations = async () => {
        try {
            const response = await axios.get('http://localhost:4000/touteslesformations');
            setFormations(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des formations', error);
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
                await axios.put(`http://localhost:4000/modifiermatiere/${formData._id}`, formData);
            } else {
                const response = await axios.post('http://localhost:4000/ajoutermatiere', formData);
                setTableData([...tableData, response.data]);
            }
            resetForm();
            fetchMatieres();
        } catch (error) {
            console.error('Erreur lors de l\'ajout ou de la modification d\'une matière', error);
        }
    };

    const resetForm = () => {
        setFormData({
            _id: '',
            matiere: '',
            coefficient: '',
            credits: '',
            heure: '',
            formation: '',
        });
        setFormVisible(false);
        setIsEditing(false);
    };

    const suppMatiere = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/supprimermatiere/${id}`);
            fetchMatieres();
        } catch (error) {
            console.error('Erreur lors de la suppression de la matière', error);
        }
    };

    const handleEditClick = (matiere) => {
        setFormData({
            _id: matiere._id, // Assurez-vous que cela correspond à votre backend
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
                            {formations.map((formation) => (
                                <option key={formation._id} value={formation.nom}>
                                    {formation.nom}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">{isEditing ? 'Modifier' : 'Enregistrer'}</button>
                    <button type="button" onClick={resetForm}>Annuler</button>
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
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Matieres;
