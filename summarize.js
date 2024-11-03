const axios = require('axios');
async function summarizeText(text)
{
    
    let data = JSON.stringify({
      "inputs": text,
      "parameters": {
        "max_length": 100,
        "min_length": 30
      }
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer '+process.env.HF_API_KEY
      },
      data : data
    };
    
    try {
        const response = await axios.request(config);
        //return (response.data);
        return response.data[0].summary_text;
    }

    catch (error) {
        console.log(error);
    }
    
       
}


async function generateImageFromText(text) {
    const API_URL = "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image";
    const headers = {
        'Authorization': 'Bearer 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',
        'Content-Type': 'application/json'
    };

    const payload = {
        "inputs": text
    };

    try {
        const response = await axios.post(API_URL, payload, { headers: headers, responseType: 'arraybuffer' });
        return response.data; // This will be the image bytes
    } catch (error) {
        console.error("Error generating image:", error);
        throw error;
    }
}

module.exports = { summarizeText, generateImageFromText };

