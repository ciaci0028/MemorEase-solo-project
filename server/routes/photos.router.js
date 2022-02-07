const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

// Retrieve photos from database
router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log(req.params.id)

    let queryText = `
        SELECT
            "photos"."id" AS "photoID",
            "photos"."imageURL",
            "user"."id" AS "userID",
            "photos"."photoDate",
            ARRAY_AGG("tags"."tagName")
        FROM "photos"
        JOIN "user"
            ON "user"."id" = "photos"."userID"
        JOIN "tags"
            ON "tags"."photoID" = "photos"."id"
        WHERE "user"."id" = $1
        GROUP BY "photos"."id", "user"."id";
    `;

    let queryParams = [
        req.params.id
    ];

    pool.query(queryText, queryParams)
        .then((results) => {
            res.send(results.rows)
        })
        .catch((error) => {
            console.log('error getting photos', error);
        });
        
});

module.exports = router;