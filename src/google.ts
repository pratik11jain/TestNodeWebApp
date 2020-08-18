import { google, youtube_v3 } from 'googleapis';
import YoutubeObject from './models/youtubeObject';
import { Kind } from './models/kind';

function getYoutubeApi() {
    return google.youtube('v3');
}

async function findChannelByName(name: string, secret: string): Promise<youtube_v3.Schema$SearchResult[]> {
    return await new Promise((resolve, reject) => {
        const service = getYoutubeApi();
        service.search.list(
            {
                auth: secret,
                part: ['snippet'],
                q: name,
                type: ['channel'],
            },
            (err, response) => {
                if (err) {
                    reject(err);
                }
                resolve(response?.data.items);
            },
        );
    });
}

export async function getAllVideosByChannelId(channelId: string, secret: string): Promise<YoutubeObject[]> {
    return (await getAllObjectsByChannelId(channelId, secret)).filter((x) => x.videoId);
}

export async function getAllPlaylistsByChannelId(channelId: string, secret: string): Promise<YoutubeObject[]> {
    return (await getAllObjectsByChannelId(channelId, secret)).filter((x) => x.playlistId);
}

async function getAllObjectsByChannelId(channelId: string, secret: string): Promise<YoutubeObject[]> {
    return await new Promise((resolve, reject) => {
        const service = getYoutubeApi();
        service.search.list(
            {
                auth: secret,
                part: ['snippet', 'id'],
                channelId,
                maxResults: 1000,
            },
            (err, response) => {
                if (err) {
                    reject(err);
                }
                resolve(
                    response?.data.items?.map((x) => {
                        return {
                            oKind: x.kind,
                            kind: x.id?.kind as Kind,
                            playlistId: x.id?.playlistId as string,
                            videoId: x.id?.videoId as string,
                            title: x.snippet?.title as string,
                            description: x.snippet?.description as string,
                        };
                    }),
                );
            },
        );
    });
}
