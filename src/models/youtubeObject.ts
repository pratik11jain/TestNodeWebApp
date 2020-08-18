import { Kind } from './kind';

export default interface YoutubeObject {
    kind: Kind;
    playlistId: string;
    videoId: string;
    title: string;
    description: string;
}
