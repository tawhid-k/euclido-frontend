export default function DropDownArrow({ rotateUp }: { rotateUp: boolean }) {
    return (
        <svg
            className={` transition-transform duration-75 ${
                rotateUp ? 'rotate-180' : 'rotate-0'
            }`}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.0303 7.71967C20.3232 8.01256 20.3232 8.48744 20.0303 8.78033L12.5303 16.2803C12.2374 16.5732 11.7626 16.5732 11.4697 16.2803L3.96967 8.78033C3.67678 8.48744 3.67678 8.01256 3.96967 7.71967C4.26256 7.42678 4.73744 7.42678 5.03033 7.71967L12 14.6893L18.9697 7.71967C19.2626 7.42678 19.7374 7.42678 20.0303 7.71967Z"
                fill="#18467E"
            />
        </svg>
    )
}

export function SmallDropDownArrow({ rotateUp }: { rotateUp: boolean }) {
    return (
        <svg
            className={` transition-transform duration-75 ${
                rotateUp ? 'rotate-180' : 'rotate-0'
            }`}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.00814 13.6158C6.83062 13.4368 6.83062 13.1466 7.00814 12.9676L11.5536 8.38425C11.7311 8.20525 12.0189 8.20525 12.1964 8.38425L16.7419 12.9676C16.9194 13.1466 16.9194 13.4368 16.7419 13.6158C16.5644 13.7947 16.2766 13.7947 16.099 13.6158L11.875 9.35653L7.65093 13.6158C7.47341 13.7947 7.18565 13.7947 7.00814 13.6158Z"
                fill="#0F5F95"
            />
        </svg>
    )
}
