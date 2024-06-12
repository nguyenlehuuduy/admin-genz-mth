export type MyIcon = {
    name: string;
    path: string;
};

export const getAllIconLocal = {
    getIcons() {
        return fetch('/data/main-icon.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.icons as MyIcon[]);
    }
};
