import * as express from 'express';
import { getAllVideosByChannelId } from '../google';
import { googleApiKey } from '../constants';
import { people } from '../data/people';
import { renderError } from '../utils';

const router = express.Router();

export default (): express.Router => {
    router.get('/:name', async (request, response) => {
        const name = request.params.name;
        const index = people.findIndex((x) => x.name === name);
        if (index > -1) {
            const videos = await getAllVideosByChannelId(people[index].channelId, googleApiKey);
            response.render('person', { videos, name });
        } else {
            renderError(response, `Person '${name}' not found.`, 404);
        }
    });

    return router;
};
