# Documentation du Projet : Lodestone - La Charge Sans Fil, Réinventée

Ce document présente l'analyse des cas d'utilisation et l'architecture des pages (sections) du site **Lodestone**.

---

## 1. Aperçu du Projet
**Lodestone** est une plateforme de présentation et de vente d'un chargeur sans fil premium de type MagSafe. Le site est conçu comme une **Landing Page (SPA)** haut de gamme, utilisant des animations modernes pour refléter l'aspect technologique et luxueux du produit.

---

## 2. Personas Utilisateurs
1. **L'Adepte de Tech (Tech Enthusiast)** : Recherche les spécifications techniques (15W, contrôle thermique) et l'innovation.
2. **Le Professionnel de Bureau (Desk Setup Pro)** : Attiré par l'esthétique "Minimaliste/Aluminium" et l'organisation du bureau.
3. **L'Acheteur de Cadeau** : Recherche la réassurance (garantie 2 ans, livraison gratuite, avis clients).

---

## 3. Cas d'Utilisation (Use Cases)

### CU01 : Découverte du produit
- **Acteur** : Visiteur
- **Objectif** : Comprendre ce qu'est Lodestone et ses points forts.
- **Flux** :
    1. Arrivée sur la section **Hero**.
    2. Lecture du badge "Édition 2026" et du titre principal.
    3. Visualisation de l'image 3D/Parallaxe du produit.

### CU02 : Analyse Technique
- **Acteur** : Adepte de Tech
- **Objectif** : Vérifier la compatibilité et la puissance.
- **Flux** :
    1. Navigation vers la section **Fonctionnalités (Features)**.
    2. Consultation du tableau des **Spécifications (Specs)** pour la puissance de 15W.
    3. Lecture de la section **Ingénierie** pour comprendre la qualité de fabrication.

### CU03 : Achat / Conversion
- **Acteur** : Client potentiel
- **Objectif** : Commander le chargeur.
- **Flux** :
    1. Clic sur le bouton "PRÉ-COMMANDER" dans le **Hero** ou le **CTA**.
    2. Redirection vers la section de commande (Order/CTA section).
    3. Finalisation via l'interface de paiement intégrée (non détaillée dans cette SPA mais cible du CTA).

### CU04 : Réassurance et Support
- **Acteur** : Client hésitant
- **Objectif** : Vérifier la fiabilité du vendeur.
- **Flux** :
    1. Consultation des **Témoignages (Testimonials)**.
    2. Lecture de la **FAQ** (Livraison, retours).
    3. Vérification des stats dans le **StatsBanner**.

---

## 4. Architecture des "Pages" (Sections SPA)

Comme le site est une application à page unique (Single Page Application), les "pages" correspondent aux sections suivantes :

| Identifiant | Section | Description |
| :--- | :--- | :--- |
| **01** | **Hero** | Accroche visuelle, titre "Lodestone", et premier bouton d'achat. |
| **02** | **StatsBanner** | Validation sociale et marketing (Chiffres clés). |
| **03** | **Gallery** | Vitrine visuelle montrant le produit sous différents angles. |
| **04** | **Features** | Grille des 4 innovations majeures (MagSafe, 15W, LED, Design). |
| **05** | **How It Works** | Guide étape par étape sur l'utilisation du chargeur. |
| **06** | **Engineering** | Focus sur les matériaux (Aluminium) et la conception. |
| **07** | **BrandMantra** | Section de branding émotionnel avec texte d'accroche interactif. |
| **08** | **Specs** | Tableau technique complet (Dimensions, Puissance, Entrée). |
| **09** | **Testimonials** | Retours d'expérience et avis clients. |
| **10** | **Packaging** | Présentation de l'expérience de déballage (Unboxing). |
| **11** | **CTA (Call To Action)** | Section finale de conversion pour la commande. |
| **12** | **FAQ** | Réponses aux questions courantes (Livraison, Garantie). |
| **13** | **Newsletter** | Formulaire de capture d'emails pour le marketing. |
| **14** | **Footer** | Liens légaux et réseaux sociaux. |

---

## 5. Flux de Conversion Principal
1. **Entrée** : Section Hero (Awareness).
2. **Exploration** : Features / Engineering (Interest).
3. **Preuve** : Testimonials / FAQ (Trust).
4. **Action** : CTA / Pre-Order (Purchase).
