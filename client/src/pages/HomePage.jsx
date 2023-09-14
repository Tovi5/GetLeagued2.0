import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Navbar from "../components/Navbar";
import kayne from "../img/snow_moon_kayn.jpg";
import { FaSearch } from 'react-icons/fa';

const Container = styled.div`
  background-image: url(${kayne});
  height: 100vh;
  width: 99.05vw;
  background-size: cover;
  margin: 0;
`; //ovdje ce biti navbar i content home pagea

const Content = styled.div`
  background-color: rgb(11, 12, 16, 0.8);
  height: 100vh;
  width: 99.05vw;
  margin: 0;
  padding: 0;
`;

const Wrapper = styled.div`
  background-color: transparent;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
  gap: 50px;
`; //ovdje ce bit home page

const Naslov = styled.div`
  color: #C5C6C7;
  font-weight: 700;
  font-size: 48px;
`;

const Pretraga = styled.div`
  height: 60px;
  background-color: rgb(197, 198, 199, 0.1);
  border: 2px solid #45A29E;
  width: 45%;
  border-radius: 10px;
  backdrop-filter: blur(7px);
  padding: 0 10px 0 0;
  display: flex;
  align-items: center;
`;

const InputField = styled.input`
  padding: 0 20px;
  border: none;
  background-color: transparent;
  color: #c5c6c7;
  height: 100%;
  width: 100%;
  font-size: 18px;
  border-radius: 10px;
  
  &:focus{
    outline: none;
  }
`;

const ResultList = styled.div`
  position: relative;
  top: -30px;
  display: flex;
  flex-direction: column;
  background-color: #13151C;
  width: 46%;
  border: none;
  z-index: 5;
  border-radius: 15px;
  padding: 15px 0;
`;

const SearchResult = styled.div`
  display: flex;
  align-items: center;
  column-gap: 15px;
  color: white;
  font-size: 16px;
  border: none;
  cursor: pointer;
  padding: 10px 20px;

  &:hover {
    background-color: grey;
  }
`;

const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1F2833;
  width: 99.05vw;
  margin: 0;
  padding: 100px 0 75px 0;

  & span{
    font-size: 48px;
    color: white;
    font-weight: 700;
  }

  & hr{
    border: 1px solid #66FCF1;
    width: 20%;
    margin-top: 30px;
  }
`;

const BlogPostPlaceholder = styled.div`
  background-color: transparent;
  color:white;
  display:flex;
  flex-wrap: wrap;
  width:75%;
  margin: 50px 0;
  padding:15px;
  column-gap: 5%;
  row-gap: 10px;
`;

const Blog = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #13151C;
  width: 100%;
  height: 150px;
  border-radius: 10px;
  padding: 10px;
  margin: 0;
  color: #C5C6C7;
`;

const BlogTitle = styled.div`
  background-color: inherit;
  font-size: 24px;
`;

const BlogSummary = styled.div`
  overflow: auto;
`;

const ViewAll = styled.button`
  background-color: #66FCF1;
  font-size: 16px;
  font-weight: 800;
  padding: 20px 40px;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s ease;

  &:hover{
    background-color: #45A29E;
  }
`;

function HomePage() {


  const [postList, setPostList] = useState([]);
  const [input, setInput] = useState('');

  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  
  const [odjavljen, setOdjavljen] = useState(false);
  
  const navigate = useNavigate();


  useEffect(() => {

    const getPosts = async () => {
      try {

        let res = await fetch('http://localhost:5000/getAllPosts', {
          method: 'GET'
        });

        const data = await res.json();
        if (data.length > 0) setPostList(data.sort((a, b) => new Date(b.published_date) - new Date(a.published_date)))

      } catch (error) {
        console.error(error.message);
      }
    }

    getPosts();

    if (localStorage.getItem('username'))
      setUsername(localStorage.getItem('username'));

    if (localStorage.getItem('role'))
      setRole(localStorage.getItem('role'));
    
    if(JSON.parse(localStorage.getItem('odjavljen')))
      setOdjavljen(JSON.parse(localStorage.getItem('odjavljen')));

    localStorage.removeItem('newsList');
    localStorage.removeItem('filteredPostList');
    localStorage.removeItem('videosList');

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


  const onSearch = (input) => {
    console.log(input);

    localStorage.setItem('filteredPostList', JSON.stringify(postList.filter(post => post.title.toLowerCase().includes(input.toLowerCase()))));
    console.log(postList.filter(post => post.title.toLowerCase().includes(input.toLowerCase())));
  }

  const handleClick = (post) => {
      localStorage.setItem('post_id', post.ID);
      if(post.video_url) localStorage.setItem('url', post.video_url);
      localStorage.setItem('post-title', post.title);
  }

  return (
    <Container>
      <Content>
        <Navbar username={username} setUsername={setUsername} setRole={setRole} role={role} setOdjavljen={setOdjavljen} />
        <Wrapper>
          <Naslov>Spremni da postanete bolji?</Naslov>
          <Pretraga>
            <InputField type="text" placeholder="Pretraga" value={input} onChange={e => setInput(e.target.value)} />
            <Link to='/results' style={{
                marginLeft: '10px', marginRight: '10px', height: '1.5rem',
                width: '1.5rem', color: '#C5C6C7', cursor: 'pointer'
              }}>
              <FaSearch style={{height: '100%', width: '100%'}}
              onClick={() => onSearch(input)} />
            </Link>
          </Pretraga>
          {input && <ResultList>
            {postList.filter(post => {
              return input && post.title.toLowerCase().includes(input.toLowerCase());
            }).slice(0, 3)
              .map((news, index) => (
                <SearchResult onClick={() => setInput(news.title)} key={index}>
                  <FaSearch /> {news.title}
                </SearchResult>
              ))}
          </ResultList>}
        </Wrapper>
      </Content>
      <BlogContainer>
        <span>Najnovije vijesti</span>
        <hr />
        <BlogPostPlaceholder>

          {postList.filter(post => !post.video_url).slice(0, 3).map((news, index) => (
            <Link to={`news/${news.slug}`} onClick={() => handleClick(news)} className="link">
              <Blog key={index}>
                <BlogTitle>{news.title}</BlogTitle>
                <BlogSummary>{news.summary}</BlogSummary>
              </Blog>
            </Link>
            
          ))}

        </BlogPostPlaceholder>

        <Link onClick={() => localStorage.setItem('newsList', JSON.stringify(postList.filter(post => !post.video_url)))}
          to="/news" target="_parent"><ViewAll>Sve vijesti</ViewAll></Link>

      </BlogContainer>

      <BlogContainer style={{backgroundColor: '#13151C'}}>
        <span onClick={() => console.log(postList.filter(post => post.video_url))}>Najnoviji videi</span>
        <hr />
        <BlogPostPlaceholder>
            {postList.filter(post => post.video_url).slice(0, 3).map((video, index) => (
              <Link to={`/videos/${video.slug}`} onClick={() => handleClick(video)} target="_parent"
                      className="link">
                <Blog key={index} style={{backgroundColor: '#1F2833'}}>
                    <BlogTitle>{video.title}</BlogTitle>
                    <BlogSummary>{video.summary}</BlogSummary>
                </Blog>
              </Link>
            ))}
        </BlogPostPlaceholder>

        <Link onClick={() => localStorage.setItem('videosList', JSON.stringify(postList.filter(post => post.video_url)))}
          to="/videos" target="_parent"><ViewAll>Svi videi</ViewAll></Link>
      </BlogContainer>
    </Container>
  );
}

export default HomePage;
