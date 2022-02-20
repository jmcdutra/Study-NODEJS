const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function getStatus(url) {
    const response = await fetch(url)
    return response.status
}

export default async function validateURL(url) {
    const status = await getStatus(url)
    if (status >= 200 && status <= 299) {
        return true;
    }
    return false;
}