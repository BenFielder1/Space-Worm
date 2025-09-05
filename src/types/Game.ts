export default interface Game {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    playUrl: string;
    tags: string[];
    category: string;
    releaseDate: string;
    playCount: number;
    rating: number;
    duration: string;
    featured: boolean;
    apkUrl?: string;
    apkSize?: string;
    aspect: string;
    width?: string;
    height?: string;
    fullscreen?: boolean;
}