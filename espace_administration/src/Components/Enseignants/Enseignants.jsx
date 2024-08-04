import React, { useState, useEffect } from 'react';
import axios from 'axios';
import supp_icon from '../../assets/supp_icon.png';
import modif_icon from '../../assets/modif_icon.png';
import './Enseignants.css';

const Enseignants = () => {
    const [formVisible, setFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        cin: '',
        email: '',
        tel: '',
        adresse: '',
        typeContrat: '',
        specialite: ''
    });
    const [tableData, setTableData] = useState([]);
    const [matieres, setMatieres] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchEnseignants();
        fetchMatieres();
    }, []);

    const fetchEnseignants = async () => {
        try {
            const response = await axios.get('http://localhost:4000/touslesenseignants');
            setTableData(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des enseignants', error);
        }
    };

    const fetchMatieres = async () => {
        try {
            const response = await axios.get('http://localhost:4000/touslesmatieres');
            setMatieres(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des matières', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            await updateEnseignant();
        } else {
            await addEnseignant();
        }
    };

    const addEnseignant = async () => {
        try {
            const response = await axios.post('http://localhost:4000/ajouterenseignant', formData);
            setTableData([...tableData, response.data]);
            resetForm();
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'enseignant', error);
        }
    };

    const updateEnseignant = async () => {
        try {
            const response = await axios.put(`http://localhost:4000/modifierenseignant/${editingId}`, {
                email: formData.email,
                tel: formData.tel,
                adresse: formData.adresse,
                specialite: formData.specialite
            });

            const updatedData = tableData.map((item) =>
                item._id === editingId ? response.data : item
            );
            setTableData(updatedData);
            resetForm();
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'enseignant', error);
        }
    };

    const resetForm = () => {
        setFormData({
            nom: '',
            prenom: '',
            cin: '',
            email: '',
            tel: '',
            adresse: '',
            typeContrat: '',
            specialite: ''
        });
        setFormVisible(false);
        setIsEditing(false);
        setEditingId(null);
    };

    const suppEnseignant = async (id) => {
        try {
            await axios.post('http://localhost:4000/supprimerenseignant', { id });
            fetchEnseignants();
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'enseignant', error);
        }
    };

    const editEnseignant = (enseignant) => {
        setFormData({
            nom: enseignant.nom,
            prenom: enseignant.prenom,
            cin: enseignant.cin,
            email: enseignant.email,
            tel: enseignant.tel,
            adresse: enseignant.adresse,
            typeContrat: enseignant.typeContrat,
            specialite: enseignant.specialite
        });
        setFormVisible(true);
        setIsEditing(true);
        setEditingId(enseignant._id);
    };

    return (
        <div className="form-page">
            <button onClick={() => setFormVisible(!formVisible)}>
                {isEditing ? 'Modifier Enseignant' : 'Ajouter Nouveau'}
            </button>
            {formVisible && (
                <form onSubmit={handleSubmit} className="form">
                    <div>
                        <label>Nom:</label>
                        <input
                            type="text"
                            name="nom"
                            value={formData.nom}
                            onChange={handleInputChange}
                            required
                            disabled={isEditing}
                        />
                    </div>
                    <div>
                        <label>Prénom:</label>
                        <input
                            type="text"
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleInputChange}
                            required
                            disabled={isEditing}
                        />
                    </div>
                    <div>
                        <label>CIN:</label>
                        <input
                            type="text"
                            name="cin"
                            value={formData.cin}
                            onChange={handleInputChange}
                            required
                            disabled={isEditing}
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Téléphone:</label>
                        <input
                            type="tel"
                            name="tel"
                            value={formData.tel}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Adresse:</label>
                        <input
                            type="text"
                            name="adresse"
                            value={formData.adresse}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Type Contrat:</label>
                        <select
                            name="typeContrat"
                            value={formData.typeContrat}
                            onChange={handleInputChange}
                            required
                            disabled={isEditing}
                        >
                            <option value="">Sélectionner</option>
                            <option value="CDI">CDI</option>
                            <option value="CDD">CDD</option>
                            <option value="CIVP">CIVP</option>
                            <option value="Karama">Karama</option>
                        </select>
                    </div>
                    <div>
                        <label>Spécialité:</label>
                        <select
                            name="specialite"
                            value={formData.specialite}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Sélectionner</option>
                            {matieres.map((matiere, index) => (
                                <option key={index} value={matiere.matiere}>{matiere.matiere}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">{isEditing ? 'Mettre à jour' : 'Enregistrer'}</button>
                </form>
            )}
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>CIN</th>
                        <th>Email</th>
                        <th>Téléphone</th>
                        <th>Adresse</th>
                        <th>Type Contrat</th>
                        <th>Spécialité</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.nom}</td>
                            <td>{item.prenom}</td>
                            <td>{item.cin}</td>
                            <td>{item.email}</td>
                            <td>{item.tel}</td>
                            <td>{item.adresse}</td>
                            <td>{item.typeContrat}</td>
                            <td>{item.specialite || 'Non spécifié'}</td>
                            <td className='icon-container'>
                                <img
                                    onClick={() => suppEnseignant(item._id)}
                                    src={supp_icon}
                                    alt="Supprimer"
                                    className="icon"
                                />
                                <img
                                    onClick={() => editEnseignant(item)}
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

export default Enseignants;