require ('dotenv').config();
const jwt = require('jsonwebtoken');

exports.checkAuth = (request, response, next) => {
    const authorization = request.headers.authorization;
    const apiKey = request.headers['x-api-key'];
    // console.log(apiKey)
    if(authorization === undefined) {
        let data = {
            'status': 401,
            'message': 'No Auth'
        }
        response.status(401);
        response.end(response.json(data));
    } else {
        const split = authorization.split(' ');
        const typeAuth = split[0];
        const key = split[1];
        if (typeAuth === "Basic") {
            const username = process.env.BASIC_USERNAME;
            const password = process.env.BASIC_PASSWORD;
            const basicAuth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
            if(authorization === basicAuth) {
                if(apiKey !== process.env.X_API_KEY) {
                    let data = {
                        'status': 403,
                        'message': 'Your key is invalid'
                    }
                    response.status(403);
                    response.end(response.json(data));
                } else {
                    next();
                }
            } else {
                let data = {
                    'status': 401,
                    'message': 'Authority is wrong'
                }
                response.status(401);
                response.end(response.json(data));
            }
        } else {
            let data = {
                'status': 401,
                'message': 'Not Basic'
            }
            response.status(401);
            response.end(response.json(data));
        }
    }
}

exports.verify = async (request, response, next) => {
    try {
        const authorization = request.headers['authorization']
        const apiKey = request.headers['x-api-key']
        if(typeof authorization !== 'undefined') {
            const bearer = authorization.split(' ');
            const typeAuth = bearer[0];
            const bearerToken = bearer[1];
            if (typeAuth === "Bearer") {
                const decode = await jwt.verify(bearerToken, process.env.KEY_JWT);
                if (apiKey !== undefined) {
                    if (apiKey !== "") {
                        if (apiKey === process.env.X_API_KEY) {
                            next();
                        } else {
                            let data = {
                                'status': 403,
                                'message': 'Your key is invalid'
                            }
                            response.status(403);
                            response.end(response.json(data));
                        }
                    } else {
                        let data = {
                            'status': 403,
                            'message': 'Your key is empty'
                        }
                        response.status(403);
                        response.end(response.json(data));
                    }
                } else {
                    let data = {
                        'status': 403,
                        'message': 'No Api Key'
                    }
                    response.status(403);
                    response.end(response.json(data));
                }
            } else {
                let data = {
                    'status': 401,
                    'message': 'Not Bearer'
                }
                response.status(401);
                response.end(response.json(data));
            }
        } else {
            let data = {
                'status': 401,
                'message': 'No Auth'
            }
            response.status(401);
            response.end(response.json(data));
        }
    } catch (error) {
        if (error.message === "jwt expired") {
            let data = {
                'status': 401,
                'message': 'Your key bearer has expired, please log in again to correct the session'
            }
            response.status(401);
            response.end(response.json(data));
        } else {
            console.log(error.message);
            let data = {
                'status': 500,
                'message': error.message
            }
            response.status(500);
            response.end(response.json(data));
        }
    }
}