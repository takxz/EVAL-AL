# Monolithe modulaire
## pourquoi
    - plus simple a mettre en place qu'un micro service tout en répondant correctement au besoin de séparation des responsabilités et le besoin de fonctionnement indépendant 

## Séparation des responsabilité
- Nous avons pu identifier 5 services
    - Equipes
    - Match
    - Ranking
    - Notification
    - DB
- Si match à besoin de mettre a jour ranking, ranking récupérera les données du match et fera le traitement
