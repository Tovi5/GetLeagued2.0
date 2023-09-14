import React, { useEffect, useState } from 'react';
import './NewsPage.css';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const NewsPage = () => {

    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [userId, setUserId] = useState('');
    const [odjavljen, setOdjavljen] = useState(false);
    const navigate = useNavigate();

    const [postId, setPostId] = useState('');
    const [title, setTitle] = useState('');

    const [authorUsername, setAuthorUsername] = useState('');
    const [publishedDate, setPublishedDate] = useState('');
    const [time, setTime] = useState('');
    const [summary, setSummary]=  useState('');
    const [content, setContent] = useState('');

    useEffect(() => {

        if(localStorage.getItem('post_id'))
            setPostId(localStorage.getItem('post_id'));

        if(localStorage.getItem('post-title'))
            setTitle(localStorage.getItem('post-title'));



        const getPostInfo = async () => {
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

        getPostInfo();

        if (localStorage.getItem('username'))
            setUsername(localStorage.getItem('username'));

        if (localStorage.getItem('role'))
            setRole(localStorage.getItem('role'));

        if (JSON.parse(localStorage.getItem('odjavljen')))
            setOdjavljen(JSON.parse(localStorage.getItem('odjavljen')));

        if (localStorage.getItem('id'))
            setUserId(localStorage.getItem('id'));

    }, []);

    useEffect(() => {

        if (username)
            localStorage.setItem('username', username);
        else
            localStorage.removeItem('username');

        if (role)
            localStorage.setItem('role', role);
        else
            localStorage.removeItem('role');

        if (!odjavljen)
            localStorage.setItem('odjavljen', JSON.stringify(odjavljen));
        else {
            localStorage.removeItem('odjavljen');
            navigate('/');
        }

    }, [username]);


    return (
        <div className='news-container'>
            <div className='navbar-container'>
                <div style={{backgroundColor: 'rgb(11, 12, 16, 0.8)', height: '500px'}}>
                    <Navbar username={username} setUsername={setUsername} setRole={setRole} role={role} setOdjavljen={setOdjavljen} />
                </div>
            </div>

            <div className='news-content'>
                <div className='title-summary'>
                    <h1>{title}</h1>
                    <span>{summary}</span>
                    <div className='date-author'>
                        <span className='date-published'>
                            {publishedDate} {time}
                        </span>
                        <span className='news-author'>
                                AUTOR <span className='author-username'>{authorUsername.toUpperCase()}</span>
                        </span>
                    </div>
                </div>
                
                <div className='single-news-content'>
                    {content}
                </div>
            </div>
        </div>
    )
}

export default NewsPage