import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import checkUser from '@fastifyHooks/checkUser';
import * as WordbookDTO from '@DTO/wordbook.dto';
import * as WordbookService from '@services/wordbook.service';

const api: FastifyPluginAsync = async (server: FastifyInstance) => {
    server.get<WordbookDTO.getWordbookListInterface>(
        '/wordbook',
        {
            schema: WordbookDTO.getWordbookListSchema,
            preValidation: checkUser
        },
        async (request, reply) => {
            const wordbookList = await WordbookService.getWrodbookList(request.body);
            reply.status(200).send(wordbookList);
        }
    );

    server.post<WordbookDTO.createWordbookInterface>(
        '/wordbook',
        {
            schema: WordbookDTO.createWordbookSchema,
            preValidation: checkUser
        },
        async (request, reply) => {
            const result = await WordbookService.createWordbook(request.body);
            reply.status(201).send(result);
        }
    );

    server.patch<WordbookDTO.hideWordbookInterface>(
        '/wordbook/hide',
        {
            schema: WordbookDTO.hideWordbookSchema,
            preValidation: checkUser
        },
        async (request, reply) => {
            const result = await WordbookService.hideWordbook(request.body);
            reply.status(200).send(result);
        }
    );

    server.patch<WordbookDTO.showWordbookInterface>(
        '/wordbook/show',
        {
            schema: WordbookDTO.showWordbookSchema,
            preValidation: checkUser
        },
        async (request, reply) => {
            const result = await WordbookService.showWordbook(request.body);
            reply.status(200).send(result);
        }
    );
};

export default api;
