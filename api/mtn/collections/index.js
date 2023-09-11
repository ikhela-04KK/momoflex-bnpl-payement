import axios from "axios";


// ! CETTE PARTIR ..............................................................
import { Base64 } from 'js-base64';
// Fonction pour obtenir un UUID à partir d'une source externe
async function get_uuid() {
    try {
        const response = await axios.get('https://www.uuidgenerator.net/api/version4');
        return response.data;
    } catch (error) {
        console.error("get_uuid", error.response.data);
        
    }
}

// Fonction pour créer un utilisateur avec l'UUID
async function create_user(uuid) {
    try {
        const data = { "providerCallbackHost": "https://webhook.site/e1f1f8f5-3cd9-4044-8176-05de70fca303" };
        const config = {
            method: 'post',
            url: 'https://sandbox.momodeveloper.mtn.com/v1_0/apiuser',
            headers: {
                'X-Reference-Id': uuid,
                'Ocp-Apim-Subscription-Key': '440dea399815474e81b2ae50907d832b',
                'Content-Type': 'application/json'
            },
            data: data
        };
        const response = await axios.request(config);
        console.log("create_user", response.data);
        return response.data;
    } catch (error) {
        console.error("create_user", error.response.data);
        
    }
}

// Fonction pour obtenir les détails de l'utilisateur
async function get_user_api(uuid) {
    try {
        const config = {
            method: 'get',
            url: `https://sandbox.momodeveloper.mtn.com/v1_0/apiuser/${uuid}`,
            headers: {
                'Ocp-Apim-Subscription-Key': '440dea399815474e81b2ae50907d832b'
            }
        };
        const response = await axios.request(config);
        console.log("get_user_api", response.data);
        return response.data;
    } catch (error) {
        console.error("get_user_api", error.response.data);
    }
}

// Fonction pour générer une API key pour l'utilisateur
async function gen_user_api(uuid) {
    try {
        const config = {
            method: 'post',
            url: `https://sandbox.momodeveloper.mtn.com/v1_0/apiuser/${uuid}/apikey`,
            headers: {
                'Ocp-Apim-Subscription-Key': '440dea399815474e81b2ae50907d832b'
            }
        };
        const response = await axios.request(config);
        console.log("gen_user_api", response.data);
        return response.data;
    } catch (error) {
        console.error("gen_user_api", error.response.data);
    }
}

// Fonction pour obtenir un token d'authentification avec Basic Auth
async function user_token(username, api_key) {
    try {
        const user_pass = `${username}:${api_key}`
        const token = Base64.encode(user_pass);
        // const token = Buffer.from(, 'utf-8').toString('base64');
        console.log("token", token);
        const config = {
            method: 'post',
            url: 'https://sandbox.momodeveloper.mtn.com/collection/token/',
            headers: {
                'Ocp-Apim-Subscription-Key': '440dea399815474e81b2ae50907d832b',
                // 'Authorization': `Basic ${token}`
                'Authorization': `Basic ${token}`
            }
        };
        console.log(config.headers['Authorization']);

        const response = await axios.request(config);
        console.log("user_token1", response.data);
        return response.data;
    } catch (error) {
        console.error("user_token2", error.response.data);
    }
}

// !........................................................................


// fonctionnalité requestToPay 
async function requestToPay(uuid,token) {
    try {
        const data = JSON.stringify({
            "amount": "1000000",
            "currency": "EUR",
            "externalId": "20231207",
            "payer": {
                "partyIdType": "MSISDN",
                "partyId": "0566062472"
            },
            "payerMessage": "sucess payement",
            "payeeNote": "receive payement"
        });
        
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay',
            headers: { 
                'Ocp-Apim-Subscription-Key': '440dea399815474e81b2ae50907d832b', 
                'X-Reference-Id': uuid, 
                'X-Target-Environment': 'sandbox', 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            },
            data : data
        };
        const response = await axios.request(config);
        console.log("SUCCESS PAYEMENT ");
        return response.data;
        // console.log(JSON.stringify(response.data));
    }
    catch (error) {
        console.log(error);
    }
}

// fonctionnalité requesToPay statuts pour avoir si ton payement à été bien effectué

async function requestToPayStatus (uuid, token){
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay/${uuid}`,
            headers: { 
                'X-Target-Environment': 'sandbox', 
                'Ocp-Apim-Subscription-Key': '440dea399815474e81b2ae50907d832b', 
                'Authorization': `Bearer ${token}`,
            }
        };
        
        const response = await axios.request(config);
        return response.data;
        // console.log(JSON.stringify(response.data));
    }
    catch (error) {
        console.log(error);
    }
}


// Permet d'avoir le montant de la requête  



async function get_avaible_balance(uuid, token) {
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://sandbox.momodeveloper.mtn.com/collection/v1_0/account/balance',
            headers: { 
                'X-Reference-Id': uuid, 
                'X-Target-Environment': 'sandbox', 
                'Ocp-Apim-Subscription-Key': '440dea399815474e81b2ae50907d832b', 
                'Authorization': `Bearer ${token}`
            }
        };
        const response = await axios.request(config);
        console.log(response.data);     
        return response.data;
        // console.log(JSON.stringify(response.data));
    }
    catch (error) {
        console.log(error);
    }
}


// Fonction principale pour coordonner les étapes
async function main() {
    try {
        const uuid = await get_uuid();
        console.log("user_uuid", uuid);
        const apiKeyResponse = await create_user(uuid);
        await get_user_api(apiKeyResponse.apiKey);
        const true_api_key = await gen_user_api(uuid);
        const tokenResponse = await user_token(uuid, true_api_key.apiKey);
        await requestToPay(uuid,tokenResponse.access_token);
        const rqS = await requestToPayStatus(uuid,tokenResponse.access_token);


        console.log("reqS", rqS);
        console.log("rqS", rqS.status);      

        await get_avaible_balance(uuid, tokenResponse.access_token);
    } catch (error) {
        console.log(error);
    }
}
main();
