import { createUrlsDB } from "../repositories/urls.repository.js";
import { customAlphabet } from 'nanoid';
import { getUrlByIdDB, incrementVisitsDB, deleteUrlDB, getUrlByshortUrlDB, getUserUrlDB } from "../repositories/urls.repository.js";

const customAlphabetString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const generateShortUrlId = customAlphabet(customAlphabetString, 8);


export async function createUrls(req, res) {
    const { userId } = res.locals;
    const { url } = req.body;
    const shortUrl = generateShortUrlId();

    try {
        const { rows: [resultUrls] } = await createUrlsDB(url, shortUrl, userId)
        res.status(201).send(resultUrls)
    } catch (err) {
        res.status(500).send(err.message);
    }

}

export async function getUrlById(req, res) {
    const { id } = req.params;

    try {
        const { rows } = await getUrlByIdDB(id);
        if (rows.length === 0) {
            return res.status(404).send({ message: "URL not found" });
        }
        
        res.send(rows[0])
    } catch (err) {
        res.status(500).send(err.message);
    }

}

export async function getUrlByShortUrl(req, res) {
    const { shortUrl } = req.params;

    try {
        const { rows } = await getUrlByshortUrlDB(shortUrl);
        if (rows.length === 0) {
            return res.status(404).send({ message: "URL not found" });
        }

        await incrementVisitsDB(shortUrl)
        
        res.redirect(rows[0].url)
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function deleteUrl(req, res) {
    const { id } = req.params;
    const { userId } = res.locals;

    try {
        const userUrl = await getUserUrlDB(id)

        if (userUrl.rowCount === 0) return res.status(404).send({ message: "URL não existe!" })

        if (userUrl.rows[0].userId !== userId) {
            return res.status(401).send({ message: "Unauthorized: This URL does not belong to the user" });
        }

        await deleteUrlDB(id)

        res.sendStatus(204)
    } catch (err) {
        res.status(500).send(err.message);
    }
}