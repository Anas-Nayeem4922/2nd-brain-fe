import { ReactElement } from "react"

interface SideBarProps {
    icon : ReactElement,
    text : string,
    onClick: () => void,
    isSelected ?: boolean
}
export const SideBarItem = ({icon, text, onClick, isSelected = false} : SideBarProps) => {
    return (
        <div className={`${isSelected && `bg-indigo-100 mx-2 px-4 text-purple-500 font-bold`} flex items-center mx-2 py-3 cursor-pointer hover:bg-indigo-100
        transition-all ease-in-out delay-100 rounded-md`} onClick={onClick}>
            <div className="mx-6">{icon}</div>
            <div>{text}</div>
        </div>
    )
}
