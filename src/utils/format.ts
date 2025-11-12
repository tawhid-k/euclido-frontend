
export const dateFormat = (timestamp: number | string): string =>
    new Date(Number(timestamp)).toLocaleString('en-UK', {
        month: 'long',
        day: '2-digit',
        year: 'numeric'
    })

    export const dateFormat2 = (timestamp: string | number): string => {
        const date = typeof timestamp === 'string' ? new Date(timestamp) : new Date(Number(timestamp));
        return date.toLocaleString('en-UK', {
            month: 'long',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

export const tuitionFeeFormat = (fee: number): string =>
    Math.ceil(fee).toLocaleString('en-us')

export const Capitalize = (value: string) => {
    if (!value) {
        return ''
    }
    return value
        .split(/[_-]/)
        .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(' ')
}



export const getTimeAgo = (createdAt: string): string => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffInWeeks = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24 * 7));
    
    if (diffInWeeks < 1) {
        const diffInDays = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
        return diffInDays <= 1 ? 'Posted today' : `Posted ${diffInDays} days ago`;
    }
    
    return diffInWeeks === 1 ? 'Posted a week ago' : `Posted ${diffInWeeks} weeks ago`;
};


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export function getUniversityLogoUrl(fileName: string) {
    return `${BASE_URL}/asset/university-logo/${fileName}`
}
