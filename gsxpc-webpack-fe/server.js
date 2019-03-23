const path = require('path');
var childProcess = require('child_process');
const express = require('express');
const next = require('next');
const mocker = require('mocker-api');
const cacheableResponse = require('cacheable-response');
const nextConfig = require('./next.config');


const app = next(nextConfig);
const handle = app.getRequestHandler();
const defaultPort = 3000;
const port = process.env.PORT || defaultPort;

if (nextConfig.dev) {
    try {
        childProcess.exec('kill -9 `lsof -t -i:' + port + '`');
    }
    catch (e) {}
}

console.log('Waiting ready on http://localhost ' + port + ' ……');

const ssrCache = cacheableResponse({
    // 1hour
    ttl: 1000 * 60 * 60 * 2,
    get: async ({req, res, actualPage, queryParams}) => ({
        data: await app.renderToHTML(req, res, actualPage, queryParams)
    }),
    send: ({data, res}) => res.send(data)
});

// Pass in the absolute path to your robots.txt file
app.prepare()
    .then(() => {
        const server = express();

        if (nextConfig.dev) {
            const glob = require('glob');
            mocker(server, glob.sync(path.resolve('./mock/**/*.{js,json}')));
        }

        // 直播推课
        server.get('/slive/pushcourse/:id', (req, res) => {
            const actualPage = '/live/student/pushCourse';
            const queryParams = {
                courseNumber: req.params.id
            };

            app.render(req, res, actualPage, queryParams);
        });

        server.get('/tlive/pushlist/:id', (req, res) => {
            const actualPage = '/live/teacher/pushList';
            const queryParams = {
                courseNumber: req.params.id
            };
            // 缓存
            return ssrCache({req, res, actualPage, queryParams});
            // app.render(req, res, actualPage, queryParams);
        });

        const root = __dirname + '/static/';

        const optionsPlain = {
            root,
            headers: {
                'Content-Type': 'text/plain;charset=UTF-8'
            }
        };
        const optionsHtml = {
            root,
            headers: {
                'Content-Type': 'text/html;charset=UTF-8'
            }
        };
        const optionsXml = {
            root,
            headers: {
                'Content-Type': 'application/xml;charset=UTF-8'
            }
        };
        const HTTP_STATUS_OK = 200;
        server.get('/robots.txt', (req, res) => res.status(HTTP_STATUS_OK).sendFile('robots.txt', optionsPlain));
        server.get('/sitemap.html', (req, res) => res.status(HTTP_STATUS_OK).sendFile('sitemap.html', optionsHtml));
        server.get('/sitemap.xml', (req, res) => res.status(HTTP_STATUS_OK).sendFile('sitemap.xml', optionsXml));

        server.get('*', (req, res) => {
            handle(req, res);
        });

        const httpServer = server.listen(port, error => {
            if (error) {
                throw error;
            }

            console.log('> Ready on http://localhost ' + port);
        });

        process.on('SIGINT', () => {
            httpServer.close(error => {
                process.exit(error ? 1 : 0);
            });
        });

    })
    .catch(ex => {
        // console.error(ex.stack);
        process.exit(1);
    });
