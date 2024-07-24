import React from 'react';
import './LanguesEtrangeres.css'; // Assurez-vous de créer ce fichier CSS
import LE from '../../../assets/LanguesEtrangeres.jpg'
import Matieres from '../../Matières/Matieres';
const LanguesEtrangeres = () => {
  return (
    <div className='LanguesEtrangeresPage'>
      <img src={LE} alt="Langues Etrangeres"  className="full-width-image" />
      <div className="content">
        <h3>Les avantages d'une formation Langues étrangères à distance  </h3> <br/>
        <p> Découvrez les nombreux avantages de la formation en Langues étrangères avec MY-ACADEMIE.
        Nos cours à distance vous permettent d'apprendre la langue où que vous soyez, avec une flexibilité totale pour adapter votre apprentissage à votre emploi du temps chargé.<br/>
        Nos programmes sont conçus pour tous les niveaux, des débutants aux niveaux avancés, et incluent des ressources pédagogiques interactives et des outils pratiques pour améliorer vos compétences linguistiques<br/><br/>
        Prenez contact avec un de nos conseillers en formation pour étudier les solutions de financement adaptées à votre profil. Vous bénéficierez d’un accompagnement gratuit sur le montage de votre dossier de financement (CPF, alternance, financement entreprise, etc.). </p><hr/>
        
      </div>
      <Matieres formationFilter="Langues Étrangères"/>
    </div>
  );
}

export default LanguesEtrangeres;
