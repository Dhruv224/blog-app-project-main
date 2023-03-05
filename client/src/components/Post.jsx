import React from 'react';
import { format, compareAsc } from 'date-fns'
import { NavLink } from 'react-router-dom';

function Post({title, content, summary, createdAt, author, coverImg, _id}) {
    // console.log("Indknknkncknckdnckd")
    return (
        <div className='flex min-w-6xl max-w-4xl min-h-auto p-2 overflow-hidden gap-10 mt-12 mx-auto shadow-md shadow-gray-400 rounded-md transition-all hover:scale-[1.08] sm:hover:scale-[1.04] sm:block sm:max-h-80'>
            <div className='max-w-[43%] sm:min-w-[100%]'>
                <NavLink to={`/post/${_id}`}>
                    <img src={"http://localhost:5000/uploads/"+coverImg.split("uploads\\")[1]} alt="blogImg" className='w-[300px] h-60 rounded-md cursor-pointer bg-center border-0 shadow-lg shadow-stone-400 sm:mx-auto md:max-w-[220px]'/>
                </NavLink>
            </div>

            <div className='max-w-[60%] sm:max-w-max sm:text-start sm:mt-4'>
                <NavLink to={`/post/${_id}`}>
                    <h2 className='font-bold text-2xl capitalize sm:text-xl'>{title}</h2>
                </NavLink>

                <p className='opacity-70 text-xs my-2 sm:flex sm:gap-1 sm:justify-between'>
                    <p>    
                        By @{author.userName}
                    </p> 
                    <time className='mx-2'>
                        {format(new Date(createdAt), 'dd MMM, yyyy | HH:mm')}
                    </time>
                </p>

                <p className='opacity-80 text-justify overflow-hidden sm:text-sm'>
                    {summary.substr(0, 350)}...
                </p>
            </div>
    </div>
  )
}

export default Post