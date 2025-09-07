import prisma from '@/database'
import { UpdateMeBodyType } from '@/schemaValidations/account.schema'

export const updateMeController = async (accountId: number, body: UpdateMeBodyType) => {
  const account = await prisma.account.update({
    where: { id: accountId },
    data: {
      name: body.name,
      username: body.username ?? '',
      dob: body.dob ?? undefined,
      gender: body.gender ?? undefined,
      phone: body.phone ?? undefined
    }
  })

  return account
}
