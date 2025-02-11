import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { Category } from "../types/categoryType";

export function useContent(modalOpen : boolean, category: Category) {
    const [data, setData] = useState([]);
    if(category === "all") {
        useEffect(() => {
            axios.get(`${BACKEND_URL}/content`, {
                headers : {
                    "token" : localStorage.getItem("token")
                }
            }).then((response : any) => {
                setData(response.data?.contents)
            })
        }, [modalOpen]);
    } else {
        useEffect(() => {
            axios.get(`${BACKEND_URL}/dashboard`, {
                params: {
                    category
                },
                headers: {
                    "token": localStorage.getItem("token")
                }
            }).then((response: any) => {
                setData(response.data?.contents)
            })
        }, [category]);
    }
    
    return data;
}