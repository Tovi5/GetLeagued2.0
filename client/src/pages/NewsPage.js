import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import './NewsPage.css';

function NewsPage() {

    const newsList = JSON.parse(localStorage.getItem('newsList'));
    const [loadNews, setLoadNews] = useState(3);


    const loadMore = () => {
        if (loadNews + 3 <= newsList.length)
            setLoadNews(loadNews + 3);
        else
            setLoadNews(newsList.length);
    }

    return (
        <div className='header'>

            <div className='background'>

                <Navbar />

                <div className='news-title-container'>

                    <div className='title-news'>Vijesti</div>

                    <div className='subtitle'>Informisite se</div>

                </div>

            </div>

            <div className='news-container'>

                <div className='news-placeholder'>

                    {newsList.slice(0, loadNews).map((news, index) => (
                        <div className='news' key={index}>
                            <div style={{ backgroundColor: "inherit", fontSize: "24px" }}>{news.title}</div>
                            <div style={{ fontSize: "16px", overflow: "auto" }}>{news.summary}</div>
                        </div>
                    ))}

                </div>

                <button className='view-more' onClick={() => loadMore()}>Pogledaj jos</button>

            </div>

        </div>
    )
}

export default NewsPage;