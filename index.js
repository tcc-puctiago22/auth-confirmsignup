const AWS = require('aws-sdk')
 const cognito = new AWS.CognitoIdentityServiceProvider()

const _header = {
                "Access-Control-Allow-Headers" : "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST"
            }

exports.handler = async (event) => {
    
   const { 
      username,
      confirmationCode
    } = JSON.parse(event.body) 
  
     const paramsForSetPass = {
        ClientId:  process.env.CLIENT_ID,
        ConfirmationCode: confirmationCode,
        Username: username,
      };
  
    try{
        
        console.log(paramsForSetPass)
        
        await cognito.confirmSignUp(paramsForSetPass).promise()
        
        let message={
            "message": "User confirmSignUp successful",
          }
          console.log(message)

           const response = {
                            statusCode: 200,
                           headers: _header,
                            body: JSON.stringify(message),
                        };
     return response;

    }catch(_err){
        console.log(_err)
        return {
                 statusCode: 400,
                 headers: {
                        "Access-Control-Allow-Headers" : "*",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "OPTIONS,POST"
                    },
                        body: JSON.stringify(_err)
            };
    }
    

};