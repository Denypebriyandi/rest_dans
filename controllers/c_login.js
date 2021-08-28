require ('dotenv').config();
const query = require('../querys/q_login');
const jwt = require('jsonwebtoken');

exports.login = async (request, response) => {
    try {
        const cekValid = await query.cekValid(request.body);
        const cekPassword = await query.cekPassword(request.body.password,cekValid[0].dataValues.password);
        const dataJwt = {
            id: cekValid[0].dataValues.id,
            id_user: cekValid[0].dataValues.id_user,
            username: cekValid[0].dataValues.username,
            name: cekValid[0].dataValues.name
        }
        const createJwt = await jwt.sign(dataJwt, process.env.KEY_JWT, { expiresIn: process.env.EXP_JWT }, { algorithm: 'RS256' });
        const updateToken = await query.updateToken(cekValid[0].dataValues.id,createJwt);
        const insertLog = await query.insertLog(cekValid[0].dataValues.id);
        let data_res = [];
        const res = {
            token: createJwt
        }
        data_res.push(res);
        const data = {
            'status': 200,
            'message': 'Anda berhasil login',
            'data': data_res
        }
        response.status(200);
        response.end(response.json(data));
    } catch (error) {
        console.error(error);
        let status = 500;
        let message = error;
        if(error === "username_salah" || error === "password_salah") {
            status = 400;
            message = "Username atau password salah";
        }
        const data = {
            'status': status,
            'message': message
        }
        response.status(status);
        response.end(response.json(data));
    }
}