// Code pour le back completement en bas 
import React from 'react';
import './GlobalStats.css';

const GlobalStats = () => {
    return (
        <div className="statistique-global">
            <div className="carte">
                <div className="carte-icone icone-bleue">👥</div>
                <div className="carte-titre">Utilisateurs Totals</div>
                <div className="carte-nombre">1200</div>
            </div>
            <div className="carte">
                <div className="carte-icone icone-verte">🔄</div>
                <div className="carte-titre">Utilisateurs Actifs</div>
                <div className="carte-nombre">300</div>
            </div>
            <div className="carte">
                <div className="carte-icone icone-bleue">🎉</div>
                <div className="carte-titre">Sorties Totales</div>
                <div className="carte-nombre">45</div>
            </div>
            <div className="carte">
                <div className="carte-icone icone-bleue">🏷️</div>
                <div className="carte-titre">Nouveaux Groupes</div>
                <div className="carte-nombre">12</div>
            </div>
            <div className="carte">
                <div className="carte-icone icone-bleue">📍</div>
                <div className="carte-titre">Lieux Populaires</div>
                <div className="carte-nombre">5</div>
            </div>
        </div>
    );
};

export default GlobalStats;

/* Pour le backend 

import React, { useState, useEffect } from 'react';
import './GlobalStats.css';

const GlobalStats = () => {
    const [stats, setStats] = useState([]);

    useEffect(() => {

        fetch('https://api.example.com/stats')
            .then(response => response.json())
            .then(data => setStats(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="statistique-global">
            {stats.map(stat => (
                <div className="carte" key={stat.id}>
                    <div className="carte-icone">{stat.icon}</div>
                    <div className="carte-titre">{stat.title}</div>
                    <div className="carte-nombre">{stat.value}</div>
                </div>
            ))}
        </div>
    );
};

export default GlobalStats;

*/