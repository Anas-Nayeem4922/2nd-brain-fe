import { useRef, useState } from "react"
import { CrossIcon } from "../icons/Cross"
import Button from "./Button"
import Input from "./Input"
import { BACKEND_URL } from "../config"
import axios from "axios"
import { Capsule } from "./Capsule"
import { Category } from "../types/categoryType"


const Modal = ({open, onClose} : {open : boolean, onClose : (x : boolean) => void}) => {
    function close () {
        onClose(false)
    }
    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const [type, setType] = useState<Category>();
    async function addContent() { 
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        const description = descriptionRef.current?.value;
        await axios.post(`${BACKEND_URL}/content`, {
            link,
            type,
            title,
            description
        }, {
            headers : {
                "token" : localStorage.getItem("token")
            }
        });
        close();
        window.location.reload();
    }
    return (
        <> 
            {open && (
                <div className="z-10 w-screen h-screen fixed top-0 left-0 bg-purple-200 bg-opacity-70 flex justify-center items-center">
                    <div className="z-20 bg-white p-8 rounded-md">
                        <div className="flex justify-between cursor-pointer" onClick={close}>
                            <p className="text-2xl font-bold">Add your content</p>
                            <CrossIcon />
                        </div>
                        <div>
                            <Input label="Enter your title" inputRef={titleRef} type="text" placeholder="Enter your title" />
                            <Input label="Enter your link" inputRef={linkRef} type="text" placeholder="Enter your link" />
                            <div className="flex flex-col justify-center">
                                <label className="mt-6 font-semibold">Enter your description</label>
                                <textarea placeholder="Enter your description (optional)..." rows={5} cols={20} className="px-4 py-2 border rounded-md my-2" ref={descriptionRef}></textarea>
                            </div>
                        </div>
                        <div className="flex flex-col mt-2 mb-6">
                            <div className="text-gray-800 mt-3 font-semibold">Choose type</div>
                            <div className="flex justify-between gap-4 my-4 items-center">
                                <Capsule onClick={() => {
                                    setType("video")
                                }} text="video" variant={`${type === "video" ? `primary` : `secondary`}`}/>
                                <Capsule onClick={() => {
                                    setType("article")
                                }} text="article" variant={`${type === "article" ? `primary` : `secondary`}`}/>
                                <Capsule onClick={() => {
                                    setType("image")
                                }} text="image" variant={`${type === "image" ? `primary` : `secondary`}`}/>
                                <Capsule onClick={() => {
                                    setType("tweet")
                                }} text="tweet" variant={`${type === "tweet" ? `primary` : `secondary`}`}/>
                            </div>
                            
                        </div>
                        <div className="my-4 flex justify-center">
                            <Button fullWidth={true} onClick={addContent} variant="primary" text="Submit" />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal