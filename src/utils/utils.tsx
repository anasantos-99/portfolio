export interface ProjectInfo {
    title: string,
    technologies: string,
    description: string[],
    mainImage: string,
    images: string[],
    preview?: string,
    code?: string
}

export function getProjectsFolder(): String {
    return '/projects/';
}

export function getDesignsFolder(): String {
    return '/designs/';
}

export async function getProjectInfo(fileName: string, images: string[]): Promise<ProjectInfo> {
    let json: ProjectInfo
    const file = fileName.split("-")[0];
    const isProject = fileName[0] == 'p';
    json = await fetch( (isProject ? '/projects/' : '/designs/') + fileName + '/' + file + '.json',
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (contents) {
            return contents;
        });
    json.images = images;
    return json;
}

export function getImages(loadImages: any): string[][] {
    let images = [];
    for (const img in loadImages) {
        let currentImg = import.meta.env.PROD ? img.replace("/dist", "") : img.replace("/public", "");
        let id = currentImg.split("/")[2];
        let found = false;
        for (let imageSet of images) {
            if (id == imageSet[0].split("/")[2]) {
                imageSet.push(currentImg);
                found = true;
            }
            if (found)
                break;
        }
        if (!found) {
            let array = [];
            array.push(currentImg);
            images.push(array);
        }
    }
    return images;
}