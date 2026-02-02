import React from 'react';
import { FileText, AlertCircle, Scale, Ban, CheckCircle } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-5xl">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 mb-6 sm:mb-8 border border-blue-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Scale className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Conditions d'Utilisation
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Dernière mise à jour : 2 février 2026
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 mb-6 border border-gray-200">
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4">
            Bienvenue sur <span className="font-semibold text-blue-600">StopDiabète</span>. En utilisant 
            notre plateforme, vous acceptez les présentes conditions d'utilisation. Veuillez les lire 
            attentivement.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-blue-800 text-xs sm:text-sm">
              <span className="font-bold">📋 Important :</span> Si vous n'acceptez pas ces conditions, 
              veuillez ne pas utiliser nos services.
            </p>
          </div>
        </div>

        {/* Acceptation */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 mb-6 border border-gray-200">
          <div className="flex items-start gap-3 sm:gap-4 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">1. Acceptation des Conditions</h2>
          </div>
          <div className="space-y-3 text-gray-700 text-sm sm:text-base">
            <p>En créant un compte et en utilisant StopDiabète, vous :</p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Confirmez avoir au moins 18 ans ou avoir l'autorisation d'un parent/tuteur</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Acceptez de respecter toutes les lois applicables</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Reconnaissez avoir lu et compris notre Politique de Confidentialité</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Description du service */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 mb-6 border border-gray-200">
          <div className="flex items-start gap-3 sm:gap-4 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">2. Description du Service</h2>
          </div>
          <div className="space-y-4">
            <p className="text-gray-700 text-sm sm:text-base">
              StopDiabète est une plateforme web de prévention et de gestion du diabète qui offre :
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
                <p className="text-gray-700 text-xs sm:text-sm">
                  <span className="font-semibold">📊</span> Suivi de glycémie personnalisé
                </p>
              </div>
              <div className="bg-purple-50 p-3 sm:p-4 rounded-lg border border-purple-200">
                <p className="text-gray-700 text-xs sm:text-sm">
                  <span className="font-semibold">🎯</span> Évaluation du risque diabétique
                </p>
              </div>
              <div className="bg-green-50 p-3 sm:p-4 rounded-lg border border-green-200">
                <p className="text-gray-700 text-xs sm:text-sm">
                  <span className="font-semibold">📚</span> Ressources éducatives fiables
                </p>
              </div>
              <div className="bg-orange-50 p-3 sm:p-4 rounded-lg border border-orange-200">
                <p className="text-gray-700 text-xs sm:text-sm">
                  <span className="font-semibold">📈</span> Statistiques et visualisations
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer médical */}
        <div className="bg-red-50 rounded-xl shadow-lg p-6 sm:p-8 mb-6 border-2 border-red-300">
          <div className="flex items-start gap-3 sm:gap-4 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-red-900">3. Avertissement Médical Important</h2>
          </div>
          <div className="space-y-3 text-red-800 text-sm sm:text-base">
            <p className="font-semibold">
              ⚠️ StopDiabète est un outil d'information et de suivi. Il NE REMPLACE PAS :
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-1">✗</span>
                <span>Une consultation avec un professionnel de santé qualifié</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-1">✗</span>
                <span>Un diagnostic médical professionnel</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-1">✗</span>
                <span>Un traitement ou une prescription médicale</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-1">✗</span>
                <span>Un dispositif médical certifié</span>
              </li>
            </ul>
            <div className="bg-red-100 p-4 rounded-lg border-2 border-red-400 mt-4">
              <p className="font-bold">
                🚨 En cas d'urgence médicale, contactez immédiatement les services d'urgence (15, 112) 
                ou rendez-vous à l'hôpital le plus proche.
              </p>
            </div>
          </div>
        </div>

        {/* Compte utilisateur */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 mb-6 border border-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">4. Compte Utilisateur</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-400 pl-4 py-2">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Vos Responsabilités</h3>
              <ul className="space-y-2 text-gray-700 text-xs sm:text-sm">
                <li>• Fournir des informations exactes et à jour lors de l'inscription</li>
                <li>• Maintenir la confidentialité de votre mot de passe</li>
                <li>• Vous êtes responsable de toutes les activités sur votre compte</li>
                <li>• Notifier immédiatement tout accès non autorisé</li>
                <li>• Ne pas partager votre compte avec d'autres personnes</li>
              </ul>
            </div>
            <div className="border-l-4 border-purple-400 pl-4 py-2">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Nos Droits</h3>
              <ul className="space-y-2 text-gray-700 text-xs sm:text-sm">
                <li>• Suspendre ou résilier votre compte en cas de violation des conditions</li>
                <li>• Supprimer du contenu inapproprié</li>
                <li>• Modifier ou interrompre le service avec préavis</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Utilisation acceptable */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 mb-6 border border-gray-200">
          <div className="flex items-start gap-3 sm:gap-4 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Ban className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">5. Utilisation Acceptable</h2>
          </div>
          <p className="text-gray-700 text-sm sm:text-base mb-4">Vous vous engagez à NE PAS :</p>
          <div className="space-y-2">
            {[
              'Utiliser le service à des fins illégales ou non autorisées',
              'Tenter d\'accéder aux comptes d\'autres utilisateurs',
              'Diffuser des virus, malwares ou codes malveillants',
              'Collecter des données d\'autres utilisateurs sans autorisation',
              'Utiliser des robots, scrapers ou outils automatisés',
              'Surcharger ou perturber nos serveurs',
              'Copier, reproduire ou distribuer notre contenu sans autorisation',
              'Se faire passer pour une autre personne ou entité',
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-2 p-2 sm:p-3 bg-orange-50 rounded-lg">
                <span className="text-orange-600 mt-1">✗</span>
                <p className="text-gray-700 text-xs sm:text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Propriété intellectuelle */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 mb-6 border border-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">6. Propriété Intellectuelle</h2>
          <div className="space-y-3 text-gray-700 text-sm sm:text-base">
            <p>
              Tous les contenus de StopDiabète (textes, graphiques, logos, images, code source) sont 
              protégés par les droits d'auteur et appartiennent à StopDiabète ou à ses concédants de licence.
            </p>
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
              <p className="text-indigo-800 text-xs sm:text-sm">
                <span className="font-bold">© 2026 StopDiabète.</span> Tous droits réservés. 
                Toute reproduction ou distribution non autorisée est interdite.
              </p>
            </div>
          </div>
        </div>

        {/* Limitation de responsabilité */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 mb-6 border border-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">7. Limitation de Responsabilité</h2>
          <div className="space-y-3 text-gray-700 text-sm sm:text-base">
            <p>StopDiabète est fourni "tel quel" sans garantie d'aucune sorte. Nous ne garantissons pas :</p>
            <ul className="space-y-2 ml-4">
              <li>• L'exactitude, l'exhaustivité ou la fiabilité du contenu</li>
              <li>• L'absence d'erreurs ou d'interruptions du service</li>
              <li>• La sécurité absolue contre les cyberattaques</li>
            </ul>
            <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-300 mt-4">
              <p className="text-yellow-900 text-xs sm:text-sm">
                <span className="font-bold">⚠️</span> Nous ne sommes pas responsables des dommages directs, 
                indirects, accessoires ou consécutifs résultant de l'utilisation ou de l'impossibilité 
                d'utiliser notre service.
              </p>
            </div>
          </div>
        </div>

        {/* Modifications */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 mb-6 border border-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">8. Modifications des Conditions</h2>
          <p className="text-gray-700 text-sm sm:text-base mb-3">
            Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications 
            seront effectives dès leur publication sur cette page.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-blue-800 text-xs sm:text-sm">
              💡 Nous vous recommandons de consulter régulièrement cette page. Votre utilisation continue 
              du service après les modifications constitue votre acceptation des nouvelles conditions.
            </p>
          </div>
        </div>

        {/* Résiliation */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 mb-6 border border-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">9. Résiliation</h2>
          <div className="space-y-3 text-gray-700 text-sm sm:text-base">
            <p>Vous pouvez résilier votre compte à tout moment depuis les paramètres de votre profil.</p>
            <p>
              Nous pouvons suspendre ou résilier votre accès immédiatement, sans préavis, en cas de 
              violation de ces conditions ou pour toute autre raison légitime.
            </p>
          </div>
        </div>

        {/* Loi applicable */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 mb-6 border border-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">10. Loi Applicable et Juridiction</h2>
          <p className="text-gray-700 text-sm sm:text-base">
            Ces conditions sont régies par les lois françaises. Tout litige sera soumis à la juridiction 
            exclusive des tribunaux français.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl p-6 sm:p-8 border-2 border-blue-300">
          <h3 className="font-bold text-blue-900 mb-3 text-base sm:text-lg">Questions sur les Conditions ?</h3>
          <p className="text-blue-800 text-xs sm:text-sm mb-3">
            Pour toute question concernant ces conditions d'utilisation, contactez-nous :
          </p>
          <div className="space-y-1 text-blue-800 text-xs sm:text-sm">
            <p>📧 Email : <a href="mailto:legal@stopdiabete.com" className="font-semibold underline">legal@stopdiabete.com</a></p>
            <p>📧 Support : <a href="mailto:support@stopdiabete.com" className="font-semibold underline">support@stopdiabete.com</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
