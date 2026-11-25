# Contrainte A - La montée en charge

## Monolithe modulaire

Plus simple a mettre en place qu'une architecture de micro-services tout en répondant correctement au besoin de séparation des responsabilités et le besoin de fonctionnement indépendant.
Nous n'avons pas de notion sur le budget disponible ou la taille de l'équipe qui travaillera dessus. On imagine donc un budget restraint et une équipe réduite.

La séparation par module et par domaine métier permet d'isoler complètement un module dans un micro-service à part et d'obtenir une architecture hybride pour le besoin de scalabilité.

### Séparation des responsabilité
- Nous avons pu identifier 5 modules
    - Teams
    - Matches
    - Rankings
    - Notifications


# Contrainte B - La Gestion des notifications

## Rabbitmq

Etant donné que les notifications doivent être non bloquantes pour le reste de l'application, le choix se porte sur du messaging comme rabbitmq pour permettre une asynchronicité de ce traitement.

Lancer docker compose up -d pour créer l'instance RabbitMQ et lancer server.js pour que la queue se crée.


# Contrainte C - L'indépendance technologique

On a mis en place des ports pour isoler le coeur métier et pouvoir modifier la technique comme on le souhaite. On voit par exemple que pour les notifications on passe pas un rabbit mq, mais changer de broker serait très simple. 

## utilisation d'une 