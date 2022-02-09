const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();


router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('in /random get')

    let queryText = `
    SELECT 
        "photos"."imageURL",
        "user"."id"
    FROM "photos"
    JOIN "user"
        ON "user"."id" = "photos"."userID"
    WHERE "user"."id" = $1
    ORDER BY RANDOM()
    LIMIT 1;
    `;

    let queryParams = [
        req.user.id
    ];

    pool.query(queryText, queryParams)
        .then(results => {
            res.send(results.rows)
        })
        .catch(error => {
            console.log('error retrieving memory', error);
        })
})

module.exports = router;