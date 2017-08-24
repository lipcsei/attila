"use strict";
require("dotenv").config();
const express = require('express');

function assertEnv(name) {
    "use strict";
    const value = process.env[name];
    if (!value) {
        throw `Missing environment variable: ${name}`;
    }

    return value;
}


const clientId = assertEnv("SLACK_CLIENT_ID");
const clientSecret = assertEnv("SLACK_CLIENT_SECRET");
const verificationToken = assertEnv("SLACK_VERIFICATION_TOKEN");

const port = process.env.PORT || 8080;

const app = express();

app.listen(port, () => console.log(`Bot is listening on port ${port}`));

app.get('/', function (req, res) {
    res.send('It is working! Path Hit: ' + req.url);
});

app.get('/oauth', function (req, res) {

    if (!req.query.code) {
        res.status(500);
        res.send({"Error": "Looks like we're not getting code."});
        console.log("Looks like we're not getting code.");
    } else {
        request({
            url: 'https://slack.com/api/oauth.access',
            qs: {code: req.query.code, client_id: clientId, client_secret: clientSecret},
            method: 'GET'

        }, function (error, response, body) {
            if (error) {
                console.log(error);
            } else {
                res.json(body);

            }
        })
    }
});

app.post('/attila', function (req, res) {
    res.send({response_type: "in_channel",text:random(words)});
});

const random = function(items) {return items[Math.floor(Math.random() * items.length)]};

const words = [
    "Átención!",
    "Te tatumatlan paraszt!",
    "Ő kompromisszumabbképesebb.",
    "szilvuplé",
    "ogyanolyan",
    "Umbácsósukáccó",
    "Chickyz",
    "Legyen a parasztnak egyből az arcába",
    "Kattint a paraszt",
    "Nekem kurvára mindegy csak legyen kész!",
    "Pézről ne beszéljünk",
    "legyen így",
    "Nincs egy ötösöd taxira? Holnap visszaadom.",
    "Ááh",
    "Ááh ma nem kérek",
    "Vodka?",
    "utolsó metróval megyek",
    "Taxifájv",
    "Hívsz nekem egy Uber-t, holnap odaadom",
    "ez a Marci bazdmeg...",
    "... és olyan volt, hogy",
    "Hétköznap nem iszok!",
    "Asszongya a Macus ...",
    "Nagy kő alatt van a nagy béka",
    "Megyünk vidékre",
    "Megérne egy ajtócsapkodást!",
    "Hazudnák, ha azt mondanám",
    "most jól álltok",
    "oda lehetne érni...",
    "gyász vagy, gyász vagy",
    "Én ezt lesszarom",
    "találtam egy bugot",
    "mizu?",
    "figyu má",
    "intézünk egy lányt neked",
    "Nézz már rá a mobil csatira",
    "Hívlak",
    "Sosem veszed fel",
    "Olyan bugot találtam, hogy beszarsz",
    "az Android miatt hullik ki a hajam",
    "Mikor lesz rilíz",
    "Elkresselt",
    "Mikor lesz kész?",
    "Leveszi a gecit",
    "Mi egy ájtis cég vagyunk",
    "Asszongya nem kell szarnom, másik mondja: jó nekem pont kell",
    "Kérek egy vodkaszódát vodkával",
    "aha, aha",
    "Jajajajaja",
    "Figyu má, ennek örülni fogsz",
    "Figyu má, kéne egy szívesség",
    "ez eddig még jó volt",
    "neeeeeemááááár, neeeeeemááááár",
    "igenn...",
    "Difúlt",
    "Difúltból",
];

