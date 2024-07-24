import React from 'react';
import './InformatiqueWeb.css';
import IW from '../../../assets/InformatiqueWeb.jpg'
import Matieres from '../../Matières/Matieres';
const InformatiqueWeb = () => {
  return (
    <div className='InformatiqueWebPage'>
      <img src={IW} alt="Informatique Web"  className="full-width-image" />
      <div className="content">
        <h3>Formation en Informatique à distance </h3> <br/>
        <p> Notre catalogue de formations à distance en Informatique est conçu pour les apprenants qui souhaitent acquérir des compétences en informatique et en technologie de l'information, tout en étudiant à leur propre rythme.
        Que vous soyez un apprenant à temps partiel, un professionnel travaillant à temps plein ou une personne ayant des obligations familiales, toutes nos formations sont flexibles et accessibles !
        Chez Icademie, nous croyons fermement en l'importance d'offrir à chacun une formation de qualité, indépendamment de son emploi du temps ou de son lieu de résidence. C'est pourquoi, nous avons créé un ensemble de formations à distance en Informatique, conçues pour vous permettre d'étudier à votre convenance, où que vous soyez.</p>
        <h4>Les avantages d'une formation en Informatique et Web à distance</h4>
        <ul>
            <li>Étudiez à votre propre rythme ;</li>
            <li>Accédez à notre plateforme de formations en ligne 7j/7 ;</li>
            <li>Consultez des vidéos de cours, des quiz interactifs et des forums de discussion à tout moment ;</li>
            <li>Économisez du temps et de l'argent en évitant les déplacements ;</li>
            <li>Profitez d'un apprentissage personnalisé et de tuteurs disponibles tout au long de votre formation ;</li>
            <li>Obtenez un titre certifié, reconnu sur le marché du travail.</li>
        </ul>
        <p>Avec nos formations en Informatique, vous acquerrez des compétences très recherchées sur le marché du travail. Des opportunités professionnelles se présenteront dans divers domaines tels que la programmation, l'administration de bases de données, la sécurité informatique et le développement de sites web.</p><hr/>
        <h3>S'inscrire chez MY-ACADEMIE </h3>
        <p>Pour vous inscrire à l'une de nos formations en Informatique et Web à distance, vous pouvez remplir une demande d'information en ligne ou nous contacter au 53 400 100 .
        Notre équipe de conseillers en formation est à votre disposition pour discuter de vos perspectives professionnelles et explorer les différentes options de financement qui s'offrent à vous.
        Commencez l'aventure dès maintenant et faites décoller votre carrière professionnelle !</p>
      </div>
      <Matieres formationFilter="Informatique & Web"/>
    </div>
  );
}

export default InformatiqueWeb;
