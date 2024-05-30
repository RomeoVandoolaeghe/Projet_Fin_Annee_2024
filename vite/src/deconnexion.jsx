import { useState } from 'react'
import axios from 'axios';


function Deconnexion(){

    const handleLogout = () => {

        document.cookie = 'Pseudo_Cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';  
    }
    return (
        <button onClick={handleLogout}>Déconnexion</button>
    );

}
export default Deconnexion