import React from 'react'
import ReactDOM from 'react-dom/client'
import Inscription from './Inscription.jsx'
import Connexion from './connexion.jsx'
import Deconnexion from './deconnexion.jsx'
import Disponibilites from './disponibilites.jsx'
import { BrowserRouter } from 'react-router-dom'








ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Inscription/>
    <Connexion/>
    <Disponibilites/>
  </React.StrictMode>,
)

