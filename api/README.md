# Apropos 

> Sera utilisé pour intérger des API

# Récapitulatif du Code

Ce document résume le code qui effectue plusieurs étapes liées à l'API MTN Developer.

## Étapes Principales

1. **Obtention d'un UUID**
   - La fonction `get_uuid()` récupère un UUID à partir de `https://www.uuidgenerator.net/api/version4`.

2. **Création d'un Utilisateur**
   - La fonction `create_user(uuid)` utilise l'UUID obtenu pour créer un utilisateur sur `https://sandbox.momodeveloper.mtn.com/v1_0/apiuser`.

3. **Obtention des Détails de l'Utilisateur**
   - La fonction `get_user_api(uuid)` récupère les détails de
