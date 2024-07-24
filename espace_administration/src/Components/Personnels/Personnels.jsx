import React, { useState, useEffect } from 'react';
import axios from 'axios';
import supp_icon from '../../assets/supp_icon.png';
import './Personnels.css';

const Personnels = () => {
    const [formVisible, setFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        cin: '',
        email: '',
        tel: '',
        adresse: '',
        typeContrat: '',
        typePersonnel: ''
    });
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        fetchPersonnels();
    }, []);

    const fetchPersonnels = async () => {
        try {
            const response = await axios.get('http://localhost:4000/touslespersonnels'); // Utiliser l'API mise à jour
            setTableData(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des personnels', error);
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
        try {
            const response = await axios.post('http://localhost:4000/ajouterpersonnel', formData);
            setTableData([...tableData, response.data]);
            setFormData({
                nom: '',
                prenom: '',
                cin: '',
                email: '',
                tel: '',
                adresse: '',
                typeContrat: '',
                typePersonnel: ''
            });
            setFormVisible(false);
        } catch (error) {
            console.error('Erreur lors de l\'ajout du personnel', error);
        }
    };

    const supp_personnel = async (id) => {
        try {
            await axios.post('http://localhost:4000/supprimerpersonnel', { id });
            await fetchPersonnels();
        } catch (error) {
            console.error('Erreur lors de la suppression du personnel', error);
        }
    };
    

    return (
        <div className="form-page">
            <button onClick={() => setFormVisible(!formVisible)}>
                Ajouter Nouveau
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
                        >
                            <option value="">Sélectionner</option>
                            <option value="CDI">CDI</option>
                            <option value="CDD">CDD</option>
                            <option value="CIVP">CIVP</option>
                            <option value="Karama">Karama</option>
                        </select>
                    </div>
                    <div>
                        <label>Type Personnel:</label>
                        <select
                            name="typePersonnel"
                            value={formData.typePersonnel}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Sélectionner</option>
                            <option value="Administratif">Administratif</option>
                            <option value="Enseignant">Enseignant</option>
                            <option value="Technicien">Technicien</option>
                            <option value="Autre">Autre</option>
                        </select>
                    </div>
                    <button type="submit">Enregistrer</button>
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
                        <th>Type Personnel</th>
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
                            <td>{item.typePersonnel}</td>
                            <td><img onClick={() => { supp_personnel(item._id) }} src={supp_icon} alt="" /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Personnels;
