import React from 'react';
import './GraphismeWebdesign.css';
import GW from '../../../assets/GraphismeWebdesign.jpg'
import Matieres from '../../Matières/Matieres';
const GraphismeWebdesign = () => {
  return (
    <div className='GraphismeWebdesignPage'>
      <img src={GW} alt="Graphisme Webdesign"  className="full-width-image" />
      <div className="content">
        <h3>Formation Graphisme et Webdesign MY-ACADEMIE </h3> <br/>
        <p><strong>MY-ACADEMIE</strong> vous propose des formations certifiantes ainsi que des formations ciblées sur un métier, disponibles à distance, afin d'assurer des missions liées au webdesign au sein d'une entreprise ou pour être à votre compte !</p>
        <h4>ormation en Graphisme à distance</h4>
        <p>Les avantages de suivre une formation en Webdesign et Graphisme à distance avec Icademie comprennent la flexibilité de l'apprentissage, la possibilité de personnaliser le programme en fonction de vos besoins individuels, l'accès à des ressources en ligne, l'accompagnement par des tuteurs expérimentés et la possibilité de travailler à votre propre rythme, en parallèle de votre vie personnelle et professionnelle.</p>

        <h5>Les objectifs des formations en Graphisme : </h5>
        <ul>
            <li>Maîtriser les outils de la suite Adobe (Photoshop, Illustrator, InDesign) ;</li>
            <li>Concevoir des visuels de qualité professionnelle pour divers supports (impression, web, mobile) ;</li>
            <li>Créer des infographies, des illustrations et des animations ;</li>
            <li>Utiliser les principes de design pour créer des compositions équilibrées.</li>
      
        </ul>
        
        <h3>S'inscrire chez MY-ACADEMIE </h3>
        <p>Pour vous inscrire à nos formations en webdesign et graphisme, deux options sont possibles : remplir une demande d'information en ligne ou nous contacter au 53 400 100 .
        Nos conseillers en formation sont disponibles pour vous aider à déterminer vos objectifs professionnels et discuter des financements disponibles en fonction de votre parcours et de votre situation professionnelle.
        Commencez l'aventure dès maintenant et faites décoller votre carrière professionnelle !</p>

        <h3>Les débouchés après une formation en graphisme </h3>
        <p>Après une formation en graphisme, il est possible de travailler comme graphiste, directeur artistique, designer d'interface utilisateur (UI), designer de produits, illustrateur, animateur et bien plus encore. Les débouchés dépendent de la spécialisation et des compétences acquises pendant la formation.</p><hr/>
      </div>
      <Matieres formationFilter="Graphisme & Webdesign"/>
    </div>
  );
}

export default GraphismeWebdesign;
