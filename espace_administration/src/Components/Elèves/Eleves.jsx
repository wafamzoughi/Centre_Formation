import React, { useState, useEffect } from 'react';
import axios from 'axios';
import supp_icon from '../../assets/supp_icon.png';
import modif_icon from '../../assets/modif_icon.png';
import './Eleves.css';

const Eleves = () => {
    const [formVisible, setFormVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEleveId, setCurrentEleveId] = useState(null);
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        cin: '',
        email: '',
        tel: '',
        adresse: '',
        formations: [] ,
        montantPayant: '',
        montantRestant: '',
        remise: '',
        // Ajouter le champ formations
    });
    const [tableData, setTableData] = useState([]);
    const [formations, setFormations] = useState([]); // Liste des formations disponibles

    useEffect(() => {
        fetchEleves();
        fetchFormations(); // Charger les formations disponibles
    }, []);

    const fetchEleves = async () => {
        try {
            const response = await axios.get('http://localhost:4000/tousleseleves');
            setTableData(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des élèves', error);
        }
    };

    const fetchFormations = async () => {
        try {
            const response = await axios.get('http://localhost:4000/touteslesformations');
            console.log('Formations récupérées:', response.data); // Ajoutez cette ligne
            setFormations(response.data || []);
        } catch (error) {
            console.error('Erreur lors de la récupération des formations', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFormationsChange = (e) => {
        const { options } = e.target;
        const selectedFormations = Array.from(options)
            .filter(option => option.selected)
            .map(option => option.value);
        setFormData({
            ...formData,
            formations: selectedFormations
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            await updateEleve();
        } else {
            await addEleve();
        }
    };

    const addEleve = async () => {
        try {
            const response = await axios.post('http://localhost:4000/ajoutereleve', formData);
            setTableData([...tableData, response.data]);
            resetForm();
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'élève', error);
        }
    };

    const updateEleve = async () => {
        try {
            const response = await axios.put(`http://localhost:4000/modifiereleve/${currentEleveId}`, formData);
            const updatedData = tableData.map((item) =>
                item._id === currentEleveId ? response.data : item
            );
            setTableData(updatedData);
            resetForm();
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'élève', error);
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
            formations: [],
            montantPayant: '',
            montantRestant: '',
            remise: '',
            
        });
        setFormVisible(false);
        setIsEditing(false);
        setCurrentEleveId(null);
    };

    const suppEleve = async (id) => {
        try {
            await axios.post('http://localhost:4000/supprimereleve', { id });
            fetchEleves();
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'élève', error);
        }
    };

    const editEleve = (eleve) => {
        setFormData({
            nom: eleve.nom,
            prenom: eleve.prenom,
            cin: eleve.cin,
            email: eleve.email,
            tel: eleve.tel,
            adresse: eleve.adresse,
            formations: eleve.formations.map(f => f._id),
            montantPayant: eleve.montantPayant,
            montantRestant: eleve.montantRestant,
            remise: eleve.remise,
            
        });
        setFormVisible(true);
        setIsEditing(true);
        setCurrentEleveId(eleve._id);
    };

    return (
        <div className="form-page">
            <button onClick={() => setFormVisible(!formVisible)}>
                {isEditing ? 'Modifier Élève' : 'Ajouter Nouveau'}
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
                        <label>Formations:</label>
                        <select
                            name="formations"
                            value={formData.formations}
                            onChange={handleFormationsChange}
                            required
                            
                        >
                            {(formations ?? []).map((formation) => (
                                <option key={formation._id} value={formation._id}>
                                    {formation.nom}
                                </option>
                            ))}
                        </select>
                        
                    </div>
                    <div>
                        <label>Montant Payant:</label>
                        <input
                            type="text"
                            name="montantPayant"
                            value={formData.montantPayant}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Montant Restant:</label>
                        <input
                            type="text"
                            name="montantRestant"
                            value={formData.montantRestant}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Remise:</label>
                        <input
                            type="text"
                            name="remise"
                            value={formData.remise}
                            onChange={handleInputChange}
                            required
                            disabled={isEditing}
                        />
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
                        <th>Formations</th>
                        <th>Montant Payant (DT)</th>
                        <th>Montant Restant (DT)</th>
                        <th>Remise (%)</th>
                        
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
                            <td>{(item.formations ?? []).map(f => f.nom).join(', ')}</td>
                            <td>{item.montantPayant}</td>
                            <td>{item.montantRestant}</td>
                            <td>{item.remise}</td>
                            
                            <td className='icon-container'>
                                <img
                                    onClick={() => suppEleve(item._id)}
                                    src={supp_icon}
                                    alt="Supprimer"
                                    className="icon"
                                />
                                <img
                                    onClick={() => editEleve(item)}
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

export default Eleves;