import { db } from "../database/database.connection";

export function createUrlsDB(url, shortUrl, userId) {

    const result = db.query(
        `INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3) RETURNING id, "shortUrl";;`,
        [url, shortUrl, userId]
    )
    return result
}