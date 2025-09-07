import z from 'zod'

/**
 * Response schema cho account
 */
export const AccountRes = z
  .object({
    data: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string().email(),
      username: z.string(),
      phone: z.string().nullable().optional(),
      dob: z.date().nullable().optional(),
      gender: z.enum(['male', 'female']).nullable().optional(),
    }),
    message: z.string(),
  })
  .strict()

export type AccountResType = z.infer<typeof AccountRes>

/**
 * Body schema cho update profile
 */
export const UpdateMeBody = z.object({
  name: z.string().trim().min(2).max(256),
  username: z.string().trim().min(2).max(256).nullable().optional(),
  dob: z.date().nullable().optional(),
  gender: z.enum(['male', 'female']).nullable().optional(),
  phone: z.string().trim().min(2).max(256).nullable().optional(),
})

export type UpdateMeBodyType = z.infer<typeof UpdateMeBody>
