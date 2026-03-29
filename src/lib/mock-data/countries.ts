import { CountryT } from '../types/country-types'
import { ts } from './shared'

export const mockCountries: CountryT[] = [
    {
        name: 'United States', isoCode: 'US', flag: '🇺🇸',
        phonecode: '1', currency: 'USD',
        latitude: '38.00000000', longitude: '-97.00000000',
        timezones: [{ zoneName: 'America/New_York', gmtOffset: -18000, gmtOffsetName: 'UTC-05:00', abbreviation: 'EST', tzName: 'Eastern Standard Time' }]
    },
    {
        name: 'Canada', isoCode: 'CA', flag: '🇨🇦',
        phonecode: '1', currency: 'CAD',
        latitude: '60.00000000', longitude: '-95.00000000',
        timezones: [{ zoneName: 'America/Toronto', gmtOffset: -18000, gmtOffsetName: 'UTC-05:00', abbreviation: 'EST', tzName: 'Eastern Standard Time' }]
    },
    {
        name: 'United Kingdom', isoCode: 'GB', flag: '🇬🇧',
        phonecode: '44', currency: 'GBP',
        latitude: '54.00000000', longitude: '-2.00000000',
        timezones: [{ zoneName: 'Europe/London', gmtOffset: 0, gmtOffsetName: 'UTC±00', abbreviation: 'GMT', tzName: 'Greenwich Mean Time' }]
    },
    {
        name: 'Germany', isoCode: 'DE', flag: '🇩🇪',
        phonecode: '49', currency: 'EUR',
        latitude: '51.00000000', longitude: '9.00000000',
        timezones: [{ zoneName: 'Europe/Berlin', gmtOffset: 3600, gmtOffsetName: 'UTC+01:00', abbreviation: 'CET', tzName: 'Central European Time' }]
    },
    {
        name: 'Australia', isoCode: 'AU', flag: '🇦🇺',
        phonecode: '61', currency: 'AUD',
        latitude: '-27.00000000', longitude: '133.00000000',
        timezones: [{ zoneName: 'Australia/Sydney', gmtOffset: 39600, gmtOffsetName: 'UTC+11:00', abbreviation: 'AEDT', tzName: 'Australian Eastern Daylight Time' }]
    },
    {
        name: 'France', isoCode: 'FR', flag: '🇫🇷',
        phonecode: '33', currency: 'EUR',
        latitude: '46.00000000', longitude: '2.00000000',
        timezones: [{ zoneName: 'Europe/Paris', gmtOffset: 3600, gmtOffsetName: 'UTC+01:00', abbreviation: 'CET', tzName: 'Central European Time' }]
    },
    {
        name: 'Netherlands', isoCode: 'NL', flag: '🇳🇱',
        phonecode: '31', currency: 'EUR',
        latitude: '52.50000000', longitude: '5.75000000',
        timezones: [{ zoneName: 'Europe/Amsterdam', gmtOffset: 3600, gmtOffsetName: 'UTC+01:00', abbreviation: 'CET', tzName: 'Central European Time' }]
    },
    {
        name: 'Sweden', isoCode: 'SE', flag: '🇸🇪',
        phonecode: '46', currency: 'SEK',
        latitude: '62.00000000', longitude: '15.00000000',
        timezones: [{ zoneName: 'Europe/Stockholm', gmtOffset: 3600, gmtOffsetName: 'UTC+01:00', abbreviation: 'CET', tzName: 'Central European Time' }]
    },
    {
        name: 'Switzerland', isoCode: 'CH', flag: '🇨🇭',
        phonecode: '41', currency: 'CHF',
        latitude: '47.00000000', longitude: '8.00000000',
        timezones: [{ zoneName: 'Europe/Zurich', gmtOffset: 3600, gmtOffsetName: 'UTC+01:00', abbreviation: 'CET', tzName: 'Central European Time' }]
    },
    {
        name: 'Japan', isoCode: 'JP', flag: '🇯🇵',
        phonecode: '81', currency: 'JPY',
        latitude: '36.00000000', longitude: '138.00000000',
        timezones: [{ zoneName: 'Asia/Tokyo', gmtOffset: 32400, gmtOffsetName: 'UTC+09:00', abbreviation: 'JST', tzName: 'Japan Standard Time' }]
    },
    {
        name: 'Singapore', isoCode: 'SG', flag: '🇸🇬',
        phonecode: '65', currency: 'SGD',
        latitude: '1.36666666', longitude: '103.80000000',
        timezones: [{ zoneName: 'Asia/Singapore', gmtOffset: 28800, gmtOffsetName: 'UTC+08:00', abbreviation: 'SGT', tzName: 'Singapore Time' }]
    },
    {
        name: 'New Zealand', isoCode: 'NZ', flag: '🇳🇿',
        phonecode: '64', currency: 'NZD',
        latitude: '-41.00000000', longitude: '174.00000000',
        timezones: [{ zoneName: 'Pacific/Auckland', gmtOffset: 46800, gmtOffsetName: 'UTC+13:00', abbreviation: 'NZDT', tzName: 'New Zealand Daylight Time' }]
    },
    {
        name: 'Norway', isoCode: 'NO', flag: '🇳🇴',
        phonecode: '47', currency: 'NOK',
        latitude: '62.00000000', longitude: '10.00000000',
        timezones: [{ zoneName: 'Europe/Oslo', gmtOffset: 3600, gmtOffsetName: 'UTC+01:00', abbreviation: 'CET', tzName: 'Central European Time' }]
    },
    {
        name: 'Denmark', isoCode: 'DK', flag: '🇩🇰',
        phonecode: '45', currency: 'DKK',
        latitude: '56.00000000', longitude: '10.00000000',
        timezones: [{ zoneName: 'Europe/Copenhagen', gmtOffset: 3600, gmtOffsetName: 'UTC+01:00', abbreviation: 'CET', tzName: 'Central European Time' }]
    },
    {
        name: 'Ireland', isoCode: 'IE', flag: '🇮🇪',
        phonecode: '353', currency: 'EUR',
        latitude: '53.00000000', longitude: '-8.00000000',
        timezones: [{ zoneName: 'Europe/Dublin', gmtOffset: 0, gmtOffsetName: 'UTC±00', abbreviation: 'GMT', tzName: 'Greenwich Mean Time' }]
    }
]
