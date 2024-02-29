import { FastifyInstance } from 'fastify';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';

const frontPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../front');
export default async (server: FastifyInstance): Promise<void> => {
    const vite = await createServer({
        server: { middlewareMode: true },
        appType: 'custom'
    });
    server.use(vite.middlewares);
    server.all('*', async (req, res) => {
        const url = req.url;
        const tempTemplate = fs.readFileSync(path.join(frontPath, 'index.html'), 'utf-8');
        const template = await vite.transformIndexHtml(url, tempTemplate);
        try {
            const render = (await vite.ssrLoadModule(path.join(frontPath, 'entry-server.tsx'))).render;
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
