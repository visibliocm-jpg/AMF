/* =========================================
   AMF — DONNÉES PERSONNELLES
   Module indépendant
========================================= */

const AMF_DONNEES_STORAGE = "amf_donnees";


/*
   Récupère toutes les données enregistrées.
*/
function obtenirToutesLesDonneesAMF() {

    const donnees =
        localStorage.getItem(AMF_DONNEES_STORAGE);

    if (!donnees) {
        return {};
    }

    try {
        return JSON.parse(donnees);
    } catch (erreur) {

        console.error(
            "Impossible de lire les données AMF.",
            erreur
        );

        return {};
    }
}


/*
   Enregistre toutes les données.
*/
function enregistrerToutesLesDonneesAMF(donnees) {

    localStorage.setItem(
        AMF_DONNEES_STORAGE,
        JSON.stringify(donnees)
    );
}


/*
   Crée l'espace personnel d'un utilisateur.
*/
function creerEspacePersonnelAMF(idUtilisateur) {

    if (!idUtilisateur) {
        return null;
    }

    const toutesLesDonnees =
        obtenirToutesLesDonneesAMF();

    if (!toutesLesDonnees[idUtilisateur]) {

        toutesLesDonnees[idUtilisateur] = {

            revenus: [],

            depenses: [],

            budgets: [],

            objectifs: [],

            statistiques: {},

            parametres: {

                devise: "FCFA",

                notifications: true

            }

        };

        enregistrerToutesLesDonneesAMF(
            toutesLesDonnees
        );
    }

    return toutesLesDonnees[idUtilisateur];
}


/*
   Récupère l'espace personnel d'un utilisateur.
*/
function obtenirDonneesUtilisateurAMF(idUtilisateur) {

    if (!idUtilisateur) {
        return null;
    }

    const toutesLesDonnees =
        obtenirToutesLesDonneesAMF();

    return toutesLesDonnees[idUtilisateur] || null;
}


/*
   Met à jour l'espace personnel d'un utilisateur.
*/
function enregistrerDonneesUtilisateurAMF(
    idUtilisateur,
    donnees
) {

    if (!idUtilisateur || !donnees) {
        return false;
    }

    const toutesLesDonnees =
        obtenirToutesLesDonneesAMF();

    toutesLesDonnees[idUtilisateur] =
        donnees;

    enregistrerToutesLesDonneesAMF(
        toutesLesDonnees
    );

    return true;
}


/*
   Ajoute un revenu.
*/
function ajouterRevenuAMF(idUtilisateur, revenu) {

    const donnees =
        obtenirDonneesUtilisateurAMF(
            idUtilisateur
        ) ||
        creerEspacePersonnelAMF(
            idUtilisateur
        );

    if (!donnees || !revenu) {
        return false;
    }

    donnees.revenus.push(revenu);

    return enregistrerDonneesUtilisateurAMF(
        idUtilisateur,
        donnees
    );
}


/*
   Ajoute une dépense.
*/
function ajouterDepenseAMF(idUtilisateur, depense) {

    const donnees =
        obtenirDonneesUtilisateurAMF(
            idUtilisateur
        ) ||
        creerEspacePersonnelAMF(
            idUtilisateur
        );

    if (!donnees || !depense) {
        return false;
    }

    donnees.depenses.push(depense);

    return enregistrerDonneesUtilisateurAMF(
        idUtilisateur,
        donnees
    );
}


/*
   Ajoute un budget.
*/
function ajouterBudgetAMF(idUtilisateur, budget) {

    const donnees =
        obtenirDonneesUtilisateurAMF(
            idUtilisateur
        ) ||
        creerEspacePersonnelAMF(
            idUtilisateur
        );

    if (!donnees || !budget) {
        return false;
    }

    donnees.budgets.push(budget);

    return enregistrerDonneesUtilisateurAMF(
        idUtilisateur,
        donnees
    );
}


/*
   Ajoute un objectif.
*/
function ajouterObjectifAMF(idUtilisateur, objectif) {

    const donnees =
        obtenirDonneesUtilisateurAMF(
            idUtilisateur
        ) ||
        creerEspacePersonnelAMF(
            idUtilisateur
        );

    if (!donnees || !objectif) {
        return false;
    }

    donnees.objectifs.push(objectif);

    return enregistrerDonneesUtilisateurAMF(
        idUtilisateur,
        donnees
    );
}


console.log(
    "AMF — module de données personnelles chargé."
);
