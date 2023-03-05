import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Post from './Post'

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getAllPosts = async () => {
      const {data} = await axios.get('http://localhost:5000/getAllPost');
      setPosts(data);
      setLoading(false);
    }

    getAllPosts();
  }, []);

  if(loading){
    return (
      <div className='flex min-h-[80vh]'>
        <div className='m-auto text-6xl font-extrabold bg-gradient-to-r from-[#010125] via-[#0f0f9d] to-[#010125] text-transparent bg-clip-text'>Loading...</div>
      </div>
    )
  }

  if(posts.length == 0){
    return (
      <div className='flex min-h-[80vh]'>
        <div className='m-auto text-6xl font-extrabold bg-gradient-to-r from-[#010125] via-[#0f0f9d] to-[#010125] text-transparent bg-clip-text'>No Post Yet!</div>
      </div>
    )
  }

  return (
    <div className='mb-32 sm:mx-8 md:mx-10'>
        {
          posts.map((post, index) => <Post {...post} key={index}/>)
        }
    </div>
  )
}

export default Home