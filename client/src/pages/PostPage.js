import React, { useEffect, useState } from 'react'
import './PostPage.css'

const PostPage = () => {

    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');


    useEffect(() => {

        if(localStorage.getItem('post-title'))
            setTitle(localStorage.getItem('post-title'));

        if(localStorage.getItem('url'))
            setUrl(localStorage.getItem('url'));

    }, []);

    return (
        <div className='video-container'>
            <iframe style={{ border: 'none' }}
                width='100%'
                height='650px'
                src={url}
                title={title}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
            ></iframe>
            <div className='video-title'>{title}</div>
        </div>
    )
}

export default PostPage