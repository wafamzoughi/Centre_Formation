import React from 'react';
import './Ressourceshumaines.css'; // Assurez-vous de créer ce fichier CSS
import RH from '../../../assets/Ressourceshumaines.png'
import Matieres from '../../Matières/Matieres';

const Ressourceshumaines = () => {

  return (
    <div className='RessourcesHumainesPage'>
      <img src={RH} alt="Ressources humaines"  className="full-width-image" 
      />
      <div className="content">
        <h3>Nous vous offrons la flexibilité de choisir la formule qui correspond le mieux à votre style d'apprentissage </h3> <br/>
        
        <h4> <ul><li>Formation 100 % à distance :</li></ul></h4>
        <p> Accédez à tous vos cours et ressources pédagogiques depuis chez vous, selon votre propre emploi du temps. Notre plateforme en ligne intuitive vous permet d'étudier en toute autonomie, tout en bénéficiant du soutien de nos tuteurs et de notre équipe pédagogique à distance.</p>
        <h4><ul><li>Formation dans nos centres avec accès à la plateforme : </li></ul></h4> 
        <p>Bénéficiez d'une immersion enrichissante dans nos centres de formation. Vous aurez la possibilité de suivre des cours en présentiel avec nos experts, tout en disposant d'un jour dédié à l'utilisation de notre plateforme en ligne pour compléter votre formation.</p><br/>
        <h3>Nos centres : Sfax et Tunis .</h3><hr/>
        
          
        </div>
        <Matieres formationFilter="Ressources humaines"/>
        </div>
        
    );
  };


export default Ressourceshumaines;
