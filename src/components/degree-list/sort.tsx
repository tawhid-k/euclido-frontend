import { shadow } from '@/@/lib/styles'
import { sortSelected, sortUnselected } from './icons'

export function SortOptions() {
    const ulStyle =
        'flex flex-col gap-2 font-medium text-foreground text-sm pl-4'
    const liStyle = 'flex justify-between items-center text-xs'
    const headingStyle = 'font-semibold text-button-primary text-sm'
    return (
        <></>
        // <div
        //     className={`z-30 absolute w-[320px] flex flex-col gap-3 top-12 right-0 rounded-lg p-8 bg-white ${shadow}`}
        // >
        //     <h3 className={headingStyle}>Application Deadline</h3>
        //     <ul className={ulStyle}>
        //         <li className={liStyle}>
        //             Ascending <button>{sortUnselected}</button>
        //         </li>
        //         <li className={liStyle}>
        //             Descending <button>{sortUnselected}</button>
        //         </li>
        //     </ul>
        //     <h3 className={headingStyle}>Tuition Fee</h3>
        //     <ul className={ulStyle}>
        //         <li className={liStyle}>
        //             Low To High <button>{sortUnselected}</button>
        //         </li>
        //         <li className={liStyle}>
        //             High To Low <button>{sortUnselected}</button>
        //         </li>
        //     </ul>
        //     <h3 className={headingStyle}>Application Fee</h3>
        //     <ul className={ulStyle}>
        //         <li className={liStyle}>
        //             Low To High <button>{sortUnselected}</button>
        //         </li>
        //         <li className={liStyle}>
        //             High To Low <button>{sortUnselected}</button>
        //         </li>
        //     </ul>
        //     <h3 className={headingStyle}>University Ranking</h3>
        //     <ul className={ulStyle}>
        //         <li className={liStyle}>
        //             Lowest To Highest <button>{sortUnselected}</button>
        //         </li>
        //         <li className={liStyle}>
        //             Highest To Lowest <button>{sortUnselected}</button>
        //         </li>
        //     </ul>
        // </div>
    )
}
