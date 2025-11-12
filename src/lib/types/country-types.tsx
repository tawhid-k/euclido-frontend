import { z } from 'zod'
const TimezoneSchema = z.object({
    zoneName: z.string(),
    gmtOffset: z.number(),
    gmtOffsetName: z.string(),
    abbreviation: z.string(),
    tzName: z.string()
})

const StateSchema = z.object({
    name: z.string(),
    isoCode: z.string(),
    countryCode: z.string(),
    latitude: z.string(),
    longitude: z.string()
})

export const CountrySchema = z.object({
    name: z.string(),
    isoCode: z.string(),
    flag: z.string(),
    phonecode: z.string(),
    currency: z.string(),
    latitude: z.string(),
    longitude: z.string(),
    timezones: z.array(TimezoneSchema)
})

export type StateT = z.infer<typeof StateSchema>
export type CountryT = z.infer<typeof CountrySchema>
