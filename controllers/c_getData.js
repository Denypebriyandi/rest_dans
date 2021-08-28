const query = require('../querys/q_getData');

exports.listData = async (request, response) => {
    try {
        const getData = await query.getData(request.query);
        const data = {
            'status': 200,
            'message': 'Mengambil data berhasil',
            'total': getData.length,
            'data': getData
        }
        response.status(200);
        response.end(response.json(data));
    } catch (error) {
        console.error(error);
        let status = 500;
        let message = error;
        if(error === "data_kosong") {
            status = 400;
            message = 'Data yang di cari kosong';
        }
        const data = {
            'status': status,
            'message': message
        }
        response.status(status);
        response.end(response.json(data));
    }
}

exports.detailData = async (request, response) => {
    try {
        const getData = await query.detailData(request.params);
        const data = {
            'status': 200,
            'message': 'Mengambil data berhasil',
            'total': getData.length,
            'data': getData
        }
        response.status(200);
        response.end(response.json(data));
    } catch (error) {
        console.error(error);
        let status = 500;
        let message = error;
        if(error === "data_kosong") {
            status = 400;
            message = 'Data yang di cari kosong';
        }
        const data = {
            'status': status,
            'message': message
        }
        response.status(status);
        response.end(response.json(data));
    }
}