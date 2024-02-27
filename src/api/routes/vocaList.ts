import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import onError from '@hooks/onError';
import checkUser from '@hooks/checkUser';
import * as VocaListDTO from '@DTO/vocaList.dto';
import * as VocaListService from '@services/vocaList.service';

const api: FastifyPluginAsync = async (server: FastifyInstance) => {
    server.get<VocaListDTO.getVocaListInterface>(
        '/vocaList',
        {
            schema: VocaListDTO.getVocaListSchema,
            preValidation: checkUser,
            onError
        },
        async (request, reply) => {
            const vocaList = await VocaListService.getVocaList(request.body, request.query);
            reply.status(200).send(vocaList);
        }
    );

    server.patch<VocaListDTO.saveVocaListInterface>(
        '/vocaList',
        {
            schema: VocaListDTO.saveVocaListSchema,
            preValidation: checkUser,
            onError
        },
        async (request, reply) => {
            const result = await VocaListService.updateVocas(request.body);
            reply.status(200).send(result);
        }
    );

    server.patch<VocaListDTO.increaseCheckCountInterface>(
        '/vocaList/increaseCheckCount',
        {
            schema: VocaListDTO.increaseCheckCountSchema,
            preValidation: checkUser,
            onError
        },
        async (request, reply) => {
            await VocaListService.increaseCheckCount(request.body);
            reply.status(200).send();
        }
    );

    server.patch<VocaListDTO.decreaseCheckCountInterface>(
        '/vocaList/decreaseCheckCount',
        {
            schema: VocaListDTO.decreaseCheckCountSchema,
            preValidation: checkUser,
            onError
        },
        async (request, reply) => {
            await VocaListService.decreaseCheckCount(request.body);
            reply.status(200).send();
        }
    );

    server.delete<VocaListDTO.deleteVocaInterface>(
        '/vocaList',
        {
            schema: VocaListDTO.deleteVocaSchema,
            preValidation: checkUser,
            onError
        },
        async (request, reply) => {
            await VocaListService.deleteVoca(request.body);
            reply.status(200).send();
        }
    );
};
