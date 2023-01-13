# PROJET 2 - CHAT (PWA)

## Description

Ce projet consiste à concevoir un chat en ligne. Chaque utilisateur peut créer un compte et se connecter à son compte. Une fois connecté, l'utilisateur peut chatter avec les autres utilisateurs connectés. Il peut aussi créer des salons de discussion qui seront accessibles à tous les utilisateurs connectés.
L'utilisateur peut aussi modifier son profil.

Les utilisateurs, les messages, et les salons sont stockés dans une base de données.

## Fonctionnalités

* Création d'un compte
* Connexion à un compte
* Modification du profil
* Création d'un salon de discussion
* Envoi de messages dans un salon de discussion
* Envoi de gif dans un salon de discussion et d'émojis
* Informations sur les utilisateurs connectés / déconnectés dans un salon de discussion

## Technologies

**Client**

Vue 3, Typescript, Pinia, Vite, Sass, Socket.io-client, unplugin, unocss, Vite PWA.

Pinia pour la gestion du state.

Unplugin pour éviter d'avoir à importer les fichiers manuellement.

Unocss utiliser pour générer des icônes à partir de classes css (via unocss-icons et iconify).

Socket.io-client pour la communication avec le serveur via websockets en temps réel.

Vite PWA pour la génération du manifest et du service worker --> generation d'une application web progressive.

**Serveur**

Node.js, Express, Socket.io, Typescript, Sequelize, Pg, Bcrypt, Jsonwebtoken, Dotenv, Cors et class-validator.

+ Docker pour la base de données.

Socket.io pour la communication avec le client via websockets en temps réel.

Sequelize pour la gestion de la base de données en Postgres (via pg).

Bcrypt pour le hashage des mots de passe.

Jsonwebtoken pour la gestion des tokens d'authentification.

Dotenv pour la gestion des variables d'environnement.

Cors pour la gestion des requêtes cross-origin.

Class-validator pour la validation des données envoyées par le client.


## Installation

Avant toute chose, il faut lancer la base de données. Pour cela, il faut se placer dans le dossier `server` et lancer la commande `docker-compose up -d`.

Ensuite, il faut installer les dépendances du client et du serveur. Pour cela, il faut se placer dans le dossier `client` et lancer la commande `npm install`. Puis se placer dans le dossier `server` et lancer la commande `npm install`.

Avant derniere-etape, il faut créer un fichier `.env` dans le dossier `server` et y ajouter les variables d'environnement suivantes :

```
JWT_SECRET=
```

Un exemple est disponible dans le fichier `.env.example`.

Enfin, il faut lancer le serveur et le client. Pour cela, il faut se placer dans le dossier `server` et lancer la commande `npm run dev`. Puis se placer dans le dossier `client` et lancer la commande `npm run dev`.

Si vous avez pnpm d'installé, vous pouvez utiliser la commande `pnpm run -r dev` à la place de `npm run dev` directement dans le dossier racine du projet, cela lancera le serveur et le client en même temps.
**Cela explique la présence du fichier package.json à la racine du projet.**

## PWA

Pour vérifier que la PWA est bien installée, il suffit d'ouvrir la console et d'y voir les différents logs issue du service worker.
De plus, dans l'onglet Application du navigateur, le manifest et le service worker sont bien présents.




