import axios from 'axios'
import { DeleteIcon } from '../icons/Delete'
import { ShareIcon } from '../icons/Share'
import { BACKEND_URL } from '../config'
import { ArticleIcon } from '../icons/Article'
import { VideoIcon } from '../icons/Video'
import { ImageIcon } from '../icons/Image'
import { LinkSlashIcon } from '../icons/LinkSlash'
import { Category } from '../types/categoryType'
import { TwitterIcon } from '../icons/Twitter'

interface CardProps {
    title: string;
    link: string;
    type: Category;
    description: string,
    contentId: string;
}

const iconClasses: Record<Category, JSX.Element | undefined> = {
    article: <ArticleIcon />,
    video: <VideoIcon />,
    image: <ImageIcon />,
    tweet: <TwitterIcon />,
    all: undefined
};

const Card = ({ title, link, type, contentId, description }: CardProps) => {
    const deleteContent = async () => {
        await axios.delete(`${BACKEND_URL}/content/${contentId}`, {
            headers: { token: localStorage.getItem('token') }
        });
        window.location.reload();
    };

    const renderContent = () => {
        if (type === 'video') {
            if (link.includes('watch?v=')) {
                return <iframe className='w-full h-72 rounded-md' src={link.replace('watch?v=', 'embed/')} frameBorder='0' allowFullScreen></iframe>;
            } else if (link.includes('shorts/')) {
                return <iframe className='w-full h-72 rounded-md' src={link.replace('shorts/', 'embed/')} frameBorder='0' allowFullScreen></iframe>;
            } else if (link.includes('instagram.com')) {
                return (
                    <a href={link} target="_blank" rel="noopener noreferrer" className="w-full h-72 rounded-md bg-gray-200 flex items-center justify-center text-blue-500">
                        {description}
                    </a>
                );
            }
        }
        if (type === 'tweet') {
            if(link.includes("x.com")) {
                return <blockquote className="twitter-tweet">
                    <a href={link.replace("x", "twitter")}></a> 
                </blockquote>
            }
        }
        if (type === 'image') {
            return <a href={`/${link}`}><img src={link} className='h-72 rounded-md cursor-pointer' alt={description} /></a>;
        }
        if (type === 'article') {
            return <div className='flex justify-center items-center min-h-full'>
                <a href={link} target='_blank' rel='noopener noreferrer' className='text-blue-500 underline'>{description}</a>
            </div>;
        }
        return <div className='flex justify-center items-center bg-slate-200 h-72 w-60 rounded-md'><LinkSlashIcon /></div>;
    };

    return (
        <div className='p-8 bg-white rounded-md shadow-md max-w-80 border h-96 overflow-y-scroll'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center'>
                    <div className='text-gray-500'>{iconClasses[type] || <LinkSlashIcon />}</div>
                    <h1 className='ml-2 mr-10 font-semibold'>{title}</h1>
                </div>
                <div className='flex items-center text-gray-400'>
                    <div className='pr-4 cursor-pointer'><ShareIcon /></div>
                    <div className='cursor-pointer' onClick={deleteContent}><DeleteIcon /></div>
                </div>
            </div>
            <div className='mt-4'>{renderContent()}</div>
        </div>
    );
};

export default Card;
