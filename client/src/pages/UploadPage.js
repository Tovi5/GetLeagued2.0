import React, { useEffect, useState } from 'react'
import './UploadPage.css'
import { useNavigate } from 'react-router-dom';

const UploadPage = () => {

    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [id, setId] = useState('');
    const [odjavljen, setOdjavljen] = useState(false);

    const navigate = useNavigate();

    const [uploadNews, setUploadNews] = useState(true);
    const [uploadVideo, setUploadVideo] = useState(false);

    const [videoUrl, setVideoUrl] = useState('');
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');

    const [postClicked, setPostClicked] = useState(false);
    const [emptyTitle, setEmptyTitle] = useState(false);
    const [emptySummary, setEmptySummary] = useState(false);
    const [emptyContent, setEmptyContent] = useState(false);


    useEffect(() => {

        if (localStorage.getItem('username'))
            setUsername(localStorage.getItem('username'));

        if (localStorage.getItem('role'))
            setRole(localStorage.getItem('role'));

        if (localStorage.getItem('id'))
            setId(localStorage.getItem('id'));

        if (JSON.parse(localStorage.getItem('odjavljen')))
            setOdjavljen(JSON.parse(localStorage.getItem('odjavljen')));

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


    const makeVideoUrl = (yt_url) => {
        return yt_url.replace('watch?v=', 'embed/')
    }
  
    const makeSlug = (title) => {
      let words = title.toLowerCase().split(/[^A-Za-z]/);
      let slug = words[0];
      for(let i = 1; i < words.length; i++){
        if(words[i] === '')
            continue;

        slug += '-';
        slug += words[i];
      }
  
      return slug;
    }

    const reset = () => {
        setPostClicked(false);
        setEmptyTitle(false);
        setEmptySummary(false);
        setEmptyContent(false);
    }

    const handlePost = async (e) => {
        e.preventDefault();

        reset();

        setPostClicked(true);

        if(!title){
            setEmptyTitle(true);
        }
        if(!summary){
            setEmptySummary(true);
        }
        if(!content && uploadNews){
            setEmptyContent(true);
        }

        else if(title && summary){
            await fetch('http://localhost:5000/insertPost', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'video_url': videoUrl ? makeVideoUrl(videoUrl) : null,
                'title': title,
                'meta-title': null,
                'slug': makeSlug(title),
                'summary': summary,
                'updated_date': new Date(),
                'published_date': new Date(),
                'content': content ? content : null,
                'author_id': id,
                'image_url': null
                })
            });

            navigate('/');
        }
        
    }

    return (
        <div className='upload-img'>
            <div className='upload-background'>
                <div className='upload-container'>
                    <div className='choice-container'>
                        Unesi:
                        <button className='upload-choice' id='news-choice'
                        onClick={() => {
                            if(!uploadNews){
                                setUploadNews(true); setUploadVideo(false); reset()
                            }}}>Vijest</button>
                        <button className='upload-choice' id='video-choice'
                        onClick={() => {
                            if(!uploadVideo){
                                setUploadNews(false); setUploadVideo(true); reset()
                            }}}>Video</button>
                    </div>
                    <span id='span-underline' />
                    
                    {uploadVideo && <input type='text' className='input-data' placeholder='Unesite yt url...'
                    onChange={(e) => setVideoUrl(e.target.value)} />}

                    {uploadVideo && !videoUrl && postClicked && <div className='error-post'>Morate unijeti url yt videa</div>}

                    <input type='text' className='input-data' placeholder='Unesite naslov...'
                    onChange={(e) => setTitle(e.target.value)} />

                    {!title && postClicked && <div className='error-post'>Morate unijeti naslov.</div>}
                    {title.length > 75 && <div className='error-post'>Naslov ne moze biti duzi od 75 karatkera.</div>}

                    <input type='text' className='input-data' placeholder='Unesite sazetak...'
                    onChange={(e) => setSummary(e.target.value)} />

                    {!summary && postClicked && <div className='error-post'>Morate unijeti sazetak.</div>}
                    {summary.length > 255 && <div className='error-post'>Sazetak ne moze biti duzi od 255 karatkera.</div>}

                    <textarea className='input-data' rows={10} placeholder='Unesite sadrzaj...'
                    onChange={(e) => setContent(e.target.value)} />

                    {uploadNews && !content && postClicked && <div className='error-post'>Morate unijeti sadrzaj.</div>}

                    <button className='upload-btn' onClick={(e) => handlePost(e)}>Objavi</button>
                </div>
            </div>
        </div>
    )
}

export default UploadPage;