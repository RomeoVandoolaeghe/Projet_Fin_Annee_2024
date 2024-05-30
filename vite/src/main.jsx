import React from 'react'
import ReactDOM from 'react-dom/client'
import Inscription from './Inscription.jsx'
import Connexion from './connexion.jsx'
import Deconnexion from './deconnexion.jsx'
import Disponibilites from './disponibilites.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Connexion/>
    <Inscription/>
    <Deconnexion/>
  </React.StrictMode>,
)

