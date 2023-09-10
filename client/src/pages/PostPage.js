import React, { useEffect, useState } from 'react'
import './PostPage.css'
import Avatar from 'react-avatar';

const PostPage = () => {

    const [username, setUsername] = useState('');

    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [postId, setPostId] = useState('');
    const [authorUsername, setAuthorUsername] = useState('');
    const [publishedDate, setPublishedDate] = useState('');
    const [time, setTime] = useState('');
    const [summary, setSummary]=  useState('');
    const [content, setContent] = useState('');

    const [showMore, setShowMore] = useState(false);

    const [comList, setComList] = useState([]);

    const [showPost, setShowPost] = useState(false);

    const [comment, setComment] = useState('');


    useEffect(() => {

        if(localStorage.getItem('post_id'))
            setPostId(localStorage.getItem('post_id'));

        if(localStorage.getItem('post-title'))
            setTitle(localStorage.getItem('post-title'));

        if(localStorage.getItem('url'))
            setUrl(localStorage.getItem('url'));


        const getAuthor = async () => {
            try {

                const res = await fetch(`http://localhost:5000/getPostInfo/${localStorage.getItem('post_id')}`,{
                    method: 'GET'
                });

                const data = await res.json();
                setAuthorUsername(data.username);
                setPublishedDate(data.published_date.slice(0, 10))
                setTime(data.published_date.slice(11, 16));
                setSummary(data.summary);
                setContent(data.content);
        
            } catch (error) {
                console.error(error.message);
            }
        }


        const getComments = async () => {
            try {

                const res = await fetch(`http://localhost:5000/getComments/${localStorage.getItem('post_id')}`, {
                    method: 'GET'
                });

                setComList(await res.json());
                
            } catch (error) {
                console.error(error.message);
            }
        }
        
        getAuthor();
        getComments();

        if(localStorage.getItem('username'))
            setUsername(localStorage.getItem('username'));

    }, []);

    return (
        <div className='video-container'>
            <iframe style={{ border: 'none' }}
                width='100%'
                height='630px'
                src={url}
                title={title}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
            ></iframe>
            <div className='info-container'>
                <div className='video-title' onClick={() => console.log(authorUsername)}>{title}</div>
                <div className='author-container'>
                    <div className='author-avatar'><Avatar name={authorUsername} size='100%' color='transparent'/></div>
                    <span className='author'>{authorUsername}</span>
                </div>
                <div className='description-container'>
                    <div className='time'>Objavljeno {publishedDate} at {time}</div>
                    <div className='description'>
                        <div>{summary}</div>
                        <div>
                            {!showMore && content.length < 30 && <>{content}</>}
                            {!showMore && content.length >= 30 && <span className='disappearing-text'>
                                                                    {content.slice(0, 30)}
                                                                    </span>}
                            {!showMore && content.length >= 30 && <span className='view' onClick={() => setShowMore(true)}>
                                ...vise
                            </span>}

                            {showMore && <div>{content}</div>}
                            {showMore && <span className='view' style={{margin: '0'}} 
                                    onClick={() => setShowMore(false)}>Prikazi manje</span>}
                        </div>
                    </div>
                </div>
                <div className='comments'>
                    {comList.length%10 === 1 && <>{comList.length} Komentar</>}
                    {comList.length%10 !== 1 && <>{comList.length} Komentara</>}

                    {username && <div className='comment-input-cont'>
                        <div className='user-avatar'><Avatar name={username} size='100%' color='transparent'/></div>
                        <div className='move-input'>
                            <input className='comment-input' type='text' onClick={() => setShowPost(true)}
                                onChange={(e) => setComment(e.target.value)} />
                            {showPost && <div className='post-btn-cont'>
                                <button className='comment-btn' id='cancel' onClick={() => setShowPost(false)}>Otkazi</button>
                                <button className='comment-btn' id='post-comment'>Komentar</button>
                            </div>}
                        </div>
                        
                    </div>}

                    {comList.map((comm, index) => (
                        <div className='comment' key={index}>
                            {comm.content}
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default PostPage