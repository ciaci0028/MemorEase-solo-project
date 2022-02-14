const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

// getting all the pertinent information from the photo
// that has been clicked on "edit" mode
router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log('active photo is', req.params.id);

    let queryText = `
        SELECT 
            "photos"."imageURL",
            "photos"."description",
            TO_CHAR("photos"."photoDate", 'MM/DD/YYYY'),
            ARRAY_AGG("tags"."tagName")
        FROM "photos"
        JOIN "photoTagJoiner"
            ON "photoTagJoiner"."photoID" = "photos"."id"
        JOIN "tags"
            ON "tags"."id" = "photoTagJoiner"."tagID"
        WHERE "photos"."id" = $1
        GROUP BY
            "photos"."imageURL", "photos"."description", "photos"."photoDate";
    `;

    let queryParams = [
        req.params.id
    ];

    pool.query(queryText, queryParams)
        .then(results => {
            res.send(results.rows[0])
        })
        .catch(error => {
            console.log('active photo error', error)
        });
})


module.exports = router;