import { BrainIcon } from "../icons/Brain"
import { TwitterIcon } from "../icons/Twitter"
import { YoutubeIcon } from "../icons/Youtube"
import { SideBarItem } from "./SideBarItem"
import { Category } from "../types/categoryType"
import ImageIcon from "../icons/ImageIcon"
import ArticleIconLarge from "../icons/ArticleIconLarge"

const SideBar = ({category, setCategory} : {category: Category, setCategory: React.Dispatch<React.SetStateAction<Category>>}) => {
    
    return (
        <div className="h-screen border-r bg-white w-72 fixed left-0 top-0">
            <h1 className="text-3xl font-bold mx-3 my-4 mb-6 flex items-center">
                <div className="mr-3 text-purple-600"><BrainIcon/></div>
                <a href="/dashboard" className="text-slate-800">Brainly</a>
            </h1>
            <SideBarItem onClick={() => {
                setCategory("tweet")
            }} icon={<TwitterIcon/>} isSelected={category === "tweet" && true} text="Tweets"></SideBarItem>
            <SideBarItem onClick={() => {
                setCategory("video")
            }} isSelected={category === "video" && true} icon={<YoutubeIcon/>} text="Videos"></SideBarItem>
            <SideBarItem onClick={() => {
                setCategory("image")
            }} isSelected={category === "image" && true} icon={<ImageIcon/>} text="Images"></SideBarItem>
            <SideBarItem onClick={() => {
                setCategory("article")
            }} isSelected={category === "article" && true} icon={<ArticleIconLarge/>} text="Articles"></SideBarItem>
        </div>
    )
}

export default SideBar