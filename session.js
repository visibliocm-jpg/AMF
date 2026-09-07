/* =========================================
   AMF — GESTION DE SESSION
   Module indépendant
========================================= */

const AMF_SESSION_STORAGE = "amf_compte_actif";


/* =========================================
   RÉCUPÉRER L'UTILISATEUR CONNECTÉ
========================================= */

function obtenirUtilisateurConnecteAMF() {

    const idUtilisateur =
        localStorage.getItem(
            AMF_SESSION_STORAGE
        );

    if (!idUtilisateur) {
        return null;
    }

    return obtenirCompteAMF(
        idUtilisateur
    );
}


/* =========================================
   VÉRIFIER LA SESSION
========================================= */

function sessionAMFActive() {

    return obtenirUtilisateurConnecteAMF()
        !== null;
}


/* =========================================
   OBTENIR L'ID DE L'UTILISATEUR
========================================= */

function obtenirIdUtilisateurAMF() {

    const utilisateur =
        obtenirUtilisateurConnecteAMF();

    if (!utilisateur) {
        return null;
    }

    return utilisateur.id;
}


/* =========================================
   OBTENIR LE NOM DE L'UTILISATEUR
========================================= */

function obtenirNomUtilisateurAMF() {

    const utilisateur =
        obtenirUtilisateurConnecteAMF();

    if (!utilisateur) {
        return null;
    }

    return utilisateur.nom;
}


/* =========================================
   OBTENIR L'E-MAIL
========================================= */

function obtenirEmailUtilisateurAMF() {

    const utilisateur =
        obtenirUtilisateurConnecteAMF();

    if (!utilisateur) {
        return null;
    }

    return utilisateur.email;
}


/* =========================================
   DÉCONNEXION
========================================= */

function fermerSessionAMF() {

    localStorage.removeItem(
        AMF_SESSION_STORAGE
    );

    console.log(
        "AMF — session fermée."
    );
}


/* =========================================
   PROTECTION D'UNE PAGE
========================================= */

function protegerPageAMF() {

    if (!sessionAMFActive()) {

        window.location.href =
            "connexion.html";

        return false;
    }

    return true;
}


/* =========================================
   INFORMATIONS DE SESSION
========================================= */

function afficherSessionAMF() {

    const utilisateur =
        obtenirUtilisateurConnecteAMF();

    if (!utilisateur) {

        console.log(
            "AMF — aucun utilisateur connecté."
        );

        return;
    }

    console.log(
        "AMF — utilisateur connecté :",
        utilisateur.nom,
        utilisateur.email
    );
}


console.log(
    "AMF — module de session chargé."
);
