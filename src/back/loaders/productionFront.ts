import { FastifyInstance } from 'fastify';
import fastifyStatic from '@fastify/static';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const frontPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../front/dist/client');
const files = fs.readdirSync(frontPath);
export default async (server: FastifyInstance): Promise<void> => {
    await server.register(fastifyStatic, {
        prefix: '/assets',
        root: path.join(frontPath, 'assets'),
    });
    server.all('/*', async (req, res) => {
        // ../../front/dist/client/ 에 있는 index.html 파일을 제외한 모든 파일에 대한 요청을 처리
        const url = req.url;
        if (files.includes(url.replace('/', ''))) {
            return res.sendFile(url.replace('/', ''), frontPath);
        }
        
        const template = fs.readFileSync(path.join(frontPath, 'index.html'), 'utf-8');
        try {
            const render = (await import('@front/dist/server/entry-server.cjs')).render;
            const rendered = render(url);
            const html = template
                .replace(`<!--app-html-->`, rendered.html);
            res.status(200).header('Content-Type', 'text/html').send(html);
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    });
}
