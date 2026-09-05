/* =========================================
   AMF — SYSTÈME DE COMPTES
   Module indépendant
========================================= */

const AMF_COMPTES_STORAGE = "amf_comptes";

/*
   Récupère les comptes enregistrés.
*/
function obtenirComptesAMF() {

    const comptes =
        localStorage.getItem(AMF_COMPTES_STORAGE);

    if (!comptes) {
        return [];
    }

    try {
        return JSON.parse(comptes);
    } catch (erreur) {

        console.error(
            "Impossible de lire les comptes AMF.",
            erreur
        );

        return [];
    }
}


/*
   Enregistre les comptes.
*/
function enregistrerComptesAMF(comptes) {

    localStorage.setItem(
        AMF_COMPTES_STORAGE,
        JSON.stringify(comptes)
    );
}


/*
   Recherche un compte avec son adresse e-mail.
*/
function trouverCompteAMF(email) {

    const comptes =
        obtenirComptesAMF();

    return comptes.find(
        compte =>
            compte.email.toLowerCase() ===
            email.toLowerCase()
    ) || null;
}


/*
   Crée un nouvel utilisateur AMF.
*/
function creerCompteAMF(nom, email) {

    const nomPropre =
        String(nom || "").trim();

    const emailPropre =
        String(email || "").trim().toLowerCase();

    if (!nomPropre || !emailPropre) {

        return {
            success: false,
            message: "Le nom et l'adresse e-mail sont obligatoires."
        };
    }

    const compteExistant =
        trouverCompteAMF(emailPropre);

    if (compteExistant) {

        return {
            success: false,
            message: "Un compte utilisant cette adresse e-mail existe déjà."
        };
    }

    const nouveauCompte = {

        id:
            "amf_" +
            Date.now() +
            "_" +
            Math.random()
                .toString(36)
                .substring(2, 8),

        nom: nomPropre,

        email: emailPropre,

        dateCreation:
            new Date().toISOString(),

        preferences: {

            devise: "FCFA",

            langue: "fr",

            theme: "clair"

        }

    };

    const comptes =
        obtenirComptesAMF();

    comptes.push(nouveauCompte);

    enregistrerComptesAMF(comptes);

    return {
        success: true,
        compte: nouveauCompte
    };
}


/*
   Récupère un compte grâce à son identifiant.
*/
function obtenirCompteAMF(id) {

    const comptes =
        obtenirComptesAMF();

    return comptes.find(
        compte => compte.id === id
    ) || null;
}


/*
   Enregistre le compte actuellement connecté.
*/
function definirCompteActifAMF(compte) {

    if (!compte) {
        return;
    }

    localStorage.setItem(
        "amf_compte_actif",
        compte.id
    );
}


/*
   Récupère le compte actuellement actif.
*/
function obtenirCompteActifAMF() {

    const id =
        localStorage.getItem(
            "amf_compte_actif"
        );

    if (!id) {
        return null;
    }

    return obtenirCompteAMF(id);
}


/*
   Déconnecte le compte actif.
*/
function deconnecterCompteAMF() {

    localStorage.removeItem(
        "amf_compte_actif"
    );
}


/*
   Vérifie si un utilisateur est connecté.
*/
function utilisateurConnecteAMF() {

    return obtenirCompteActifAMF() !== null;
}

console.log(
    "AMF — module de comptes chargé."
);
