import z from 'zod'

export const MatchBody = z.object({
  homeTeam: z.string().min(2).max(20),
  awayTeam: z.string().min(2).max(20),
  kickOff: z.coerce.date(),
  location: z.string().min(2).max(256),
  league: z.string().min(2).max(256),
  homeLogo: z.string().url(),
  awayLogo: z.string().url()
  // ❌ REMOVE: infoButton không nên có trong body request
})

export type MatchBodyType = z.infer<typeof MatchBody>

export const MatchData = z.object({
  id: z.number(),
  homeTeam: z.string(),
  awayTeam: z.string(),
  kickOff: z.coerce.date(),
  location: z.string(),
  league: z.string(),
  homeLogo: z.string().url(),
  awayLogo: z.string().url(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  infoButton: z.string(), // ✅ Giữ lại cho response
});

export const MatchResponse = z.object({
  data: MatchData,
  message: z.string(),
});
export type MatchResponseType = z.infer<typeof MatchResponse>

export const MatchesListRes = z.object({
  data: z.array(MatchData),
  message: z.string(),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPage: z.number()
  })
})
export type MatchesListResType = z.infer<typeof MatchesListRes>

export const MatchesParams = z.object({
  id: z.coerce.number()
})
export type MatchesParamsType = z.infer<typeof MatchesParams>

// ✅ Thêm schema cho response khi không tìm thấy
export const MatchNotFoundResponse = z.object({
  data: z.null(),
  message: z.string()
})
export type MatchNotFoundResponseType = z.infer<typeof MatchNotFoundResponse>

export const GetQueryParams = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().max(100).default(5),
  sortBy: z.string().default('kickOff'),
  sortOrder: z.enum(['asc', 'desc']).default('asc')
})
export type GetQueryParamsType = z.infer<typeof GetQueryParams>