interface GenLinkToImgProxyData {
    readonly name: string;
    readonly width: number;
    readonly height: number;
}

export const genLinkToImgProxy = ({
    name,
    width,
    height,
}: GenLinkToImgProxyData): string => {
    return `https://img.woodengames.ge/rs:fill:${width}:${height}:1/plain/prod/${name}`;
};

// temp
export const linkToName = (link: string) =>
    link.split('/')[link.split('/').length - 1];
