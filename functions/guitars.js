const { v4: uuidv4 } = require('uuid');
const guitars = require('../guitarData.js');

exports.handler = async (event) => {
    const { httpMethod, body } = event;

    if (httpMethod === 'GET') {
        // Get guitars logic
        return {
            statusCode: 200,
            body: JSON.stringify(guitars)
        };
    }

    if (httpMethod === 'POST') {
        const newGuitar = JSON.parse(body);
        newGuitar.id = uuidv4();
        guitars.push(newGuitar);

        return {
            statusCode: 201,
            body: JSON.stringify(newGuitar)
        };
    }

    if (httpMethod === 'DELETE') {
        const { id } = event.queryStringParameters;

        const guitarIndex = guitars.findIndex(
            guitar => guitar.id === id
        );

        if (guitarIndex === -1) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Guitar not found' })
            };
        }

        const deletedGuitar = guitars.splice(guitarIndex, 1)[0];

        return {
            statusCode: 200,
            body: JSON.stringify(deletedGuitar)
        };
    }

    // Handle unsupported methods
    return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' })
    };
};