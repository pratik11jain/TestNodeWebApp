import * as express from 'express';

const router = express.Router();

export default (): express.Router => {
    router.get('/', async (request, response) => {
        response.json({ a: 1 });
    });

    return router;
};
