import * as express from 'express';
import * as path from 'path';
import errors from 'http-errors';
import cookieSession from 'cookie-session';
import * as bodyParser from 'body-parser';
import routes from './routes';
import { renderError } from './utils';

async function main() {
    if (process.env.NODE_ENV !== 'production') {
        (await import('source-map-support')).install();
    }

    const app = express.default();

    const port = 3000;

    app.set('trust proxy', true);

    app.use(
        cookieSession({
            name: 'session',
            keys: ['wqedqeqweqwe', 'rthrewdfehtjt'],
        }),
    );

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.set('json spaces', 4);
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../views'));

    // setup routes
    app.use('/', routes());

    // No matching rout found
    app.use((_req, _res, next) => {
        return next(errors(404, 'Page not found'));
    });

    // Error Page
    app.use((err: errors.HttpError, _req: express.Request, res: express.Response, next: express.NextFunction) => {
        renderError(res, err.message, err.status || 500);
        return next(err);
    });

    // Start Server
    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    });
}

main().catch((e) => console.error(e));
