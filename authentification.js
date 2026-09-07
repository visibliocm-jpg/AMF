/* =========================================
   AMF — AUTHENTIFICATION
   Module indépendant
========================================= */

const AMF_AUTH_STORAGE = "amf_authentification";

const AMF_PBKDF2_ITERATIONS = 120000;


/* =========================================
   OUTILS INTERNES
========================================= */

function obtenirAuthentificationsAMF() {

    const donnees =
        localStorage.getItem(AMF_AUTH_STORAGE);

    if (!donnees) {
        return {};
    }

    try {

        return JSON.parse(donnees);

    } catch (erreur) {

        console.error(
            "Impossible de lire les authentifications AMF.",
            erreur
        );

        return {};
    }
}


function enregistrerAuthentificationsAMF(
    authentifications
) {

    localStorage.setItem(
        AMF_AUTH_STORAGE,
        JSON.stringify(authentifications)
    );
}


/* =========================================
   CONVERSION TEXTE → OCTETS
========================================= */

function texteVersOctetsAMF(texte) {

    return new TextEncoder().encode(texte);
}


/* =========================================
   OCTETS → BASE64
========================================= */

function octetsVersBase64AMF(octets) {

    let resultat = "";

    const tailleBloc = 0x8000;

    for (
        let i = 0;
        i < octets.length;
        i += tailleBloc
    ) {

        resultat += String.fromCharCode(
            ...octets.subarray(
                i,
                i + tailleBloc
            )
        );
    }

    return btoa(resultat);
}


/* =========================================
   BASE64 → OCTETS
========================================= */

function base64VersOctetsAMF(base64) {

    const texte =
        atob(base64);

    const octets =
        new Uint8Array(
            texte.length
        );

    for (
        let i = 0;
        i < texte.length;
        i++
    ) {

        octets[i] =
            texte.charCodeAt(i);
    }

    return octets;
}


/* =========================================
   CRÉATION D'UN SEL
========================================= */

function creerSelAMF() {

    const sel =
        new Uint8Array(16);

    crypto.getRandomValues(sel);

    return octetsVersBase64AMF(sel);
}


/* =========================================
   HACHAGE DU MOT DE PASSE
========================================= */

async function hacherMotDePasseAMF(
    motDePasse,
    selBase64
) {

    const sel =
        base64VersOctetsAMF(
            selBase64
        );

    const motDePasseBytes =
        texteVersOctetsAMF(
            motDePasse
        );

    const cle =
        await crypto.subtle.importKey(
            "raw",
            motDePasseBytes,
            {
                name: "PBKDF2"
            },
            false,
            [
                "deriveBits"
            ]
        );

    const bits =
        await crypto.subtle.deriveBits(
            {
                name: "PBKDF2",

                salt: sel,

                iterations:
                    AMF_PBKDF2_ITERATIONS,

                hash: "SHA-256"
            },

            cle,

            256
        );

    return octetsVersBase64AMF(
        new Uint8Array(bits)
    );
}


/* =========================================
   CRÉER LES IDENTIFIANTS D'AUTHENTIFICATION
========================================= */

async function creerAuthentificationAMF(
    idUtilisateur,
    motDePasse
) {

    if (
        !idUtilisateur ||
        !motDePasse
    ) {

        return {
            success: false,
            message:
                "Informations d'authentification manquantes."
        };
    }


    if (motDePasse.length < 6) {

        return {
            success: false,
            message:
                "Le mot de passe doit contenir au moins 6 caractères."
        };
    }


    const authentifications =
        obtenirAuthentificationsAMF();


    if (
        authentifications[idUtilisateur]
    ) {

        return {
            success: false,
            message:
                "Une authentification existe déjà pour ce compte."
        };
    }


    const sel =
        creerSelAMF();


    const hash =
        await hacherMotDePasseAMF(
            motDePasse,
            sel
        );


    authentifications[idUtilisateur] = {

        algorithme: "PBKDF2-SHA256",

        iterations:
            AMF_PBKDF2_ITERATIONS,

        sel: sel,

        hash: hash,

        dateCreation:
            new Date().toISOString()

    };


    enregistrerAuthentificationsAMF(
        authentifications
    );


    return {
        success: true
    };
}


/* =========================================
   VÉRIFIER UN MOT DE PASSE
========================================= */

async function verifierMotDePasseAMF(
    idUtilisateur,
    motDePasse
) {

    if (
        !idUtilisateur ||
        !motDePasse
    ) {

        return false;
    }


    const authentifications =
        obtenirAuthentificationsAMF();


    const authentification =
        authentifications[
            idUtilisateur
        ];


    if (!authentification) {

        return false;
    }


    const hash =
        await hacherMotDePasseAMF(
            motDePasse,
            authentification.sel
        );


    return hash ===
        authentification.hash;
}


/* =========================================
   AUTHENTIFICATION D'UN UTILISATEUR
========================================= */

async function authentifierUtilisateurAMF(
    idUtilisateur,
    motDePasse
) {

    const valide =
        await verifierMotDePasseAMF(
            idUtilisateur,
            motDePasse
        );


    if (!valide) {

        return {
            success: false,
            message:
                "Mot de passe incorrect."
        };
    }


    return {
        success: true
    };
}


/* =========================================
   SUPPRIMER L'AUTHENTIFICATION
========================================= */

function supprimerAuthentificationAMF(
    idUtilisateur
) {

    if (!idUtilisateur) {

        return false;
    }


    const authentifications =
        obtenirAuthentificationsAMF();


    if (
        !authentifications[idUtilisateur]
    ) {

        return false;
    }


    delete authentifications[
        idUtilisateur
    ];


    enregistrerAuthentificationsAMF(
        authentifications
    );


    return true;
}


console.log(
    "AMF — module d'authentification chargé."
);
