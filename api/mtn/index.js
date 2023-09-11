import 'dotenv/config';
import dotenv from "dotenv";
import { Base64 } from "js-base64";

//Apel de mes variables d'environnement logées dans .env 
dotenv.config({path: '../../../CONFIG/ENV/.env'});

// Environnement de test pour L'api MTN 
// *mettre aussi SANDBOX dans les variables d'environnement 
const sandbox = 'https://sandbox.momodeveloper.mtn.com'


// Fonction pour obtenir un UUID à partir d'une source externe vient d'une api
async function get_uuid() {
    try {
        const response = await axios.get('https://www.uuidgenerator.net/api/version4');
        return response.data;
    } catch (error) {
        console.error("get_uuid", error.response.data);
        
    }
}

// create api user with uuid
async function create_user(uuid,) {
    try {
        
    const data = JSON.stringify({
        "providerCallbackHost": "https://webhook.site/e1f1f8f5-3cd9-4044-8176-05de70fca303"
    });
    
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${sandbox}/v1_0/apiuser`,
        headers: { 
            'X-Reference-Id': uuid, 
            'Ocp-Apim-Subscription-Key': DIS_API_KEY, 
            'Content-Type': 'application/json'
        },
        data : data
    };
        const response = await axios.request(config);
        // console.log(JSON.stringify(response.data));
        return response.data;
    }
    catch (error) {
        console.log('create error',error.response.data);
    }
}