
import express from "express"; 
import path from "path"; 

const app = express(); 
const port = 3000; 


app.use(express.static("public")); 


app.get("/", (req,res) =>{
    res.render("index.ejs");
});

app.listen(port,(req,res) =>{
    console.log("listening on port to 3000 ");
});



/*
{
    une partie du code à génrer pour le code qr
    "invoiceId": "a427024deb60474c",
    "externalId": "144-123-323",
    "referenceId": "4943bb77-7417-4aec-8293-1c99796d4872",
    "paymentReference": "08694e5c",
    "payee": {
      "partyIdType": "PARTY_CODE",
      "partyId": "b12d7b22-3057-4c8e-ad50-63904171d18c"
    },
    "payeeFirstName": "Tillman",
    "payeeLastName": "Inc.",
    "amount": 100,
    "currency": "EUR",
    "status": "SUCCESSFUL", // PENDING, SUCCESSFUL or FAILED
    "expiryDateTime": "2018-06-03T04:15:49.795Z"
  }

*/
// create one uuid for any transaction which request that 
app.get('/fetch-data', async (req, res) => {
  try {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://www.uuidgenerator.net/api/version4',
      headers: {}
    };

    const response = await axios.request(config);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// get user API 
let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://sandbox.momodeveloper.mtn.com/v1_0/apiuser/2384d722-40be-4eef-b034-e29298ccd897',
  headers: { 
    'Ocp-Apim-Subscription-Key': '440dea399815474e81b2ae50907d832b'
  }
};

async function makeRequest() {
  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
  }
  catch (error) {
    console.log(error);
  }
}

makeRequest();

// generate api key 
const axios = require('axios');

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://sandbox.momodeveloper.mtn.com/v1_0/apiuser/2384d722-40be-4eef-b034-e29298ccd897/apikey',
  headers: { 
    'Ocp-Apim-Subscription-Key': '440dea399815474e81b2ae50907d832b'
  }
};

async function makeRequest() {
  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
  }
  catch (error) {
    console.log(error);
  }
}

makeRequest();

// generate-api-token


let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://sandbox.momodeveloper.mtn.com/collection/token/',
  headers: { 
    'Ocp-Apim-Subscription-Key': '440dea399815474e81b2ae50907d832b', 
    'Authorization': 'Basic MjM4NGQ3MjItNDBiZS00ZWVmLWIwMzQtZTI5Mjk4Y2NkODk3OmVkNzhjNjJhM2Y4ZDQ5OWRiMGNmNDg0YjA5NTYyOTVh'
  }
};

async function makeRequest() {
  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
  }
  catch (error) {
    console.log(error);
  }
}

makeRequest();

// request to pay 
const axios = require('axios');
let data = JSON.stringify({
  "amount": "1000000",
  "currency": "XOF",
  "externalId": "20231207",
  "payer": {
    "partyIdType": "MSISDN",
    "partyId": "0566062472"
  },
  "payerMessage": "sucess payement",
  "payeeNote": "receive payement"
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay',
  headers: { 
    'Ocp-Apim-Subscription-Key': '440dea399815474e81b2ae50907d832b', 
    'X-Reference-Id': '2384d722-40be-4eef-b034-e29298ccd897', 
    'X-Target-Environment': 'sandbox', 
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6IjIzODRkNzIyLTQwYmUtNGVlZi1iMDM0LWUyOTI5OGNjZDg5NyIsImV4cGlyZXMiOiIyMDIzLTA5LTA2VDEyOjQ4OjE3LjIyNSIsInNlc3Npb25JZCI6IjQzMmIzYWM1LTk4NzAtNGQ2Ni1hOWVkLTUzYTExM2Y3YzJhNCJ9.Q3K_CNgvzhavpKVXJ9njA6oCNq2n5TUVjn4wHCGE5SRukeN9FetlDgBenuTp2xVp1ow9F_JL8oEpOxGYbI9ZBILqaVx3WDPlmBEz9PZmjtkmCgYTNxo0djsIhf1JudR7dvx15glTYOzawUb9YDtiR9Ip1LMSwbI82UPr0aYl9YR9aSmNuLsc60AIvqi8oHWqTzAK4Y8NiGSSBzjVEt-WGh7sCPVWcm31CgaECU3PaA5F0bhi10QsoQz1bv8dP3VjNAwb5bgFGNdEH_yPCnFV-gfiMuufdenjSYoTJomASjHeR0eieeXbWgm2NZckuT4cTw58Pr-Lts6CU8Vunj8dhw'
  },
  data : data
};

async function makeRequest() {
  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
  }
  catch (error) {
    console.log(error);
  }
}

makeRequest();

// Create user api user 
const axios = require('axios');

async function postData() {
  try {
    const data = JSON.stringify({
      "providerCallbackHost": "https://webhook.site/e1f1f8f5-3cd9-4044-8176-05de70fca303"
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://sandbox.momodeveloper.mtn.com/v1_0/apiuser',
      headers: {
        'X-Reference-Id': '2384d722-40be-4eef-b034-e29298ccd897',
        'Ocp-Apim-Subscription-Key': '440dea399815474e81b2ae50907d832b',
        'Content-Type': 'application/json'
      },
      data: data
    };

    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
  } catch (error) {
    console.error(error);
  }
}

postData();


// getAaibleBalance 
const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://sandbox.momodeveloper.mtn.com/collection/v1_0/account/balance',
  headers: { 
    'X-Reference-Id': '36c2f659-c4a4-4c7d-878a-5ba93c1594f1', 
    'X-Target-Environment': 'sandbox', 
    'Ocp-Apim-Subscription-Key': '440dea399815474e81b2ae50907d832b', 
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6IjIzODRkNzIyLTQwYmUtNGVlZi1iMDM0LWUyOTI5OGNjZDg5NyIsImV4cGlyZXMiOiIyMDIzLTA5LTA2VDEyOjQ4OjE3LjIyNSIsInNlc3Npb25JZCI6IjQzMmIzYWM1LTk4NzAtNGQ2Ni1hOWVkLTUzYTExM2Y3YzJhNCJ9.Q3K_CNgvzhavpKVXJ9njA6oCNq2n5TUVjn4wHCGE5SRukeN9FetlDgBenuTp2xVp1ow9F_JL8oEpOxGYbI9ZBILqaVx3WDPlmBEz9PZmjtkmCgYTNxo0djsIhf1JudR7dvx15glTYOzawUb9YDtiR9Ip1LMSwbI82UPr0aYl9YR9aSmNuLsc60AIvqi8oHWqTzAK4Y8NiGSSBzjVEt-WGh7sCPVWcm31CgaECU3PaA5F0bhi10QsoQz1bv8dP3VjNAwb5bgFGNdEH_yPCnFV-gfiMuufdenjSYoTJomASjHeR0eieeXbWgm2NZckuT4cTw58Pr-Lts6CU8Vunj8dhw'
  }
};

async function makeRequest() {
  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
  }
  catch (error) {
    console.log(error);
  }
}

makeRequest();

// request pay status 
const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay/d40aae15-dd20-45c6-83b7-c415a126b1b2',
  headers: { 
    'X-Target-Environment': 'sandbox', 
    'Ocp-Apim-Subscription-Key': '440dea399815474e81b2ae50907d832b', 
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6IjIzODRkNzIyLTQwYmUtNGVlZi1iMDM0LWUyOTI5OGNjZDg5NyIsImV4cGlyZXMiOiIyMDIzLTA5LTA2VDE0OjE1OjU3LjY1OCIsInNlc3Npb25JZCI6IjRlYjlmNTE3LWY3ZWItNDBkMy1hOWViLTFlN2ViNWRmMGRjYSJ9.eu6q-0-DquJ_c0iioaW07yiztqGegrwsnKK6nJkRk7wK0MEhwbdK4p6j4-1vRDg_17sPrYdr_XidYvlowjghfQ0i-KX8qO0evH4K9WJtC75GigDAfCVcJ9KSg7LatEper1OD4YMPcR5izycH572TrKIwqgjaiHMquIPDLt46FoSjKyK7IOhKlRbB0AFdM6SMCMHfzpj35QVaU2qEzXV89tBubiJEzBJI1FPkwN3PpYRgpNKjCPbI2G1XMCNWFw73Mo-NQfyQQJ-mzutmRZIOzJAKCgHoiNB5Dr72qSdVq-4n22sQnT5YKg1x2pjFvCKGKdHub4SJQxt6kiAZIZrJ_Q'
  }
};

async function makeRequest() {
  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
  }
  catch (error) {
    console.log(error);
  }
}

makeRequest();

// check if user register 
const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://sandbox.momodeveloper.mtn.com/collection/v1_0/accountholder/msisdn/2250566062472/active',
  headers: { 
    'X-Target-Environment': 'sandbox', 
    'Ocp-Apim-Subscription-Key': '440dea399815474e81b2ae50907d832b', 
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6IjIzODRkNzIyLTQwYmUtNGVlZi1iMDM0LWUyOTI5OGNjZDg5NyIsImV4cGlyZXMiOiIyMDIzLTA5LTA2VDE0OjE1OjU3LjY1OCIsInNlc3Npb25JZCI6IjRlYjlmNTE3LWY3ZWItNDBkMy1hOWViLTFlN2ViNWRmMGRjYSJ9.eu6q-0-DquJ_c0iioaW07yiztqGegrwsnKK6nJkRk7wK0MEhwbdK4p6j4-1vRDg_17sPrYdr_XidYvlowjghfQ0i-KX8qO0evH4K9WJtC75GigDAfCVcJ9KSg7LatEper1OD4YMPcR5izycH572TrKIwqgjaiHMquIPDLt46FoSjKyK7IOhKlRbB0AFdM6SMCMHfzpj35QVaU2qEzXV89tBubiJEzBJI1FPkwN3PpYRgpNKjCPbI2G1XMCNWFw73Mo-NQfyQQJ-mzutmRZIOzJAKCgHoiNB5Dr72qSdVq-4n22sQnT5YKg1x2pjFvCKGKdHub4SJQxt6kiAZIZrJ_Q'
  }
};

async function makeRequest() {
  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
  }
  catch (error) {
    console.log(error);
  }
}

makeRequest();




