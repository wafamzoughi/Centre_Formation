import React from 'react';
import './BanqueFinanceImmobilier.css';
import BFI from '../../../assets/banque-finance-immobilier.jpg'
import Matieres from '../../Matières/Matieres';
const BanqueFinanceImmobilier = () => {
  return (
    <div className='BanqueFinanceImmobilierPage'>
        
     <img src={BFI} alt="Banque Finance Immobilier"  className="full-width-image" />
     <div className="content">
        <h3>Nos formations en Banque, Finance et Immobilier </h3> <br/>
        <p> Découvrez nos formations reconnues par l'État en banque, finance et immobilier, de BAC à BAC +5 ! <br/>
        <strong>Choisissez entre une formation entièrement en ligne ou dans l'un de nos trois centres à Bouc bel Air (près de Marseille et Aix-en-Provence), Toulon ou Paris 9ème, avec une journée de cours en ligne.</strong><br/>
        Tout au long de votre parcours, vous bénéficierez du soutien d'experts du secteur, d'une équipe pédagogique dédiée et de tuteurs expérimentés.<br/>
        Pour le financement, c'est simple : faites une demande sur notre site et un conseiller vous contactera pour vous expliquer toutes les options disponibles : alternance, CPF, aides de l'employeur, aides régionales, France Travaill..</p><hr/>
        
      </div>
      <Matieres formationFilter="Banque, Finance & Immobilier"/>
    </div>
  );
}

export default BanqueFinanceImmobilier;
