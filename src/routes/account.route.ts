import { updateMeController } from '@/controllers/account.controller'
import { requireLoginedHook } from '@/hooks/auth.hooks'
import { AccountRes, AccountResType, UpdateMeBodyType } from '@/schemaValidations/account.schema'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'

export default async function accountRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.addHook('preValidation', fastify.auth([requireLoginedHook]))
  fastify.get<{ Reply: AccountResType }>(
    '/me',
    {
      schema: {
        response: {
          200: AccountRes
        }
      }
    },
    async (request, reply) => {
      reply.send({
        data: {
          name: request.account!.name,
          id: request.account!.id,
          email: request.account!.email,
          username: request.account!.username ?? null,
          dob: request.account!.dob ?? null,
          gender: (request.account!.gender === 'male' || request.account!.gender === 'female')
            ? request.account!.gender
            : null,
          phone: request.account!.phone ?? null
        },
        message: 'Lấy thông tin thành công'
      })
    }
  )

  fastify.put<{
    Reply: AccountResType
    Body: UpdateMeBodyType
  }>(
    '/me',
    {
      schema: {
        response: {
          200: AccountRes
        }
      }
    },
    async (request, reply) => {
      const result = await updateMeController(request.account?.id as number, request.body)
      reply.send({
        data: {
          id: result.id,
          name: result.name,
          email: result.email,
          username: result.username ?? null,
          phone: result.phone ?? null,
          dob: result.dob ?? null,
          gender: (result.gender === 'male' || result.gender === 'female') ? result.gender : null
        },
        message: 'Cập nhật thông tin thành công'
      })
    }
  )
}
