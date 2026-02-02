import React, { useState } from 'react';
import { Book, Heart, Activity, AlertTriangle, Users, Baby, FileText, ChevronDown, ChevronUp } from 'lucide-react';

interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const Education: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string>('generalites');

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? '' : sectionId);
  };

  const sections: Section[] = [
    {
      id: 'generalites',
      title: 'Généralités sur le Diabète',
      icon: <Book className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
            <h4 className="text-lg font-semibold text-blue-900 mb-3">Qu'est-ce que le diabète ?</h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              Le diabète se caractérise par une <span className="font-semibold text-blue-700">hyperglycémie chronique</span> (trop de sucre dans le sang) 
              due à un défaut de sécrétion ou d'assimilation de l'insuline.
            </p>
            <p className="text-gray-700 leading-relaxed">
              L'<span className="font-semibold text-blue-700">insuline</span>, seule hormone hypoglycémiante, est produite par les cellules béta du pancréas. 
              Elle permet au glucose d'entrer dans les cellules pour leur fournir de l'énergie.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-5 rounded-xl border-2 border-green-300">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h5 className="font-semibold text-green-900">Glycémie normale</h5>
              </div>
              <p className="text-3xl font-bold text-green-700">0,8 - 1,10 g/L</p>
              <p className="text-sm text-gray-600 mt-2">À jeun</p>
            </div>

            <div className="bg-red-50 p-5 rounded-xl border-2 border-red-300">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <h5 className="font-semibold text-red-900">Diabète</h5>
              </div>
              <p className="text-3xl font-bold text-red-700">&gt; 1,26 g/L</p>
              <p className="text-sm text-gray-600 mt-2">À jeun, à 2 reprises</p>
            </div>
          </div>

          <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
            <h4 className="text-lg font-semibold text-purple-900 mb-4">Les 3 types de diabète</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-white p-4 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-purple-700 font-bold">1</span>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900">Diabète de type 1</h5>
                  <p className="text-sm text-gray-600">Maladie auto-immune, ~10% des cas</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-4 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-purple-700 font-bold">2</span>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900">Diabète de type 2</h5>
                  <p className="text-sm text-gray-600">Insulinorésistance, le plus fréquent</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-4 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-purple-700 font-bold">G</span>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900">Diabète gestationnel</h5>
                  <p className="text-sm text-gray-600">Pendant la grossesse</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'type1',
      title: 'Diabète de Type 1',
      icon: <Activity className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
            <h4 className="text-lg font-semibold text-orange-900 mb-3">Définition</h4>
            <p className="text-gray-700 leading-relaxed">
              Maladie <span className="font-semibold text-orange-700">auto-immune</span> caractérisée par une destruction progressive 
              des cellules béta du pancréas. Concerne environ <span className="font-semibold">10% des patients</span>, 
              principalement les enfants, adolescents et adultes de moins de 40 ans.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border-2 border-orange-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              Signes cliniques (apparition brutale)
            </h4>
            <p className="text-sm text-orange-700 mb-4 font-medium">Les signes apparaissent lorsque 80% des cellules sont détruites</p>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { icon: '💧', text: 'Polyurie', desc: 'Urines fréquentes' },
                { icon: '🥤', text: 'Polydipsie', desc: 'Soif excessive' },
                { icon: '⚖️', text: 'Perte de poids', desc: 'Non intentionnelle' },
                { icon: '🍽️', text: 'Polyphagie', desc: 'Faim fréquente' },
                { icon: '😴', text: 'Asthénie', desc: 'Fatigue intense' },
                { icon: '👁️', text: 'Troubles visuels', desc: 'Vision floue' },
                { icon: '👃', text: 'Haleine cétonique', desc: 'Odeur fruitée' },
                { icon: '🔬', text: 'Acidose', desc: 'pH sanguin < 7.3' },
              ].map((sign, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                  <span className="text-2xl">{sign.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-900">{sign.text}</p>
                    <p className="text-sm text-gray-600">{sign.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h4 className="text-lg font-semibold text-blue-900 mb-4">Traitement</h4>
            <div className="space-y-3">
              {[
                { icon: '💉', text: 'Insulinothérapie à vie', highlight: true },
                { icon: '📊', text: 'Surveillance glycémique plusieurs fois par jour' },
                { icon: '🔬', text: 'Surveillance de l\'HbA1c (< 7%)' },
                { icon: '🥗', text: 'Régime alimentaire adapté' },
                { icon: '🏃', text: 'Activité sportive régulière' },
              ].map((item, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-3 p-3 rounded-lg ${item.highlight ? 'bg-blue-100 border-2 border-blue-400' : 'bg-white'}`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <p className={`${item.highlight ? 'font-bold text-blue-900' : 'text-gray-700'}`}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'type2',
      title: 'Diabète de Type 2',
      icon: <Users className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-xl border border-teal-200">
            <h4 className="text-lg font-semibold text-teal-900 mb-3">Définition</h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              Maladie d'<span className="font-semibold text-teal-700">évolution lente</span>, caractérisée par une 
              <span className="font-semibold"> insulinorésistance</span> des cellules entraînant une hyperglycémie chronique.
            </p>
          </div>

          <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
            <h4 className="text-lg font-semibold text-amber-900 mb-4">Facteurs de risque</h4>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { icon: '🧬', text: 'Prédisposition génétique' },
                { icon: '🍔', text: 'Mauvaise alimentation' },
                { icon: '⚖️', text: 'Surpoids / Obésité' },
                { icon: '🛋️', text: 'Sédentarité' },
                { icon: '🚬', text: 'Mauvaise hygiène de vie' },
                { icon: '👶', text: 'Antécédent de diabète gestationnel' },
              ].map((factor, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <span className="text-2xl">{factor.icon}</span>
                  <p className="text-gray-700">{factor.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-red-50 p-6 rounded-xl border-2 border-red-200">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-lg font-semibold text-red-900 mb-2">Signes cliniques</h4>
                <p className="text-red-700 font-medium">Découverte souvent fortuite ou lors d'une complication (IDM, AVC...)</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="bg-white p-3 rounded-lg">
                <p className="text-gray-700">• Hyperglycémie</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-gray-700">• Complications diverses possibles</p>
              </div>
            </div>
          </div>

          <div className="bg-teal-50 p-6 rounded-xl border border-teal-200">
            <h4 className="text-lg font-semibold text-teal-900 mb-4">Traitement</h4>
            <div className="space-y-3">
              {[
                { icon: '🥗', text: 'Régime alimentaire adapté', priority: 'high' },
                { icon: '🏃', text: 'Activité sportive régulière', priority: 'high' },
                { icon: '💊', text: 'Antidiabétiques oraux' },
                { icon: '💉', text: 'Insulinothérapie si nécessaire' },
                { icon: '📊', text: 'Surveillance glycémique régulière' },
                { icon: '🔬', text: 'Surveillance de l\'HbA1c' },
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    item.priority === 'high' ? 'bg-teal-100 border-2 border-teal-400' : 'bg-white'
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <p className={`${item.priority === 'high' ? 'font-bold text-teal-900' : 'text-gray-700'}`}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'complications',
      title: 'Complications du Diabète',
      icon: <AlertTriangle className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="bg-red-50 p-6 rounded-xl border-2 border-red-300">
            <h4 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              Complications Aiguës
            </h4>
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-lg border-l-4 border-blue-400">
                <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">🔽</span>
                  Hypoglycémie (Glycémie trop basse)
                </h5>
                <div className="pl-10">
                  <p className="text-sm text-gray-600 mb-2">Signes :</p>
                  <div className="flex flex-wrap gap-2">
                    {['Sueurs', 'Pâleur', 'Tremblements', 'Fringale', 'Malaise', 'Vision floue', 'Somnolence', 'Coma'].map((sign, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{sign}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border-l-4 border-orange-400">
                <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">🔼</span>
                  Hyperglycémie (Glycémie trop haute)
                </h5>
                <div className="pl-10">
                  <p className="text-sm text-gray-600 mb-2">Signes :</p>
                  <div className="flex flex-wrap gap-2">
                    {['Asthénie', 'Bouche sèche', 'Polyurie', 'Soif intense'].map((sign, i) => (
                      <span key={i} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">{sign}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
            <h4 className="text-lg font-semibold text-purple-900 mb-4">Complications Chroniques</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { icon: '👁️', title: 'Rétinopathie diabétique', desc: 'Peut causer la cécité', color: 'red' },
                { icon: '🫘', title: 'Néphropathie diabétique', desc: 'Insuffisance rénale', color: 'orange' },
                { icon: '🦠', title: 'Infections urinaires', desc: 'Plus fréquentes', color: 'yellow' },
                { icon: '⚡', title: 'Neuropathies', desc: 'Atteinte des nerfs', color: 'blue' },
                { icon: '❤️', title: 'Macro-angiopathies', desc: 'Problèmes cardiovasculaires', color: 'red' },
                { icon: '🦶', title: 'Pied diabétique', desc: 'Mal perforant plantaire', color: 'purple' },
              ].map((comp, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border-l-4 border-purple-400">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{comp.icon}</span>
                    <div>
                      <h5 className="font-semibold text-gray-900">{comp.title}</h5>
                      <p className="text-sm text-gray-600 mt-1">{comp.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 p-5 rounded-xl border-2 border-yellow-400">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-700 flex-shrink-0 mt-1" />
              <div>
                <h5 className="font-bold text-yellow-900 mb-2">Important</h5>
                <p className="text-yellow-800">
                  Un suivi médical régulier et un bon contrôle de la glycémie permettent de prévenir ou retarder 
                  l'apparition de ces complications.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'hygiene',
      title: 'Règles Hygiéno-Diététiques',
      icon: <Heart className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
            <h4 className="text-lg font-semibold text-green-900 mb-4">Adoptez un mode de vie sain</h4>
            <p className="text-gray-700">
              Ces règles sont essentielles pour prévenir et contrôler le diabète. Elles constituent 
              la base du traitement, parfois suffisantes pour le diabète de type 2.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-xl border-2 border-green-300 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🥗</span>
                </div>
                <h5 className="font-bold text-gray-900 text-lg">Alimentation équilibrée</h5>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Tous les groupes d'aliments représentés</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Limiter les sucres rapides</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Privilégier les fibres</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Manger à heures régulières</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-blue-300 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🏃</span>
                </div>
                <h5 className="font-bold text-gray-900 text-lg">Activité physique</h5>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>30 min d'activité modérée par jour</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Marche, vélo, natation...</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Aide à contrôler la glycémie</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Améliore la sensibilité à l'insuline</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-red-300 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🚭</span>
                </div>
                <h5 className="font-bold text-gray-900 text-lg">Arrêt du tabac</h5>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✓</span>
                  <span>Réduit les risques cardiovasculaires</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✓</span>
                  <span>Améliore la circulation sanguine</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✓</span>
                  <span>Diminue le risque de complications</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-purple-300 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⚖️</span>
                </div>
                <h5 className="font-bold text-gray-900 text-lg">Contrôle du poids</h5>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">✓</span>
                  <span>Maintenir un poids santé</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">✓</span>
                  <span>Éviter la prise de poids excessive</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">✓</span>
                  <span>Améliore le contrôle glycémique</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-300">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🩹</span>
              </div>
              <div>
                <h5 className="font-bold text-gray-900 text-lg mb-2">Surveillance des plaies</h5>
                <p className="text-gray-700">
                  Examinez quotidiennement vos pieds et surveillez toute plaie, même minime. 
                  Le diabète ralentit la cicatrisation et augmente le risque d'infection.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'gestationnel',
      title: 'Diabète Gestationnel',
      icon: <Baby className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-xl border border-pink-200">
            <h4 className="text-lg font-semibold text-pink-900 mb-3">Définition (OMS)</h4>
            <p className="text-gray-700 leading-relaxed mb-3">
              Trouble de la tolérance glucidique conduisant à une hyperglycémie de sévérité variable, 
              <span className="font-semibold text-pink-700"> débutant ou diagnostiqué pour la première fois pendant la grossesse</span>.
            </p>
            <div className="bg-white p-4 rounded-lg border-l-4 border-pink-400">
              <p className="text-pink-800 font-medium">
                ✓ Dans 90% des cas, le diabète gestationnel disparaît quelques semaines après l'accouchement
              </p>
            </div>
          </div>

          <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
            <h4 className="text-lg font-semibold text-amber-900 mb-4">Facteurs de risque</h4>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { icon: '📅', text: 'Grossesse tardive (> 35 ans)' },
                { icon: '⚖️', text: 'Obésité ou surpoids de la mère' },
                { icon: '🔁', text: 'Antécédent de diabète gestationnel' },
                { icon: '👨‍👩‍👧', text: 'Antécédents familiaux de diabète type 2' },
                { icon: '👶', text: 'Antécédent de macrosomie fœtale' },
              ].map((factor, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-amber-200">
                  <span className="text-2xl">{factor.icon}</span>
                  <p className="text-gray-700 text-sm">{factor.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-300">
              <h4 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                <Baby className="w-5 h-5" />
                Complications pour l'enfant
              </h4>
              <div className="space-y-3">
                {[
                  { icon: '👶', text: 'Macrosomie (poids > 4kg)', severity: 'high' },
                  { icon: '🚑', text: 'Accouchement difficile' },
                  { icon: '😮‍💨', text: 'Détresse respiratoire' },
                  { icon: '🔽', text: 'Hypoglycémie néonatale' },
                  { icon: '⏰', text: 'Risque de diabète type 2 adulte' },
                ].map((comp, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      comp.severity === 'high' ? 'bg-blue-200 border-2 border-blue-400' : 'bg-white'
                    }`}
                  >
                    <span className="text-xl">{comp.icon}</span>
                    <p className={`text-sm ${comp.severity === 'high' ? 'font-bold text-blue-900' : 'text-gray-700'}`}>
                      {comp.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-pink-50 p-6 rounded-xl border-2 border-pink-300">
              <h4 className="text-lg font-semibold text-pink-900 mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Complications pour la mère
              </h4>
              <div className="space-y-3">
                {[
                  { icon: '💔', text: 'Fausses couches' },
                  { icon: '🏥', text: 'Accouchement par césarienne' },
                  { icon: '📈', text: 'Risque de prééclampsie (HTA, œdème)' },
                  { icon: '⏰', text: 'Risque de diabète type 2 après grossesse', severity: 'high' },
                  { icon: '⏱️', text: 'Risque d\'accouchement prématuré' },
                ].map((comp, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      comp.severity === 'high' ? 'bg-pink-200 border-2 border-pink-400' : 'bg-white'
                    }`}
                  >
                    <span className="text-xl">{comp.icon}</span>
                    <p className={`text-sm ${comp.severity === 'high' ? 'font-bold text-pink-900' : 'text-gray-700'}`}>
                      {comp.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
            <h4 className="text-lg font-semibold text-purple-900 mb-4">Dépistage</h4>
            <div className="bg-white p-5 rounded-lg border-l-4 border-purple-400">
              <h5 className="font-bold text-gray-900 mb-2">Test HGPO (Hyperglycémie Provoquée par voie Orale)</h5>
              <p className="text-gray-700 mb-3">Test avec 75g de glucose, généralement réalisé entre la 24ème et 28ème semaine de grossesse</p>
              <div className="flex items-center gap-2 text-sm text-purple-700">
                <FileText className="w-4 h-4" />
                <span>Test de référence pour diagnostiquer le diabète gestationnel</span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <h4 className="text-lg font-semibold text-green-900 mb-4">Prévention & Traitement</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <span className="text-xl">🛡️</span>
                  Prévention
                </h5>
                <div className="space-y-2">
                  {[
                    'Alimentation équilibrée dès le début',
                    'Activité physique régulière',
                    'Limiter les apports glycémiques',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <span className="text-xl">💊</span>
                  Traitement
                </h5>
                <div className="space-y-2">
                  {[
                    'Régime diététique hypocalorique',
                    'Limitation des apports glycémiques',
                    'Insulinothérapie si régime inefficace',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'surveillance',
      title: 'Rôle Infirmier & Surveillance',
      icon: <FileText className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-200">
            <h4 className="text-lg font-semibold text-indigo-900 mb-3">Rôle de l'Infirmier(ère) Diplômé(e) d'État</h4>
            <p className="text-gray-700">
              L'IDE joue un rôle essentiel dans la prise en charge et l'éducation thérapeutique des patients diabétiques.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-xl border-2 border-blue-300 hover:shadow-lg transition-shadow">
              <h5 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🩺</span>
                Soins techniques
              </h5>
              <div className="space-y-3">
                {[
                  'Réalisation des glycémies capillaires',
                  'Préparation et injection d\'insuline',
                  'Adaptation des doses d\'insuline',
                  'Réalisation de bandelettes urinaires',
                  'Surveillance de la cétonurie',
                ].map((task, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-blue-600 mt-0.5">→</span>
                    <span className="text-gray-700">{task}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-green-300 hover:shadow-lg transition-shadow">
              <h5 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">📚</span>
                Éducation thérapeutique
              </h5>
              <div className="space-y-3">
                {[
                  'Apprentissage des glycémies capillaires',
                  'Technique d\'injection d\'insuline',
                  'Adaptation des doses',
                  'Reconnaissance hypo/hyperglycémie',
                  'Conseils sur le régime alimentaire',
                  'Utilisation du carnet d\'autosurveillance',
                ].map((task, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-green-600 mt-0.5">→</span>
                    <span className="text-gray-700">{task}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-300">
            <h5 className="font-bold text-orange-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Surveillance des complications
            </h5>
            <div className="grid md:grid-cols-3 gap-3">
              {[
                { icon: '👁️', text: 'Vision' },
                { icon: '🫘', text: 'Fonction rénale' },
                { icon: '🦶', text: 'État des pieds' },
                { icon: '❤️', text: 'Cardiovasculaire' },
                { icon: '⚡', text: 'Sensibilité nerveuse' },
                { icon: '🩹', text: 'Plaies' },
              ].map((item, i) => (
                <div key={i} className="bg-white p-3 rounded-lg flex items-center gap-2">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-sm text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-200">
            <h5 className="font-bold text-indigo-900 mb-4">Carnet d'autosurveillance</h5>
            <div className="bg-white p-5 rounded-lg">
              <p className="text-gray-700 mb-3">
                Le carnet d'autosurveillance est un outil essentiel pour suivre l'évolution du diabète. Il doit contenir :
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  'Date et heure des mesures',
                  'Valeurs de glycémie',
                  'Doses d\'insuline administrées',
                  'Repas et activités',
                  'Événements particuliers',
                  'Symptômes ressentis',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-indigo-600">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-6 rounded-xl border-2 border-indigo-300">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-indigo-200 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-indigo-700" />
              </div>
              <div>
                <h5 className="font-bold text-indigo-900 mb-2">L'importance du suivi</h5>
                <p className="text-indigo-800">
                  Un suivi régulier et une bonne observance du traitement permettent de vivre normalement avec le diabète 
                  et de prévenir les complications. N'hésitez pas à poser des questions à votre équipe soignante.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-purple-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center">
              <Book className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Éducation sur le Diabète
              </h1>
              <p className="text-gray-600 mt-1">
                Informations complètes pour mieux comprendre et gérer votre diabète
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200 mt-6">
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-indigo-700">💡 Guide pratique :</span> Cliquez sur chaque section pour découvrir 
              des informations détaillées sur le diabète, ses types, ses complications et les bonnes pratiques de gestion.
            </p>
          </div>
        </div>

        {/* Sections accordéon */}
        <div className="space-y-4">
          {sections.map((section) => (
            <div
              key={section.id}
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    expandedSection === section.id
                      ? 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {section.icon}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                </div>
                <div className={`transform transition-transform ${expandedSection === section.id ? 'rotate-180' : ''}`}>
                  {expandedSection === section.id ? (
                    <ChevronUp className="w-6 h-6 text-purple-600" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  )}
                </div>
              </button>

              {expandedSection === section.id && (
                <div className="p-6 pt-0 animate-fadeIn">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-8 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-6 border-2 border-purple-300">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-purple-700 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-purple-900 mb-2">Note importante</h3>
              <p className="text-purple-800 text-sm leading-relaxed">
                Ces informations sont fournies à titre éducatif et ne remplacent pas une consultation médicale. 
                Consultez toujours votre médecin ou votre équipe soignante pour un suivi personnalisé de votre diabète. 
                En cas d'urgence ou de symptômes graves, contactez immédiatement les services d'urgence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
