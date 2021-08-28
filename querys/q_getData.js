const axios = require('axios');

exports.getData = (param) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',      
            url: 'http://dev3.dansmultipro.co.id/api/recruitment/positions.json',
            timeout: 10000
        })
        .then((response) => {
            const data = response.data;
            if (data.length > 0) {
                let dataRes = [];
                for (let i = 0; i < data.length; i++) {
                    if (param.description === undefined && param.location === undefined) {
                        dataRes.push(data[i]);
                    }
                    if (param.description !== undefined && param.description !== "") {
                        const description = data[i].description;
                        const searchDescription = description.includes(param.description);
                        if (searchDescription) {
                            dataRes.push(data[i]);
                        }
                    }
                    if (param.location !== undefined && param.location !== "") {
                        const location = data[i].location;
                        const searchLocation = location.includes(param.location);
                        if (searchLocation) {
                            dataRes.push(data[i]);
                        }
                    }
                }
                resolve(dataRes)
            } else {
                reject('data_kosong');
            }
        })
        .catch((error) => {
            if (error.code === 'ECONNABORTED') {
                console.log(error.message);
                reject(error.message);
            } else {
                if (error.response) {
                    if(error.response.data) {
                        console.log(error.response.data);
                        reject(error.response.data);
                    } else {
                        console.log(error.response.statusText);
                        reject(error.response.statusText);
                    }
                } else if (error.request) {
                    console.log(error.request);
                    reject(error.request);
                } else {
                    console.log(error.message);
                    reject(error.message);
                }
            }
        })
    });
}

exports.detailData = (param) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',      
            url: 'http://dev3.dansmultipro.co.id/api/recruitment/positions.json',
            timeout: 10000
        })
        .then((response) => {
            const data = response.data;
            if (data.length > 0) {
                let dataRes = [];
                for (let i = 0; i < data.length; i++) {
                    if (param.id === data[i].id) {
                        dataRes.push(data[i]);
                    }
                }
                resolve(dataRes)
            } else {
                reject('data_kosong');
            }
        })
        .catch((error) => {
            if (error.code === 'ECONNABORTED') {
                console.log(error.message);
                reject(error.message);
            } else {
                if (error.response) {
                    if(error.response.data) {
                        console.log(error.response.data);
                        reject(error.response.data);
                    } else {
                        console.log(error.response.statusText);
                        reject(error.response.statusText);
                    }
                } else if (error.request) {
                    console.log(error.request);
                    reject(error.request);
                } else {
                    console.log(error.message);
                    reject(error.message);
                }
            }
        })
    });
}