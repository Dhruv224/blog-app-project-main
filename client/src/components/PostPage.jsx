import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {NavLink, useNavigate, useParams} from 'react-router-dom';
import { format, compareAsc } from 'date-fns'
import { useUserContext } from '../context/UserContext';
import Cookies from 'universal-cookie';
import { toast, ToastContainer } from 'react-toastify';


function PostPage() {
    const {id} = useParams();
    const {userInfo} = useUserContext();
    const cookies = new Cookies();
    const navigate = useNavigate();

    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
        const getData = async () => {
            const data = await axios.get(`http://localhost:5000/post/${id}`);
            // console.log(data.data);
            setPost(data.data);
            setLoading(false);
        }

        getData();
    }, []);

    const deletePost = async (e) => {
      e.preventDefault();
      
      const {data} = await axios.delete(`http://localhost:5000/delete/${id}`, {
        headers: {
          Authorization: cookies.get('token')
        }
      });

      toast.success(data, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });


      setTimeout(() => {
        navigate('/');
      }, 2500);
    }

    if(loading){
      return (
        <div className='flex min-h-[80vh]'>
          <div className='m-auto text-6xl font-extrabold bg-gradient-to-r from-[#010125] via-[#0f0f9d] to-[#010125] text-transparent bg-clip-text'>Loading...</div>
        </div>
      )
    }

  return (

    <div>
      <div className='flex justify-center text-4xl mt-12 mb-16 font-extrabold capitalize sm:mb-8 sm:text-3xl md:mb-10'>
        "{post?.title}"
      </div>
      <div className='flex w-[60vw] justify-between mx-auto font-semibold mb-2 sm:w-[85vw] md:w-[80vw]'>
        <div className='align-middle sm:text-sm md:text-base'>
          by @{post?.author?.userName}
        </div>
        <div>
          {/* <time>
            {format(new Date(post?.createdAt), 'dd MMM, yyyy | HH:mm')}
          </time> */}
        </div>
        <div className='flex gap-5 sm:gap-2'>
        {
          userInfo?.id === post?.author?._id && (
            <>
            <NavLink to={`/edit/${post?._id}`}>
              <button class="bg-gradient-to-bl from-[#010125] via-blue-800 to-[#010125] text-white hover:bg-white hover:from-white hover:to-white hover:text-[#010125] hover:border-[#010125] border-2 duration-1000 font-bold py-1 px-3 rounded sm:text-sm sm:px-2">
                Edit post
              </button>
            </NavLink>

            <NavLink onClick={deletePost}>
              <button class="bg-gradient-to-bl from-red-600  to-red-900 text-white hover:bg-white hover:from-white hover:to-white hover:text-[#010125] hover:border-[#010125] border-2 duration-1000 font-bold py-1 px-3 rounded sm:text-sm sm:px-2">
                Delete post
              </button>
            </NavLink>
            </>
          )
        }
        </div>
      </div>
      <div>
        <img src={"http://localhost:5000/uploads/"+ post?.coverImg?.split("uploads\\")[1]} alt="thididni" className='w-[60vw] max-h-[60vh] bg-contain mx-auto shadow-2xl sm:w-[85vw] md:w-[80vw]'/>
      </div>
      <div className='flex w-[60vw] justify-between mx-auto text-justify my-28 sm:w-[85vw] sm:mt-10 md:w-[80vw] md:mt-12'>
        <div dangerouslySetInnerHTML={{__html: post?.content}}></div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default PostPage