'use client'

import { useEffect } from 'react'

import useProgramListStore from '@/@/context/degree-list-context'
import { getRequest } from '@/@/service/api-handler/get-manager'
import { CountryT } from '@/@/lib/types/country-types'

// TODO: Only selective countries are shown

export const countriesMinimized: CountryT[] = [
    {
        name: 'Canada',
        isoCode: 'CA',
        flag: '🇨🇦',
        phonecode: '1',
        currency: 'CAD',
        latitude: '60.00000000',
        longitude: '-95.00000000',
        timezones: [
            {
                zoneName: 'America/Atikokan',
                gmtOffset: -18000,
                gmtOffsetName: 'UTC-05:00',
                abbreviation: 'EST',
                tzName: 'Eastern Standard Time (North America)'
            },
            {
                zoneName: 'America/Blanc-Sablon',
                gmtOffset: -14400,
                gmtOffsetName: 'UTC-04:00',
                abbreviation: 'AST',
                tzName: 'Atlantic Standard Time'
            },
            {
                zoneName: 'America/Cambridge_Bay',
                gmtOffset: -25200,
                gmtOffsetName: 'UTC-07:00',
                abbreviation: 'MST',
                tzName: 'Mountain Standard Time (North America)'
            },
            {
                zoneName: 'America/Creston',
                gmtOffset: -25200,
                gmtOffsetName: 'UTC-07:00',
                abbreviation: 'MST',
                tzName: 'Mountain Standard Time (North America)'
            },
            {
                zoneName: 'America/Dawson',
                gmtOffset: -25200,
                gmtOffsetName: 'UTC-07:00',
                abbreviation: 'MST',
                tzName: 'Mountain Standard Time (North America)'
            },
            {
                zoneName: 'America/Dawson_Creek',
                gmtOffset: -25200,
                gmtOffsetName: 'UTC-07:00',
                abbreviation: 'MST',
                tzName: 'Mountain Standard Time (North America)'
            },
            {
                zoneName: 'America/Edmonton',
                gmtOffset: -25200,
                gmtOffsetName: 'UTC-07:00',
                abbreviation: 'MST',
                tzName: 'Mountain Standard Time (North America)'
            },
            {
                zoneName: 'America/Fort_Nelson',
                gmtOffset: -25200,
                gmtOffsetName: 'UTC-07:00',
                abbreviation: 'MST',
                tzName: 'Mountain Standard Time (North America)'
            },
            {
                zoneName: 'America/Glace_Bay',
                gmtOffset: -14400,
                gmtOffsetName: 'UTC-04:00',
                abbreviation: 'AST',
                tzName: 'Atlantic Standard Time'
            },
            {
                zoneName: 'America/Goose_Bay',
                gmtOffset: -14400,
                gmtOffsetName: 'UTC-04:00',
                abbreviation: 'AST',
                tzName: 'Atlantic Standard Time'
            },
            {
                zoneName: 'America/Halifax',
                gmtOffset: -14400,
                gmtOffsetName: 'UTC-04:00',
                abbreviation: 'AST',
                tzName: 'Atlantic Standard Time'
            },
            {
                zoneName: 'America/Inuvik',
                gmtOffset: -25200,
                gmtOffsetName: 'UTC-07:00',
                abbreviation: 'MST',
                tzName: 'Mountain Standard Time (North America'
            },
            {
                zoneName: 'America/Iqaluit',
                gmtOffset: -18000,
                gmtOffsetName: 'UTC-05:00',
                abbreviation: 'EST',
                tzName: 'Eastern Standard Time (North America'
            },
            {
                zoneName: 'America/Moncton',
                gmtOffset: -14400,
                gmtOffsetName: 'UTC-04:00',
                abbreviation: 'AST',
                tzName: 'Atlantic Standard Time'
            },
            {
                zoneName: 'America/Nipigon',
                gmtOffset: -18000,
                gmtOffsetName: 'UTC-05:00',
                abbreviation: 'EST',
                tzName: 'Eastern Standard Time (North America'
            },
            {
                zoneName: 'America/Pangnirtung',
                gmtOffset: -18000,
                gmtOffsetName: 'UTC-05:00',
                abbreviation: 'EST',
                tzName: 'Eastern Standard Time (North America'
            },
            {
                zoneName: 'America/Rainy_River',
                gmtOffset: -21600,
                gmtOffsetName: 'UTC-06:00',
                abbreviation: 'CST',
                tzName: 'Central Standard Time (North America'
            },
            {
                zoneName: 'America/Rankin_Inlet',
                gmtOffset: -21600,
                gmtOffsetName: 'UTC-06:00',
                abbreviation: 'CST',
                tzName: 'Central Standard Time (North America'
            },
            {
                zoneName: 'America/Regina',
                gmtOffset: -21600,
                gmtOffsetName: 'UTC-06:00',
                abbreviation: 'CST',
                tzName: 'Central Standard Time (North America'
            },
            {
                zoneName: 'America/Resolute',
                gmtOffset: -21600,
                gmtOffsetName: 'UTC-06:00',
                abbreviation: 'CST',
                tzName: 'Central Standard Time (North America'
            },
            {
                zoneName: 'America/St_Johns',
                gmtOffset: -12600,
                gmtOffsetName: 'UTC-03:30',
                abbreviation: 'NST',
                tzName: 'Newfoundland Standard Time'
            },
            {
                zoneName: 'America/Swift_Current',
                gmtOffset: -21600,
                gmtOffsetName: 'UTC-06:00',
                abbreviation: 'CST',
                tzName: 'Central Standard Time (North America'
            },
            {
                zoneName: 'America/Thunder_Bay',
                gmtOffset: -18000,
                gmtOffsetName: 'UTC-05:00',
                abbreviation: 'EST',
                tzName: 'Eastern Standard Time (North America'
            },
            {
                zoneName: 'America/Toronto',
                gmtOffset: -18000,
                gmtOffsetName: 'UTC-05:00',
                abbreviation: 'EST',
                tzName: 'Eastern Standard Time (North America'
            },
            {
                zoneName: 'America/Vancouver',
                gmtOffset: -28800,
                gmtOffsetName: 'UTC-08:00',
                abbreviation: 'PST',
                tzName: 'Pacific Standard Time (North America'
            },
            {
                zoneName: 'America/Whitehorse',
                gmtOffset: -25200,
                gmtOffsetName: 'UTC-07:00',
                abbreviation: 'MST',
                tzName: 'Mountain Standard Time (North America'
            },
            {
                zoneName: 'America/Winnipeg',
                gmtOffset: -21600,
                gmtOffsetName: 'UTC-06:00',
                abbreviation: 'CST',
                tzName: 'Central Standard Time (North America'
            },
            {
                zoneName: 'America/Yellowknife',
                gmtOffset: -25200,
                gmtOffsetName: 'UTC-07:00',
                abbreviation: 'MST',
                tzName: 'Mountain Standard Time (North America'
            }
        ]
    }
    // {
    //     name: 'Australia',
    //     isoCode: 'AU',
    //     flag: '🇦🇺',
    //     phonecode: '61',
    //     currency: 'AUD',
    //     latitude: '-27.00000000',
    //     longitude: '133.00000000',
    //     timezones: [
    //         {
    //             zoneName: 'Antarctica/Macquarie',
    //             gmtOffset: 39600,
    //             gmtOffsetName: 'UTC+11:00',
    //             abbreviation: 'MIST',
    //             tzName: 'Macquarie Island Station Time'
    //         },
    //         {
    //             zoneName: 'Australia/Adelaide',
    //             gmtOffset: 37800,
    //             gmtOffsetName: 'UTC+10:30',
    //             abbreviation: 'ACDT',
    //             tzName: 'Australian Central Daylight Saving Time'
    //         },
    //         {
    //             zoneName: 'Australia/Brisbane',
    //             gmtOffset: 36000,
    //             gmtOffsetName: 'UTC+10:00',
    //             abbreviation: 'AEST',
    //             tzName: 'Australian Eastern Standard Time'
    //         },
    //         {
    //             zoneName: 'Australia/Broken_Hill',
    //             gmtOffset: 37800,
    //             gmtOffsetName: 'UTC+10:30',
    //             abbreviation: 'ACDT',
    //             tzName: 'Australian Central Daylight Saving Time'
    //         },
    //         {
    //             zoneName: 'Australia/Currie',
    //             gmtOffset: 39600,
    //             gmtOffsetName: 'UTC+11:00',
    //             abbreviation: 'AEDT',
    //             tzName: 'Australian Eastern Daylight Saving Time'
    //         },
    //         {
    //             zoneName: 'Australia/Darwin',
    //             gmtOffset: 34200,
    //             gmtOffsetName: 'UTC+09:30',
    //             abbreviation: 'ACST',
    //             tzName: 'Australian Central Standard Time'
    //         },
    //         {
    //             zoneName: 'Australia/Eucla',
    //             gmtOffset: 31500,
    //             gmtOffsetName: 'UTC+08:45',
    //             abbreviation: 'ACWST',
    //             tzName: 'Australian Central Western Standard Time (Unofficial)'
    //         },
    //         {
    //             zoneName: 'Australia/Hobart',
    //             gmtOffset: 39600,
    //             gmtOffsetName: 'UTC+11:00',
    //             abbreviation: 'AEDT',
    //             tzName: 'Australian Eastern Daylight Saving Time'
    //         },
    //         {
    //             zoneName: 'Australia/Lindeman',
    //             gmtOffset: 36000,
    //             gmtOffsetName: 'UTC+10:00',
    //             abbreviation: 'AEST',
    //             tzName: 'Australian Eastern Standard Time'
    //         },
    //         {
    //             zoneName: 'Australia/Lord_Howe',
    //             gmtOffset: 39600,
    //             gmtOffsetName: 'UTC+11:00',
    //             abbreviation: 'LHST',
    //             tzName: 'Lord Howe Summer Time'
    //         },
    //         {
    //             zoneName: 'Australia/Melbourne',
    //             gmtOffset: 39600,
    //             gmtOffsetName: 'UTC+11:00',
    //             abbreviation: 'AEDT',
    //             tzName: 'Australian Eastern Daylight Saving Time'
    //         },
    //         {
    //             zoneName: 'Australia/Perth',
    //             gmtOffset: 28800,
    //             gmtOffsetName: 'UTC+08:00',
    //             abbreviation: 'AWST',
    //             tzName: 'Australian Western Standard Time'
    //         },
    //         {
    //             zoneName: 'Australia/Sydney',
    //             gmtOffset: 39600,
    //             gmtOffsetName: 'UTC+11:00',
    //             abbreviation: 'AEDT',
    //             tzName: 'Australian Eastern Daylight Saving Time'
    //         }
    //     ]
    // },
    // {
    //     name: 'United Kingdom',
    //     isoCode: 'GB',
    //     flag: '🇬🇧',
    //     phonecode: '44',
    //     currency: 'GBP',
    //     latitude: '54.00000000',
    //     longitude: '-2.00000000',
    //     timezones: [
    //         {
    //             zoneName: 'Europe/London',
    //             gmtOffset: 0,
    //             gmtOffsetName: 'UTC±00',
    //             abbreviation: 'GMT',
    //             tzName: 'Greenwich Mean Time'
    //         }
    //     ]
    // },
    // {
    //     name: 'United States',
    //     isoCode: 'US',
    //     flag: '🇺🇸',
    //     phonecode: '1',
    //     currency: 'USD',
    //     latitude: '38.00000000',
    //     longitude: '-97.00000000',
    //     timezones: [
    //         {
    //             zoneName: 'America/Adak',
    //             gmtOffset: -36000,
    //             gmtOffsetName: 'UTC-10:00',
    //             abbreviation: 'HST',
    //             tzName: 'Hawaii–Aleutian Standard Time'
    //         },
    //         {
    //             zoneName: 'America/Anchorage',
    //             gmtOffset: -32400,
    //             gmtOffsetName: 'UTC-09:00',
    //             abbreviation: 'AKST',
    //             tzName: 'Alaska Standard Time'
    //         },
    //         {
    //             zoneName: 'America/Boise',
    //             gmtOffset: -25200,
    //             gmtOffsetName: 'UTC-07:00',
    //             abbreviation: 'MST',
    //             tzName: 'Mountain Standard Time (North America'
    //         },
    //         {
    //             zoneName: 'America/Chicago',
    //             gmtOffset: -21600,
    //             gmtOffsetName: 'UTC-06:00',
    //             abbreviation: 'CST',
    //             tzName: 'Central Standard Time (North America'
    //         },
    //         {
    //             zoneName: 'America/Denver',
    //             gmtOffset: -25200,
    //             gmtOffsetName: 'UTC-07:00',
    //             abbreviation: 'MST',
    //             tzName: 'Mountain Standard Time (North America'
    //         },
    //         {
    //             zoneName: 'America/Detroit',
    //             gmtOffset: -18000,
    //             gmtOffsetName: 'UTC-05:00',
    //             abbreviation: 'EST',
    //             tzName: 'Eastern Standard Time (North America'
    //         },
    //         {
    //             zoneName: 'America/Indiana/Indianapolis',
    //             gmtOffset: -18000,
    //             gmtOffsetName: 'UTC-05:00',
    //             abbreviation: 'EST',
    //             tzName: 'Eastern Standard Time (North America'
    //         },
    //         {
    //             zoneName: 'America/Indiana/Knox',
    //             gmtOffset: -21600,
    //             gmtOffsetName: 'UTC-06:00',
    //             abbreviation: 'CST',
    //             tzName: 'Central Standard Time (North America'
    //         },
    //         {
    //             zoneName: 'America/Indiana/Marengo',
    //             gmtOffset: -18000,
    //             gmtOffsetName: 'UTC-05:00',
    //             abbreviation: 'EST',
    //             tzName: 'Eastern Standard Time (North America'
    //         },
    //         {
    //             zoneName: 'America/Indiana/Petersburg',
    //             gmtOffset: -18000,
    //             gmtOffsetName: 'UTC-05:00',
    //             abbreviation: 'EST',
    //             tzName: 'Eastern Standard Time (North America'
    //         },
    //         {
    //             zoneName: 'America/Indiana/Tell_City',
    //             gmtOffset: -21600,
    //             gmtOffsetName: 'UTC-06:00',
    //             abbreviation: 'CST',
    //             tzName: 'Central Standard Time (North America'
    //         },
    //         {
    //             zoneName: 'America/Indiana/Vevay',
    //             gmtOffset: -18000,
    //             gmtOffsetName: 'UTC-05:00',
    //             abbreviation: 'EST',
    //             tzName: 'Eastern Standard Time (North America'
    //         },
    //         {
    //             zoneName: 'America/Indiana/Vincennes',
    //             gmtOffset: -18000,
    //             gmtOffsetName: 'UTC-05:00',
    //             abbreviation: 'EST',
    //             tzName: 'Eastern Standard Time (North America'
    //         },
    //         {
    //             zoneName: 'America/Indiana/Winamac',
    //             gmtOffset: -18000,
    //             gmtOffsetName: 'UTC-05:00',
    //             abbreviation: 'EST',
    //             tzName: 'Eastern Standard Time (North America'
    //         },
    //         {
    //             zoneName: 'America/Juneau',
    //             gmtOffset: -32400,
    //             gmtOffsetName: 'UTC-09:00',
    //             abbreviation: 'AKST',
    //             tzName: 'Alaska Standard Time'
    //         },
    //         {
    //             zoneName: 'America/Kentucky/Louisville',
    //             gmtOffset: -18000,
    //             gmtOffsetName: 'UTC-05:00',
    //             abbreviation: 'EST',
    //             tzName: 'Eastern Standard Time (North America'
    //         },
    //         {
    //             zoneName: 'America/Kentucky/Monticello',
    //             gmtOffset: -18000,
    //             gmtOffsetName: 'UTC-05:00',
    //             abbreviation: 'EST',
    //             tzName: 'Eastern Standard Time (North America'
    //         },
    //         {
    //             zoneName: 'America/Los_Angeles',
    //             gmtOffset: -28800,
    //             gmtOffsetName: 'UTC-08:00',
    //             abbreviation: 'PST',
    //             tzName: 'Pacific Standard Time (North America'
    //         },
    //         {
    //             zoneName: 'America/Menominee',
    //             gmtOffset: -21600,
    //             gmtOffsetName: 'UTC-06:00',
    //             abbreviation: 'CST',
    //             tzName: 'Central Standard Time (North America'
    //         },
    //         {
    //             zoneName: 'America/Metlakatla',
    //             gmtOffset: -32400,
    //             gmtOffsetName: 'UTC-09:00',
    //             abbreviation: 'AKST',
    //             tzName: 'Alaska Standard Time'
    //         },
    //         {
    //             zoneName: 'America/New_York',
    //             gmtOffset: -18000,
    //             gmtOffsetName: 'UTC-05:00',
    //             abbreviation: 'EST',
    //             tzName: 'Eastern Standard Time (North America'
    //         },
    //         {
    //             zoneName: 'America/Nome',
    //             gmtOffset: -32400,
    //             gmtOffsetName: 'UTC-09:00',
    //             abbreviation: 'AKST',
    //             tzName: 'Alaska Standard Time'
    //         },
    //         {
    //             zoneName: 'America/North_Dakota/Beulah',
    //             gmtOffset: -21600,
    //             gmtOffsetName: 'UTC-06:00',
    //             abbreviation: 'CST',
    //             tzName: 'Central Standard Time (North America'
    //         },
    //         {
    //             zoneName: 'America/North_Dakota/Center',
    //             gmtOffset: -21600,
    //             gmtOffsetName: 'UTC-06:00',
    //             abbreviation: 'CST',
    //             tzName: 'Central Standard Time (North America'
    //         },
    //         {
    //             zoneName: 'America/North_Dakota/New_Salem',
    //             gmtOffset: -21600,
    //             gmtOffsetName: 'UTC-06:00',
    //             abbreviation: 'CST',
    //             tzName: 'Central Standard Time (North America'
    //         },
    //         {
    //             zoneName: 'America/Phoenix',
    //             gmtOffset: -25200,
    //             gmtOffsetName: 'UTC-07:00',
    //             abbreviation: 'MST',
    //             tzName: 'Mountain Standard Time (North America'
    //         },
    //         {
    //             zoneName: 'America/Sitka',
    //             gmtOffset: -32400,
    //             gmtOffsetName: 'UTC-09:00',
    //             abbreviation: 'AKST',
    //             tzName: 'Alaska Standard Time'
    //         },
    //         {
    //             zoneName: 'America/Yakutat',
    //             gmtOffset: -32400,
    //             gmtOffsetName: 'UTC-09:00',
    //             abbreviation: 'AKST',
    //             tzName: 'Alaska Standard Time'
    //         },
    //         {
    //             zoneName: 'Pacific/Honolulu',
    //             gmtOffset: -36000,
    //             gmtOffsetName: 'UTC-10:00',
    //             abbreviation: 'HST',
    //             tzName: 'Hawaii–Aleutian Standard Time'
    //         }
    //     ]
    // }
]

export function useLoadFilters() {
    const setFilters = useProgramListStore((state) => state.setFilters)
    useEffect(() => {
        const fetchFilters = async () => {
            const resDiscipline = getRequest('discipline', true)
            const [disciplineData] = await Promise.all([resDiscipline])
            return [countriesMinimized, disciplineData.result]
        }
        const loadFilters = async () => {
            const [country, discipline] = await fetchFilters()
            setFilters({
                countries: country,
                disciplines: discipline
            })
        }
        loadFilters()
    }, [])
}
