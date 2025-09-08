import { 
  createMatchesController, 
  getMatchController, 
  getMatchesController, 
  updateMatchController,
  deleteMatchController 
} from '@/controllers/matches.controller'
import { requireLoginedHook } from '@/hooks/auth.hooks'
import {
  MatchBody,
  MatchBodyType,
  MatchesListRes,
  MatchesListResType,
  MatchesParamsType,
  MatchResponse,
  MatchResponseType,
  MatchNotFoundResponse,
  MatchNotFoundResponseType
} from '@/schemaValidations/matches.schema'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'

export default async function matchesRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  // CREATE
  fastify.post<{
    Reply: MatchResponseType
    Body: MatchBodyType
  }>(
    '/',
    {
      schema: {
        response: {
          200: MatchResponse
        },
        body: MatchBody
      },
      preValidation: fastify.auth([requireLoginedHook])
    },
    async (request, reply) => {
      const result = await createMatchesController(request.body);
      reply.send(result);
    }
  )

  // READ ALL
  fastify.get<{ Reply: MatchesListResType }>(
    '/',
    {
      schema: {
        response: {
          200: MatchesListRes
        }
      }
    },
    async (request, reply) => {
      const result = await getMatchesController();
      reply.send(result);
    }
  )

  // READ ONE
  fastify.get<{
    Reply: MatchResponseType | MatchNotFoundResponseType
    Params: MatchesParamsType
  }>(
    '/:id', 
    {
      schema: {
        response: {
          200: MatchResponse,
          404: MatchNotFoundResponse
        }
      }
    },
    async (request, reply) => {
      const result = await getMatchController(Number(request.params.id));
      
      if (result.data === null) {
        return reply.status(404).send(result);
      }
      
      reply.send(result);
    }
  )

  // UPDATE
  fastify.put<{ 
    Reply: MatchResponseType | MatchNotFoundResponseType
    Body: MatchBodyType
    Params: { id: string } 
  }>(
    '/:id',
    {
      schema: {
        response: {
          200: MatchResponse,
          404: MatchNotFoundResponse
        },
        body: MatchBody
      },
      preValidation: fastify.auth([requireLoginedHook])
    },
    async (request, reply) => {
      const result = await updateMatchController(
        parseInt(request.params.id), 
        request.body
      );
      
      if (result.data === null) {
        return reply.status(404).send(result);
      }
      
      reply.send(result);
    }
  )

  // DELETE
  fastify.delete<{
    Params: { id: string }
  }>(
    '/:id',
    {
      preValidation: fastify.auth([requireLoginedHook])
    },
    async (request, reply) => {
      const result = await deleteMatchController(parseInt(request.params.id));
      reply.send(result);
    }
  )
}