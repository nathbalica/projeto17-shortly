import { createUrlsDB } from "../repositories/urls.repository";
import { nanoid } from 'nanoid';
import { customAlphabet } from 'nanoid';

const customAlphabetString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const generateShortUrlId = customAlphabet(customAlphabetString, 8);


function generateShortUrlId(length = 8) {
    return nanoid(length);
}

export async function createUrls(req, res) {
    const { userId } = res.locals.userId;
    const { url } = req.body;
    const shortUrl = generateShortUrlId();

    try {
        const { rows: [resultUrls] } = await createUrlsDB(url, shortUrl, userId)
        res.status(201).send(resultUrls)
    } catch (err) {
        res.status(500).send(err.message);
    }

}

