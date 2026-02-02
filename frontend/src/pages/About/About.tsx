import React from 'react';
import { Heart, Target, Users, Shield, Award, Stethoscope } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-5xl">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 mb-6 sm:mb-8 border border-purple-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                À Propos de StopDiabète
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Votre partenaire de confiance pour la prévention et la gestion du diabète
              </p>
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 mb-6 border border-gray-200">
          <div className="flex items-start gap-3 sm:gap-4 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Notre Mission</h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3">
                StopDiabète est une plateforme innovante conçue pour aider les individus à prévenir, 
                détecter et gérer le diabète de manière efficace et accessible.
              </p>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Notre objectif est de démocratiser l'accès aux informations médicales fiables et aux 
                outils de suivi personnalisés pour améliorer la qualité de vie des personnes concernées 
                par le diabète.
              </p>
            </div>
          </div>
        </div>

        {/* Valeurs */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 mb-6 border border-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Nos Valeurs</h2>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-5 rounded-xl border border-blue-200">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 text-base sm:text-lg">Confidentialité</h3>
                  <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                    Vos données de santé sont précieuses. Nous garantissons leur protection avec 
                    les plus hauts standards de sécurité.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-5 rounded-xl border border-green-200">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 text-base sm:text-lg">Fiabilité</h3>
                  <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                    Informations validées par des professionnels de santé et conformes aux 
                    recommandations de l'OMS et de l'ADA.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 sm:p-5 rounded-xl border border-purple-200">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 text-base sm:text-lg">Accessibilité</h3>
                  <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                    Interface simple et intuitive, accessible sur tous vos appareils (ordinateur, 
                    tablette, smartphone).
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 sm:p-5 rounded-xl border border-orange-200">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Stethoscope className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 text-base sm:text-lg">Accompagnement</h3>
                  <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                    Suivi personnalisé et recommandations adaptées à votre profil et vos besoins 
                    spécifiques.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fonctionnalités */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 mb-6 border border-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Nos Fonctionnalités</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-2xl sm:text-3xl">📊</span>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Suivi de glycémie</h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Enregistrez vos mesures de glycémie et visualisez vos tendances avec des graphiques interactifs
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-purple-50 rounded-lg border border-purple-200">
              <span className="text-2xl sm:text-3xl">🎯</span>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Test de risque</h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Évaluez votre risque de diabète avec notre questionnaire basé sur les critères médicaux internationaux
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-green-50 rounded-lg border border-green-200">
              <span className="text-2xl sm:text-3xl">📚</span>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Éducation thérapeutique</h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Accédez à des informations complètes et fiables sur le diabète en langage accessible
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-orange-50 rounded-lg border border-orange-200">
              <span className="text-2xl sm:text-3xl">📱</span>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Application mobile-friendly</h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Interface optimisée pour smartphones et tablettes, accessible partout et à tout moment
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Équipe & Références */}
        <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-6 sm:p-8 border-2 border-purple-300">
          <h2 className="text-xl sm:text-2xl font-bold text-purple-900 mb-4">Références Médicales</h2>
          <p className="text-purple-800 text-sm sm:text-base leading-relaxed mb-4">
            StopDiabète s'appuie sur les recommandations officielles des organisations 
            internationales de santé :
          </p>
          <ul className="space-y-2 text-purple-800 text-sm sm:text-base">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">✓</span>
              <span><span className="font-semibold">OMS</span> (Organisation Mondiale de la Santé)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">✓</span>
              <span><span className="font-semibold">ADA</span> (American Diabetes Association)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">✓</span>
              <span><span className="font-semibold">SFD</span> (Société Francophone du Diabète)</span>
            </li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 bg-yellow-50 rounded-xl p-4 sm:p-6 border-2 border-yellow-300">
          <p className="text-yellow-900 text-xs sm:text-sm leading-relaxed">
            <span className="font-bold">⚠️ Important :</span> StopDiabète est un outil d'information et 
            d'aide à la gestion du diabète. Il ne remplace en aucun cas une consultation médicale, un 
            diagnostic ou un traitement prescrit par un professionnel de santé qualifié.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
