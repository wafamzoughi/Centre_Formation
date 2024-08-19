import React from 'react';
import './BusinessManagement.css';
import BM from '../../../assets/BusinessManagement.jpg'
import Matieres from '../../Matières/Matieres';
const BusinessManagement = () => {
  return (
    <div className='BusinessManagementPage'>
      <img src={BM} alt="Business Management"  className="full-width-image" />
      <div className="content">
        <h3>Formation Commerce et Management </h3> <br/>
        <p> Nos programmes sont conçus en étroite collaboration avec des experts du secteur, garantissant une pertinence et une actualisation constantes des contenus enseignés.<br/>
        De plus, nos formations sont disponibles en alternance, vous permettant ainsi de combiner études théoriques et expérience pratique en entreprise.<br/>
        Toutes nos formations sont éligibles au CPF (Compte Personnel de Formation) et délivrent des titres RNCP reconnus, assurant ainsi la valeur ajoutée de votre parcours académique sur le marché du travail.<br/>
        Préparez-vous à faire le pas vers une carrière enrichissante et pleine de défis dans le management et le commerce avec nos programmes de formation.</p><hr/>
        
      </div>
      <Matieres formationFilter="Business & Management"/>
    </div>
  );
}

export default BusinessManagement;
