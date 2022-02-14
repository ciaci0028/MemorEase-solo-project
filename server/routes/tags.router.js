const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

// Getting the array of tags for a given user
// To be used in the filter and tag options
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

// Posting new tags into the "tags" table, which
// rejects if the tag already exists because of 
// unique constraints. Then also joins the tags
// to the photo in the junction table
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('receiving to post', req.body)
    let sqlText = `
    INSERT INTO "tags"
        ("tagName")
    VALUES
        ($1)
    `;

let sqlParams = [
    req.body.tag
];

pool.query(sqlText, sqlParams)
    .then(() => {
        console.log('post tags success')
    })
    .catch((err) => {
        console.log('error posting photo', err);
    });

    let joinerText = `
    INSERT INTO "photoTagJoiner"
        ("photoID", "tagID")
    SELECT 
        "photos"."id" AS "photoID",
        "tags"."id" AS "tagID"
    FROM (
    SELECT "photos"."id"
    FROM "photos"
    WHERE "photos"."imageURL" = $1
    ) AS "photos"
    CROSS JOIN
    (SELECT
        "tags"."id"
    FROM "tags"
    WHERE "tags"."tagName" = $2) AS "tags";
    `;

    let joinerParams = [
        req.body.imageURL,
        req.body.tag
    ];

    pool.query(joinerText, joinerParams)
        .then(() => {
            console.log('joiner success')
        })
        .catch((err) => {
            console.log('error posting joiner tag', err);
        });
})

module.exports = router;