import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import './PostsPage.css';
import { Link, useNavigate } from 'react-router-dom';

function NewsPage() {

    //const newsList = JSON.parse(localStorage.getItem('newsList'));
    const [postList, setPostList] = useState([]);
    const [loadNews, setLoadNews] = useState(3);

    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');

    const [odjavljen, setOdjavljen] = useState(false);

    const [postType, setPostType] = useState()

    const navigate = useNavigate();


    useEffect(() => {
        
        if (localStorage.getItem('username'))
            setUsername(localStorage.getItem('username'));

        if (localStorage.getItem('role'))
            setRole(localStorage.getItem('role'));

        if(JSON.parse(localStorage.getItem('odjavljen')))
            setOdjavljen(JSON.parse(localStorage.getItem('odjavljen')));

        if(JSON.parse(localStorage.getItem('newsList'))) {
            setPostList(JSON.parse(localStorage.getItem('newsList')));
            setPostType('news');
        }
        else{
            setPostList(JSON.parse(localStorage.getItem('videosList')));
            setPostType('video');
        }
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


    const loadMore = () => {
        if (loadNews + 3 <= postList.length)
            setLoadNews(loadNews + 3);
        else
            setLoadNews(postList.length);
    }

    const handleClick = (post) => {
        localStorage.setItem('post_id', post.ID);
        localStorage.setItem('url', post.video_url);
        localStorage.setItem('post-title', post.title);
    }

    return (
        <div className='header'>

            <div className='background'>

                <Navbar username={username} setUsername={setUsername} setRole={setRole} setOdjavljen={setOdjavljen} />

                <div className='news-title-container'>

                    {postType === 'news' && <div className='title-news'>Vijesti</div>}
                    {postType === 'video' && <div className='title-news'>Video sadrzaj</div>}

                    {postType === 'news' && <div className='subtitle'>Informisite se</div>}
                    {postType === 'video' && <div className='subtitle'>Ucite od najboljih</div>}

                </div>

            </div>

            <div className='posts-container'>

                <div className='posts-placeholder'>

                    {postList.slice(0, loadNews).map((post, index) => (
                        <>
                        {postType === 'news' && <div className='post' key={index}>
                            <div style={{ backgroundColor: "inherit", fontSize: "24px" }}>{post.title}</div>
                            <div style={{ fontSize: "16px", overflow: "auto" }}>{post.summary}</div>
                        </div>}
                        {postType === 'video' && <Link to={`/video/${post.slug}`} onClick={() => handleClick(post)}
                                                    className='link'>
                            <div className='post' key={index} style={{width: '100%'}}>
                                <div style={{ backgroundColor: "inherit", fontSize: "24px" }}>{post.title}</div>
                                <div style={{ fontSize: "16px", overflow: "auto" }}>{post.summary}</div>
                            </div>
                        </Link>}
                        </>
                    ))}

                </div>

                <button className='view-more' onClick={() => loadMore()}>Pogledaj jos</button>

            </div>

        </div>
    )
}

export default NewsPage;