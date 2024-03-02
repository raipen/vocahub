import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import checkUser from '@fastifyHooks/checkUser';
import * as VocaListDTO from '@DTO/vocaList.dto';
import * as VocaListService from '@services/vocaList.service';

const api: FastifyPluginAsync = async (server: FastifyInstance) => {
    server.get<VocaListDTO.getVocaListInterface>(
        '/list/:bookId',
        {
            schema: VocaListDTO.getVocaListSchema,
            preValidation: checkUser
        },
        async (request, reply) => {
            const vocaList = await VocaListService.getVocaList(request.body, request.params);
            reply.status(200).send(vocaList);
        }
    );

    server.patch<VocaListDTO.saveVocaListInterface>(
        '/list',
        {
            schema: VocaListDTO.saveVocaListSchema,
            preValidation: checkUser
        },
        async (request, reply) => {
            const result = await VocaListService.updateVocas(request.body);
            reply.status(200).send(result);
        }
    );

    server.patch<VocaListDTO.increaseCheckCountInterface>(
        '/increaseCheckCount',
        {
            schema: VocaListDTO.increaseCheckCountSchema,
            preValidation: checkUser
        },
        async (request, reply) => {
            await VocaListService.increaseCheckCount(request.body);
            reply.status(200).send();
        }
    );

    server.patch<VocaListDTO.decreaseCheckCountInterface>(
        '/decreaseCheckCount',
        {
            schema: VocaListDTO.decreaseCheckCountSchema,
            preValidation: checkUser
        },
        async (request, reply) => {
            await VocaListService.decreaseCheckCount(request.body);
            reply.status(200).send();
        }
    );

    server.delete<VocaListDTO.deleteVocaInterface>(
        '/',
        {
            schema: VocaListDTO.deleteVocaSchema,
            preValidation: checkUser
        },
        async (request, reply) => {
            await VocaListService.deleteVoca(request.body);
            reply.status(200).send();
        }
    );
};

export default api;
