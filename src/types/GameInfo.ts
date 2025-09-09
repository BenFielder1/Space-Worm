interface Control {
    key: string;
    description: string;
}

export default interface GameInfo {
    id: string;
    controls: Control[];
    tips: string[];
    requirements: string[];
}