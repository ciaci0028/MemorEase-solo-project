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
        ARRAY_AGG("tagName")
    FROM "tags"
    WHERE "userID" = $1;
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