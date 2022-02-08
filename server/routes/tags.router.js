const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log('in tags router', req.params.id);

    let sqlText = `
    SELECT
        "user"."id" AS "userID",
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
        req.params.id
    ];

    pool.query(sqlText, sqlParams)
        .then((results) => {
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('tag fetch error', error);
        })
})

module.exports = router;