import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';

import './AboutPage.css';

export default function AboutPage() {
  return (
    <Fragment>
      <div className="AboutPage-overlay" />
      <div className="AboutPage">
        <Link to="/">
          <span className="close-button fas fa-times" />
        </Link>
        <h1>À propos</h1>
        <p>
          <strong>motuiti</strong> affiche sur une carte les libraires qui
          possède un certain livre en stock à partir de son code ISBN.
        </p>
        <ol className="instructions">
          <li>
            Entrez un code ISBN dans le champ de recherche en haut à
            droite.&nbsp;
            <small>
              Vous pouvez trouver ce code de 13 chiffres au dos du livre sous
              le code barre, sur le site de l'éditeur ou chez un vendeur de
              livre en ligne.
            </small>
          </li>
          <li>
            Cliquez sur <span className="fas fa-search" /> pour lancer la
            recherche et afficher sur la carte les libraires disposant du
            livre en stock.
          </li>
          <li>
            Cliquez sur <span className="fas fa-location-arrow" /> et
            autorisez la géolocalisation pour centrer la carte sur votre
            position et afficher les libraires autour de vous.
          </li>
          <li>
            Cliquez sur une icone <span className="fas fa-map-marker-alt" />{' '}
            pour afficher les coordonnées d'une librairie.
          </li>
        </ol>
        <p>
          Les informations de disponibilité de livres sont mises à jour
          quotidiennement et tirés de la plateforme{' '}
          <a
            href="https://www.placedeslibraires.fr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Place des libraires
          </a>
          . N'hésitez pas à contacter la librairie pour vous assurer qu'elle
          possède bien le livre en stock avant de vous déplacer. Vous pouvez
          aussi le réserver sur le site Place des libraires.
        </p>
        <p>
          <strong>motuiti</strong> a été conçu par{' '}
          <a
            href="https://www.iwazaru.fr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Clément Bourgoin
          </a>
          .
        </p>
        <p>
          Son code source est sur{' '}
          <a
            href="https://github.com/iwazaru/motuiti"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          .
        </p>
      </div>
    </Fragment>
  );
}
