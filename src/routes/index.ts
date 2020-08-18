import * as express from 'express';
import home from './home';
import person from './person';
import people from './people';

const router = express.Router();

export default (): express.Router => {
    router.use('/home', home());
    router.use('/person', person());
    router.use('/people', people());
    return router;
};
