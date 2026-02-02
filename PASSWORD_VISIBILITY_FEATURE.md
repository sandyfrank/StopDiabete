# Fonctionnalité : Affichage/Masquage du Mot de Passe

## Résumé
Ajout d'une icône œil (👁) pour permettre aux utilisateurs d'afficher/masquer leur mot de passe lors de la connexion et de l'inscription.

## Fichiers Modifiés

### 1. `/frontend/src/pages/Auth/Login.tsx`
**Changements :**
- Ajout de l'import `{ Eye, EyeOff }` depuis `lucide-react`
- Ajout d'un état `showPassword` (useState<boolean>)
- Ajout d'un bouton toggle avec les icônes Eye/EyeOff
- Le type de l'input passe de `"password"` à `showPassword ? "text" : "password"`

**Code ajouté :**
```tsx
const [showPassword, setShowPassword] = useState(false)

<div className="relative">
  <Input
    type={showPassword ? "text" : "password"}
    // ... autres props
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-4 top-[38px] text-gray-400 hover:text-gray-600 transition-colors"
    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
  >
    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
  </button>
</div>
```

### 2. `/frontend/src/pages/Auth/Register.tsx`
**Changements :**
- Ajout de l'import `{ Eye, EyeOff }` depuis `lucide-react`
- Ajout de deux états : `showPassword` et `showConfirmPassword`
- Ajout de boutons toggle pour les deux champs de mot de passe
- Les types des inputs passent de `"password"` à dynamique selon l'état

**Code ajouté :**
```tsx
const [showPassword, setShowPassword] = useState(false)
const [showConfirmPassword, setShowConfirmPassword] = useState(false)

// Pour le champ "Mot de passe"
<div className="relative">
  <Input
    type={showPassword ? "text" : "password"}
    // ... autres props
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-4 top-[38px] text-gray-400 hover:text-gray-600 transition-colors"
    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
  >
    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
  </button>
</div>

// Pour le champ "Confirmer le mot de passe" (même structure avec showConfirmPassword)
```

## Dépendances
- **lucide-react** : v0.563.0 (déjà installé dans package.json)
  - Fournit les icônes `Eye` et `EyeOff`

## Fonctionnement

1. **État initial** : Les mots de passe sont masqués (type="password")
2. **Clic sur l'icône œil** : 
   - `showPassword` passe de `false` à `true`
   - L'input change de `type="password"` à `type="text"`
   - L'icône Eye (œil ouvert) devient EyeOff (œil barré)
3. **Nouveau clic** : Retour à l'état masqué

## Accessibilité
- **aria-label** : Décrit l'action du bouton pour les lecteurs d'écran
  - "Afficher le mot de passe" quand masqué
  - "Masquer le mot de passe" quand visible
- **type="button"** : Empêche la soumission du formulaire au clic

## Style
- Position : `absolute right-4 top-[38px]`
  - Aligné à droite du champ de saisie
  - 38px du haut pour centrer verticalement avec le label
- Couleur : `text-gray-400` par défaut, `hover:text-gray-600` au survol
- Transition : `transition-colors` pour un effet fluide

## Comportement Mobile
- Fonctionne sur mobile sans changement
- L'icône est tactile et facilement cliquable
- Utile pour éviter les erreurs de saisie sur clavier tactile

## Test
1. Ouvrir la page de connexion : `http://10.162.144.137:3000/login`
2. Entrer un mot de passe
3. Cliquer sur l'icône œil → le mot de passe devient visible
4. Cliquer à nouveau → le mot de passe est masqué

## Notes Techniques
- Les erreurs TypeScript "Cannot find module 'lucide-react'" devraient disparaître après le redémarrage du serveur frontend
- Le package `lucide-react` était déjà présent dans `node_modules/`
- Aucune dépendance supplémentaire n'a été installée
