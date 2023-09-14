import React, { useEffect, useState } from 'react';
import './SearchPage.css';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {FaRegSadTear} from 'react-icons/fa'

const SearchPage = () => {

    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [odjavljen, setOdjavljen] = useState(false);
    const [postList, setPostList] = useState([]);

    const navigate = useNavigate();

    const [loadNews, setLoadNews] = useState(3);
    const [loadVideos, setLoadVideos] = useState(3);


    useEffect(() => {

        if (localStorage.getItem('username'))
            setUsername(localStorage.getItem('username'));

        if (localStorage.getItem('role'))
            setRole(localStorage.getItem('role'));

        if(JSON.parse(localStorage.getItem('odjavljen')))
            setOdjavljen(JSON.parse(localStorage.getItem('odjavljen')));

        if(JSON.parse(localStorage.getItem('filteredPostList')))
            setPostList(JSON.parse(localStorage.getItem('filteredPostList')));

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

        if(!odjavljen)
            localStorage.setItem('odjavljen', JSON.stringify(odjavljen));
        else{
            localStorage.removeItem('odjavljen');
            navigate('/');
        }

    }, [username]);


    const handleClick = (post) => {
        localStorage.setItem('post_id', post.ID);
        if(post.video_url) localStorage.setItem('url', post.video_url);
        localStorage.setItem('post-title', post.title);
    }

    const loadMoreNews = (list) => {
        if (loadNews + 3 <= list.length)
            setLoadNews(loadNews + 3);
        else
            setLoadNews(list.length);
    }

    const loadMoreVideos = (list) => {
        if (loadVideos + 3 <= list.length)
            setLoadVideos(loadVideos + 3);
        else
            setLoadVideos(list.length);
    }

    return (
        <div className='results-container'>
            <div className='search-header'>
                <div style={{backgroundColor: 'rgb(11, 12, 16, 0.75)', height: '100%'}}>
                    <Navbar username={username} setUsername={setUsername} setRole={setRole} role={role} setOdjavljen={setOdjavljen} />
                </div>
            </div>

            <div className='results-content'>
                <div className='search-news'>
                    <h1 className='search-title'>Vijest</h1>
                    <span className='search-title' id='search-underline' />
                    <div className='search-post'>
                        {postList.filter(post => !post.video_url).length > 0 && postList.filter(post => !post.video_url).slice(0, loadNews).map((news, index) => (
                            <Link to={`/news/${news.slug}`} onClick={() => handleClick(news)} target="_parent"
                                        className="link">
                                <div className='search-article' key={index}>
                                    <div className='search-article-title'>{news.title}</div>
                                    <div className='search-article-summary'>{news.summary}</div>
                                </div>
                            </Link>
                        ))}
                            
                        {postList.filter(post => !post.video_url).length == 0 && 
                        <div className='no-items-found'>Nazalost, nismo nasli trazeni artikal.<FaRegSadTear /></div>}
                    </div>
                    {postList.filter(post => !post.video_url).length > 0 && loadNews != postList.filter(post => !post.video_url).length &&
                    <button className='view-more-posts' onClick={() => loadMoreNews(postList.filter(post => !post.video_url))}>Pogledaj jos</button>}
                </div>
                

                <div className='search-video'>
                    <h1 className='search-title'>Video</h1>
                    <span className='search-title' id='search-underline' />
                    <div className='search-post'>
                        {postList.filter(post => post.video_url).length > 0 && postList.filter(post => post.video_url).slice(0, loadVideos).map((video, index) => (
                            <Link to={`/videos/${video.slug}`} onClick={() => handleClick(video)} target="_parent"
                                        className="link">
                                <div className='search-article' key={index} style={{backgroundColor: '#1F2833'}}>
                                    <div className='search-article-title'>{video.title}</div>
                                    <div className='search-article-summary'>{video.summary}</div>
                                </div>
                            </Link>
                        ))}
                            
                        {postList.filter(post => post.video_url).length == 0 && 
                        <div className='no-items-found'>Nazalost, nismo nasli trazeni artikal.<FaRegSadTear /></div>}
                    </div>
                    {postList.filter(post => post.video_url).length > 0 && loadVideos < postList.filter(post => post.video_url).length &&
                    <button className='view-more-posts' onClick={() => loadMoreVideos(postList.filter(post => post.video_url))}>Pogledaj jos</button>}
                </div>
                
            </div>
        </div>
    )
}

export default SearchPage