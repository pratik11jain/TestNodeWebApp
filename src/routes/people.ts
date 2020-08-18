import * as express from 'express';
import { getAllPlaylistsByChannelId } from '../google';
import { googleApiKey } from '../constants';
import { people } from '../data/people';

const router = express.Router();

export default (): express.Router => {
    router.get('/', async (request, response) => {
        const list = await Promise.all(
            people.map(async (x) => {
                const p = await getAllPlaylistsByChannelId(x.channelId, googleApiKey);
                console.log(p);
                return {
                    ...x,
                    playlists: p.map((x) => x.playlistId),
                };
            }),
        );
        response.render('people', { list });
    });

    return router;
};
