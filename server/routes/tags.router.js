const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log('in tags router', req.user.id);

    let sqlText = `
        SELECT
            "user"."id",
            ARRAY_AGG(DISTINCT("tags"."tagName"))
        FROM "user"
        JOIN "photos"
            ON "photos"."userID" = "user"."id"
        JOIN "photoTagJoiner"
            ON "photoTagJoiner"."photoID" = "photos"."id"
        JOIN "tags"
            ON "tags"."id" = "photoTagJoiner"."tagID"
        WHERE "user"."id" = $1
        GROUP BY "user"."id";
    `;

    let sqlParams = [
        req.user.id
    ];

    pool.query(sqlText, sqlParams)
        .then((results) => {
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('tag fetch error', error);
        })
});

router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('receiving to post', req.params)
//     let sqlText = `
//     INSERT INTO "tags"
//         ("tagName")
//     VALUES
//         ($1)
// `;

// let sqlParams = [
//     req.body
// ];

// pool.query(sqlText, sqlParams)
//     .then(() => {
//         console.log('post tags success')
//     })
//     .catch((err) => {
//         console.log('error posting photo', err);
//     });
})

module.exports = router;