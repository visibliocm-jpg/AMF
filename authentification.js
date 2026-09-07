// ================================
// AMF - Gestion de l'authentification
// ================================

// Récupération du formulaire d'inscription
const inscriptionForm = document.getElementById("inscriptionForm");

// Récupération de la zone de message
const message = document.getElementById("message");

// Vérifie si le formulaire d'inscription existe sur la page
if (inscriptionForm) {

  inscriptionForm.addEventListener("submit", function(event) {

    // Empêche le rechargement de la page
    event.preventDefault();

    // Récupération des informations saisies
    const nom = document.getElementById("nom").value.trim();
    const email = document.getElementById("email").value.trim();
    const motDePasse = document.getElementById("motDePasse").value;
    const confirmation = document.getElementById("confirmation").value;

    // Vérification des mots de passe
    if (motDePasse !== confirmation) {
      message.textContent = "Les mots de passe ne correspondent pas.";
      message.style.color = "red";
      return;
    }

    // Vérification de la longueur du mot de passe
    if (motDePasse.length < 6) {
      message.textContent =
        "Le mot de passe doit contenir au moins 6 caractères.";
      message.style.color = "red";
      return;
    }

    // Création du compte
    const utilisateur = {
      nom: nom,
      email: email,
      motDePasse: motDePasse
    };

    // Enregistrement du compte dans le navigateur
    localStorage.setItem(
      "utilisateurAMF",
      JSON.stringify(utilisateur)
    );

    // Message de confirmation
    message.textContent =
      "Compte créé avec succès ! Vous pouvez maintenant vous connecter.";

    message.style.color = "green";

    // Réinitialisation du formulaire
    inscriptionForm.reset();

  });
}
