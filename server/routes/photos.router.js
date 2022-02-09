const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

// Retrieve photos from database
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('in get photos', req.user.id)

    let queryText = `
    SELECT
        "photos"."id" AS "photoID",
        "photos"."imageURL",
        "user"."id" AS "userID",
        "photos"."photoDate",
        ARRAY_AGG("tags"."tagName"),
        "photos"."description"
    FROM "user"
    JOIN "photos"
        ON "photos"."userID" = "user"."id"
    JOIN "photoTagJoiner"
        ON "photoTagJoiner"."photoID" = "photos"."id"
    JOIN "tags"
        ON "tags"."id" = "photoTagJoiner"."tagID"
    WHERE "user"."id" = $1
    GROUP BY "photos"."id", "user"."id";
    `;

    let queryParams = [
        req.user.id
    ];

    pool.query(queryText, queryParams)
        .then((results) => {
            res.send(results.rows)
        })
        .catch((error) => {
            console.log('error getting photos', error);
        });
        
});

//for the filter option
router.get('/:tag', rejectUnauthenticated, (req, res) => {
    console.log('in filter photos', req.user.id, req.params.tag)

    let queryText = `
    SELECT
        "photos"."imageURL",
        "photos"."photoDate",
        ARRAY_AGG("tags"."tagName")
    FROM "user"
    JOIN "photos"
        ON "photos"."userID" = "user"."id"
    JOIN "photoTagJoiner"
        ON "photoTagJoiner"."photoID" = "photos"."id"
    JOIN "tags"
        ON "tags"."id" = "photoTagJoiner"."tagID"
    WHERE "user"."id" = $1
        AND "tags"."tagName" = $2
    GROUP BY "photos"."imageURL", "photos"."photoDate";
    `;

    let queryParams = [
        req.user.id,
        req.params.tag
    ];

    pool.query(queryText, queryParams)
        .then((results) => {
            res.send(results.rows)
        })
        .catch((error) => {
            console.log('error getting photos', error);
        });
        
});

router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('in post photos', req.body)

    let queryText = `
    INSERT INTO "photos" 
        ("imageURL", "userID", "description", "photoDate", "uploadDate")
    VALUES ($1, $2, $3, $4, $5)
    `;

    let queryParams = [
        req.body.imageURL,
        req.user.id,
        req.body.description,
        req.body.photoDate,
        req.body.uploadDate
    ];

    pool.query(queryText, queryParams)
        .then(() => {
            console.log('post photo success')
        })
        .catch((err) => {
            console.log('error posting photo', err);
        });

    let sqlText = `
        INSERT INTO "tags"
            ("tagName")
        VALUES
            ($1)
    `;

    let sqlParams = [
        req.body.tags
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
        req.body.tags
    ];

    pool.query(joinerText, joinerParams)
        .then(() => {
            console.log('joiner success')
        })
        .catch((err) => {
            console.log('error posting photo', err);
        });

})

router.delete(`/:id`, rejectUnauthenticated, (req, res) => {
    console.log('in delete photo', req.params.id);

    let sqlText = `
        DELETE FROM "photos"
        WHERE "id" = $1
    `;

    let sqlParams = [
        req.params.id
    ];

    pool.query(sqlText, sqlParams)
        .then(
            res.sendStatus(200)
        )
        .catch(error => {
            console.log('error deleting from db', error)
        })
});


module.exports = router;