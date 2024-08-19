import React from 'react';
import './MarketingCommunication.css'; // Assurez-vous de créer ce fichier CSS
import MC from '../../../assets/MarketingCommunication.png'
import Matieres from '../../Matières/Matieres';
const MarketingCommunication = () => {
  return (
    <div className='MarketingCommunicationPage'>
      <img src={MC} alt="Marketing Communication"  className="full-width-image" />
      <div className="content">
        <h3>Formations Marketing et Communication à distance ou en présentiel  </h3> <br/>
        <p> Devenez un vrai professionnel du secteur grâce à  <strong>nos formations en Marketing et Communication de Bac à Bac +5, inscrites au RNCP (Répertoire National des Certifications Professionnelles). </strong><br/>
        Explorez également nos formations professionnalisantes, conçues pour vous orienter rapidement vers les métiers du secteur.<br/>
        En e-learning ou en mix-présentiel, trouvez la formation qui vous correspond ou formez-vous sur des compétences spécifiques dans ce domaine. </p><hr/>
        
      </div>
      <Matieres formationFilter="Marketing & Communication" />
    </div>
  );
}

export default MarketingCommunication;
