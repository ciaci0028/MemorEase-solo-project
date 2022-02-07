const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

// Retrieve photos from database
router.get('/:id', rejectUnauthenticated, (req, res) => {

    let queryText = `
    SELECT
        "imageURL"
    FROM "photos"
    JOIN "user"
        ON "user"."id" = "photos"."userID"
    WHERE "user"."id" = $1;
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