import { Response } from 'express';

export function renderError(response: Response, message: string, status: number): void {
    response.locals.message = message;
    response.locals.status = status;
    response.status(status);
    response.render('error');
}
