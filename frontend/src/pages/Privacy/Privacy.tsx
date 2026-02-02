import React from 'react';
import { Shield, Lock, Eye, Database, UserCheck, AlertTriangle } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-5xl">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 mb-6 sm:mb-8 border border-indigo-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Politique de Confidentialité
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
            Chez <span className="font-semibold text-indigo-600">StopDiabète</span>, la protection de 
            vos données personnelles et de santé est notre priorité absolue. Cette politique de 
            confidentialité décrit comment nous collectons, utilisons, protégeons et partageons vos 
            informations.
          </p>
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
            <p className="text-indigo-800 text-xs sm:text-sm">
              <span className="font-bold">🔒 Engagement :</span> Nous respectons le RGPD (Règlement Général 
              sur la Protection des Données) et les lois applicables en matière de protection des données de santé.
            </p>
          </div>
        </div>

        {/* Données collectées */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 mb-6 border border-gray-200">
          <div className="flex items-start gap-3 sm:gap-4 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Database className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Données Collectées</h2>
          </div>

          <div className="space-y-4">
            <div className="border-l-4 border-blue-400 pl-4 py-2">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">1. Données d'identification</h3>
              <ul className="space-y-1 text-gray-700 text-xs sm:text-sm">
                <li>• Nom et prénom</li>
                <li>• Adresse email</li>
                <li>• Date de naissance</li>
                <li>• Mot de passe (chiffré)</li>
              </ul>
            </div>

            <div className="border-l-4 border-green-400 pl-4 py-2">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">2. Données de santé</h3>
              <ul className="space-y-1 text-gray-700 text-xs sm:text-sm">
                <li>• Mesures de glycémie (valeur, date, type de mesure)</li>
                <li>• Données anthropométriques (taille, poids, tour de taille)</li>
                <li>• Antécédents médicaux et familiaux</li>
                <li>• Résultats des tests de risque</li>
                <li>• Habitudes de vie (activité physique, alimentation)</li>
              </ul>
            </div>

            <div className="border-l-4 border-purple-400 pl-4 py-2">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">3. Données techniques</h3>
              <ul className="space-y-1 text-gray-700 text-xs sm:text-sm">
                <li>• Adresse IP</li>
                <li>• Type de navigateur et appareil</li>
                <li>• Données de navigation (pages visitées, durée)</li>
                <li>• Cookies et technologies similaires</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Utilisation des données */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 mb-6 border border-gray-200">
          <div className="flex items-start gap-3 sm:gap-4 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Utilisation de vos Données</h2>
          </div>

          <p className="text-gray-700 text-sm sm:text-base mb-4">Vos données sont utilisées exclusivement pour :</p>

          <div className="space-y-3">
            {[
              { icon: '✅', text: 'Fournir et améliorer nos services de suivi et de prévention du diabète' },
              { icon: '📊', text: 'Générer des graphiques et statistiques personnalisés' },
              { icon: '🎯', text: 'Calculer votre niveau de risque et fournir des recommandations adaptées' },
              { icon: '🔔', text: 'Vous envoyer des rappels et notifications (avec votre consentement)' },
              { icon: '🔒', text: 'Assurer la sécurité et prévenir les fraudes' },
              { icon: '📧', text: 'Communiquer avec vous concernant votre compte et nos services' },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                <span className="text-lg sm:text-xl">{item.icon}</span>
                <p className="text-gray-700 text-xs sm:text-sm">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 bg-red-50 p-4 rounded-lg border-2 border-red-300">
            <p className="text-red-800 text-xs sm:text-sm font-medium">
              ❌ Nous ne vendons JAMAIS vos données personnelles ou de santé à des tiers.
            </p>
          </div>
        </div>

        {/* Sécurité */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 mb-6 border border-gray-200">
          <div className="flex items-start gap-3 sm:gap-4 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Sécurité des Données</h2>
          </div>

          <p className="text-gray-700 text-sm sm:text-base mb-4">
            Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles robustes :
          </p>

          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base flex items-center gap-2">
                <span className="text-lg">🔐</span> Chiffrement
              </h3>
              <p className="text-gray-700 text-xs sm:text-sm">
                Toutes les données sensibles sont chiffrées en transit (HTTPS/TLS) et au repos (AES-256)
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base flex items-center gap-2">
                <span className="text-lg">🛡️</span> Protection
              </h3>
              <p className="text-gray-700 text-xs sm:text-sm">
                Pare-feu, détection d'intrusion et surveillance 24/7 de notre infrastructure
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base flex items-center gap-2">
                <span className="text-lg">🔑</span> Accès limité
              </h3>
              <p className="text-gray-700 text-xs sm:text-sm">
                Seuls les employés autorisés ont accès aux données, selon le principe du moindre privilège
              </p>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base flex items-center gap-2">
                <span className="text-lg">💾</span> Sauvegardes
              </h3>
              <p className="text-gray-700 text-xs sm:text-sm">
                Sauvegardes régulières et chiffrées pour garantir la récupération en cas d'incident
              </p>
            </div>
          </div>
        </div>

        {/* Vos droits */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 mb-6 border border-gray-200">
          <div className="flex items-start gap-3 sm:gap-4 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Vos Droits</h2>
          </div>

          <p className="text-gray-700 text-sm sm:text-base mb-4">
            Conformément au RGPD, vous disposez des droits suivants :
          </p>

          <div className="space-y-3">
            {[
              { title: 'Droit d\'accès', desc: 'Obtenir une copie de toutes vos données personnelles' },
              { title: 'Droit de rectification', desc: 'Corriger vos données inexactes ou incomplètes' },
              { title: 'Droit à l\'effacement', desc: 'Supprimer définitivement votre compte et vos données' },
              { title: 'Droit d\'opposition', desc: 'Vous opposer au traitement de vos données' },
              { title: 'Droit à la portabilité', desc: 'Récupérer vos données dans un format structuré' },
              { title: 'Droit de limitation', desc: 'Limiter le traitement de vos données dans certains cas' },
            ].map((right, index) => (
              <div key={index} className="border-l-4 border-indigo-400 pl-4 py-2 bg-indigo-50">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{right.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm">{right.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-blue-800 text-xs sm:text-sm">
              <span className="font-bold">📧 Contact :</span> Pour exercer vos droits, contactez-nous à 
              <a href="mailto:privacy@stopdiabete.com" className="font-semibold underline ml-1">
                privacy@stopdiabete.com
              </a>
            </p>
          </div>
        </div>

        {/* Cookies */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 mb-6 border border-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Cookies et Technologies Similaires</h2>
          <p className="text-gray-700 text-sm sm:text-base mb-4">
            Nous utilisons des cookies pour améliorer votre expérience :
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-2 text-xs sm:text-sm">
              <span className="text-green-600 mt-1">✓</span>
              <span className="text-gray-700"><span className="font-semibold">Cookies essentiels :</span> Nécessaires au fonctionnement du site (authentification, sécurité)</span>
            </div>
            <div className="flex items-start gap-2 text-xs sm:text-sm">
              <span className="text-blue-600 mt-1">✓</span>
              <span className="text-gray-700"><span className="font-semibold">Cookies de performance :</span> Analyser l'utilisation pour améliorer nos services</span>
            </div>
          </div>
          <p className="text-gray-600 text-xs sm:text-sm mt-3">
            Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.
          </p>
        </div>

        {/* Conservation */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 mb-6 border border-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Conservation des Données</h2>
          <div className="space-y-3">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-700 text-xs sm:text-sm">
                <span className="font-semibold">Compte actif :</span> Vos données sont conservées tant que votre compte est actif
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-gray-700 text-xs sm:text-sm">
                <span className="font-semibold">Après suppression :</span> Les données sont supprimées sous 30 jours, 
                sauf obligations légales (comptabilité, litiges)
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-r from-indigo-100 to-blue-100 rounded-xl p-6 sm:p-8 border-2 border-indigo-300">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-indigo-700 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-indigo-900 mb-2 text-base sm:text-lg">Questions ou Préoccupations ?</h3>
              <p className="text-indigo-800 text-xs sm:text-sm mb-3">
                Si vous avez des questions concernant cette politique de confidentialité ou le traitement 
                de vos données, n'hésitez pas à nous contacter :
              </p>
              <div className="space-y-1 text-indigo-800 text-xs sm:text-sm">
                <p>📧 Email : <a href="mailto:privacy@stopdiabete.com" className="font-semibold underline">privacy@stopdiabete.com</a></p>
                <p>📧 Support : <a href="mailto:support@stopdiabete.com" className="font-semibold underline">support@stopdiabete.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
