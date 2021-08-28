const db = require('../configs/connect_db');
const passwordHash = require('password-hash');
const dateFormat = require('dateformat');
const today = new Date();

exports.cekValid = (body) => {
    return new Promise((resolve, reject) => {
        db.m_users.findAll({
            where: {
                username: body.username
            }
        })
        .then((m_users) => {
            if(m_users.length > 0) {
                resolve(m_users);
            } else {
                reject('username_salah');
            }
        })
        .catch((err) => {
            console.log('error query q_login.cekValid: '+err.message);
            reject(err.message);
        });
    });
}

exports.cekPassword = (requestPassword,password) => {
    return new Promise((resolve, reject) => {
        if(passwordHash.verify(requestPassword, password)) {
            resolve(true);
        } else {
            reject('password_salah');
        }
    });
}

exports.updateToken = (idUser,token) => {
    return new Promise((resolve, reject) => {
        const body = {};
        body['token'] = token;
        body['is_login'] = 1;
        body['updatedAt'] = dateFormat(today, 'yyyy mmm dd H:MM:ss');
        db.m_users.update(body,
            {
            where: {
                id: idUser
            }
        })
        .then((m_users) => {
            resolve(true);
        })
        .catch((err) => {
            console.log('error q_login.updateToken: '+err.message);
            reject(err.message);
        });
    });
}

exports.insertLog = (idUser) => {
    return new Promise((resolve, reject) => {
        const body = {};
        body['id_user'] = idUser;
        body['status'] = 'login';
        body['createdAt'] = dateFormat(today, 'yyyy mmm dd H:MM:ss');
        
        db.log_inOuts.create(body)
        .then((log_inOuts) => {
            resolve(true);
        })
        .catch((err) => {
            console.log('error q_login.insertLog: '+err.message);
            reject(err.message);
        });
    });
}