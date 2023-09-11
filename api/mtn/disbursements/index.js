import axios from "axios";

// ! CETTE PARTIE ..............................................................................................................................
import 'dotenv/config';
import dotenv from "dotenv";
import { Base64 } from "js-base64";

dotenv.config({path: '../../../CONFIG/ENV/.env'});

// my key api for service disburments service MTN MoMo
const DIS_API_KEY = process.env.DIS_API_KEY

// automatically deposit funds to multiple users 
// Fonction pour obtenir un UUID à partir d'une source externe
async function get_uuid() {
    try {
        const response = await axios.get('https://www.uuidgenerator.net/api/version4');
        return response.data;
    } catch (error) {
        console.error("get_uuid", error.response.data);
        
    }
}

// create api user with uuid
async function create_user_dis(uuid) {
    try {
        
    const data = JSON.stringify({
        "providerCallbackHost": "https://webhook.site/e1f1f8f5-3cd9-4044-8176-05de70fca303"
    });
    
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://sandbox.momodeveloper.mtn.com/v1_0/apiuser',
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

// save user to make your api 
async function get_user_api_dis(uuid) {
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://sandbox.momodeveloper.mtn.com/v1_0/apiuser/${uuid}`,
            headers: { 
                'Ocp-Apim-Subscription-Key': DIS_API_KEY
            }
        };
        
        const response = await axios.request(config);
        console.log("1 " + JSON.stringify(response.data));
        // return response.data
    }
    catch (error) {
        console.log('get_user_api_dis ' + error.response.data);
    }
}


// generate api key for user 
async function gen_user_api_dis(uuid) {
    try {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://sandbox.momodeveloper.mtn.com/v1_0/apiuser/${uuid}/apikey`,
            headers: { 
                'Ocp-Apim-Subscription-Key': DIS_API_KEY,
            }
        };
        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
        return response.data;
    }
    catch (error) {
        console.log('gen_user_api_dis '+ error.response.data);
    }
}

// !..................................................................................................................................................


//** */ generate bear token for user :   c'est à partir de là que le code commence à changer 
async function user_token(username, api_key){
    try {
        const user_pass = `${username}:${api_key}`;
        const token = Base64.encode(user_pass);
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://sandbox.momodeveloper.mtn.com/disbursement/token/',
            headers: { 
                'Ocp-Apim-Subscription-Key': DIS_API_KEY, 
                'Authorization': `Basic ${token}`
            }
        };
        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
        return response.data;
    }
    catch (error) {
        console.log('bear token' + error);
    }
}

//  effectuer un dépot 
async function doDepot(uuid,token) {
    try {
        const data = JSON.stringify({
            "amount": "100840",
            "currency": "EUR",
            "externalId": "050354789",
            "payee": {
                "partyIdType": "MSISDN",
                "partyId": "057845237"
            },
            "payerMessage": "succeful payement",
            "payeeNote": "receive payement"
        });
        
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://sandbox.momodeveloper.mtn.com/disbursement/v1_0/deposit',
            headers: { 
                'X-Reference-Id': uuid, 
                'X-Target-Environment': 'sandbox', 
                'Ocp-Apim-Subscription-Key': DIS_API_KEY, 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`,
            },
            data : data
        };        
        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
        return response.data;  // must be return success or failed 
    }
    catch (error) {
        console.log('faire depot ' + error.response.data);
    }
}

// voir le status du depot qui a été effectuer 
async function statutDepot(uuid,token) {
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://sandbox.momodeveloper.mtn.com/disbursement/v1_0/deposit/${uuid}`,
            headers: { 
                'X-Target-Environment': 'sandbox', 
                'Ocp-Apim-Subscription-Key': DIS_API_KEY, 
                'Authorization': `Bearer ${token}`
            }
        };
        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

// voir les infos d'un utilisateur 
async function get_user_infos(token) {
    const msisdn = 57845237;
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://sandbox.momodeveloper.mtn.com/disbursement/v1_0/accountholder/msisdn/0${msisdn}/basicuserinfo`,
            headers: { 
                'X-Target-Environment': 'sandbox', 
                'Ocp-Apim-Subscription-Key': DIS_API_KEY, 
                'Authorization': `Bearer ${token}`
            }
        };
        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
        return response.data; 
    }
    catch (error) {
        console.log('get_user_info ' + error.response.data);
    }
}


async function main(){
    try{
        const uuid = await get_uuid();
        console.log("user_uuid", uuid);
        const apiKeyResponse = await create_user_dis(uuid);
        console.log(apiKeyResponse);
        await get_user_api_dis(uuid);
        const true_api_key = await gen_user_api_dis(uuid);
        const tokenResponse = await user_token(uuid, true_api_key.apiKey);


        await doDepot(uuid,tokenResponse.access_token);
        await statutDepot(uuid,tokenResponse.access_token);
        await get_user_infos(tokenResponse.access_token) 
    }
    catch(error){ 
        console.log(error);
    }
}

main();