const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
const app = express();
const history = require('connect-history-api-fallback');
//always redirect to https
app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
        res.redirect(`https://${req.header('host')}${req.url}`)
    } else {
        next();
    }
});
app.use(
    history({
        verbose: true
    })
);
app.use(serveStatic(path.join(__dirname, 'dist')));
const port = process.env.PORT || 3000;
app.listen(port);
