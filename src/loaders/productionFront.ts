import { FastifyInstance } from 'fastify';
import fastifyStatic from '@fastify/static';
import fastifyCompress from '@fastify/compress';
import sirv from 'sirv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

export default async (server: FastifyInstance): Promise<void> => {
    await server.register(fastifyStatic, {
        root: path.join(path.dirname(fileURLToPath(import.meta.url)), '../../dist/client'),
        prefix: '/',
        index: false,
    });
    // server.all('/*', async (req, res) => {
    //     console.log('here');
    //     const url = req.raw.url;
    //     const template = fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), '../../dist/client/index.html'), 'utf-8');
    //     try {
    //         const render = (await import('../../dist/server/entry-server.js')).render;
    //         const rendered = render(url);
    //         const html = template
    //             .replace(`<!--app-html-->`, rendered.html);
    //         res.header('Content-Type', 'text/html');
    //         res.send(html);
    //     } catch (e) {
    //         console.log(e);
    //         res.status(500).send(e);
    //     }
    // });
}
