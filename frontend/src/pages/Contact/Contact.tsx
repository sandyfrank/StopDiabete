import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageSquare, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implémenter l'envoi du formulaire
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-5xl">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 mb-6 sm:mb-8 border border-green-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Contactez-nous
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Nous sommes là pour vous aider
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Formulaire */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h2>
              
              {submitted ? (
                <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6 sm:p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-900 mb-2">Message envoyé !</h3>
                  <p className="text-green-700 text-sm sm:text-base">
                    Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Votre nom"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="votre.email@exemple.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Sujet <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="question">Question générale</option>
                      <option value="support">Support technique</option>
                      <option value="feature">Suggestion de fonctionnalité</option>
                      <option value="bug">Signaler un bug</option>
                      <option value="privacy">Question sur la confidentialité</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-sm sm:text-base"
                      placeholder="Décrivez votre demande en détail..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 sm:py-4 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg hover:shadow-xl"
                  >
                    <Send className="w-5 h-5" />
                    Envoyer le message
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Informations de contact */}
          <div className="space-y-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Informations de Contact</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 mb-1">Email</p>
                    <a href="mailto:support@stopdiabete.com" className="text-sm text-blue-600 hover:underline break-all">
                      support@stopdiabete.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 mb-1">Téléphone</p>
                    <p className="text-sm text-gray-600">+33 1 23 45 67 89</p>
                    <p className="text-xs text-gray-500 mt-1">Lun-Ven: 9h-18h</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 mb-1">Adresse</p>
                    <p className="text-sm text-gray-600">
                      123 Avenue de la Santé<br />
                      75001 Paris, France
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-blue-900 mb-3">Temps de Réponse</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">⚡</span>
                  <div>
                    <p className="font-medium text-blue-900">Questions urgentes</p>
                    <p className="text-blue-700 text-xs">Réponse sous 24h</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">📧</span>
                  <div>
                    <p className="font-medium text-blue-900">Questions générales</p>
                    <p className="text-blue-700 text-xs">Réponse sous 48-72h</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-lg font-bold text-green-900 mb-3">Besoin d'aide rapide ?</h3>
              <p className="text-sm text-green-800 mb-3">
                Consultez notre section FAQ ou nos ressources éducatives pour trouver des réponses immédiates.
              </p>
              <Link
                to="/education"
                className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800 transition-colors"
              >
                <span>→</span>
                Accéder aux ressources
              </Link>
            </div>
          </div>
        </div>

        {/* Note de confidentialité */}
        <div className="mt-6 bg-indigo-50 rounded-xl p-4 sm:p-6 border border-indigo-200">
          <p className="text-xs sm:text-sm text-indigo-800">
            <span className="font-bold">🔒 Confidentialité :</span> Vos informations sont traitées de manière 
            confidentielle conformément à notre <a href="/privacy" className="underline font-semibold">Politique de Confidentialité</a>. 
            Nous ne partageons jamais vos données avec des tiers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
