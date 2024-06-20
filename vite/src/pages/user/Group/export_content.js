export const saveContent = (content) => {
    // Logic to save content to a file or elsewhere
    console.log('NOM DU GROUPE :', content);

    // Exemple d'enregistrement du contenu dans le localStorage
    localStorage.setItem('exportedContent', content);

};  