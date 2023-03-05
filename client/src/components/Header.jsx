import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useUserContext } from '../context/UserContext';
import {GiHamburgerMenu} from 'react-icons/gi';
import {AiOutlineClose} from 'react-icons/ai';

const cookies = new Cookies();

function Header() {
    const [open, setOpen] = useState(false);

    const {userInfo, setUserInfo} = useUserContext();

    const logout = () => {
        cookies.remove('token');
        setUserInfo(null);
        window.location.reload();
    }

    useEffect(() => {
        const fetchData = async () => {
                const {data} = await axios.get('http://localhost:5000/profile',{
                    headers:{
                        Authorization : cookies.get('token')
                    }
            });
            setUserInfo(data);
        }
        fetchData();
    }, []);

    const userName = userInfo?.userName;
    
  return (
    <div className={`w-full bg-gradient-to-r from-[#010125] via-[#0f0f9d] to-[#010125] h-16 text-white flex justify-between px-24 rounded-bl-2xl rounded-br-2xl drop-shadow-xl mb-5 sm:px-10 sm:flex sm:flex-col transition-all duration-[1s] ${open ? 'sm:h-[60vh] sm:overflow-hidden' : 'sm:h-[10vh]'} sm:bg-gradient-to-br md:px-12`}>
        <div className='text-3xl my-auto font-bold cursor-pointer hover:opacity-90 sm:text-4xl sm:flex justify-between sm:mt-3 md:text-2xl'>
            <NavLink to='/'>
                Bloggers
            </NavLink>
            <div className={`hidden my-auto text-white ${open ? 'sm:block' : 'sm:block'}`} onClick={() => setOpen(!open)}>
                {
                    !open ? <GiHamburgerMenu /> : <AiOutlineClose className={`text-5xl font-extrabold`}/>
                }
            </div>
        </div>
        <ul className={`my-auto flex justify-between gap-16 font-medium text-xl transition-all ${open ? 'sm:text-center sm:mt-0' : 'sm:overflow-hidden sm:text-center sm:mt-3'} sm:gap-10 sm:text-xl sm:flex-col md:gap-9 md:text-xl`}>
            <NavLink to='/' onClick={() => setOpen(!open)}>
                <li className='cursor-pointer hover:opacity-90'>Home</li>
            </NavLink>
            {/* <NavLink to='/about'>
                <li className='cursor-pointer hover:opacity-90'>About</li>
            </NavLink> */}

            {
                userName ? (
                    <>
                        {/* <li className='cursor-pointer hover:opacity-90 capitalize'>{userName}</li> */}
                        <NavLink to='/createnewpost' onClick={() => setOpen(!open)}>
                            <li className='cursor-pointer hover:opacity-90'>Add Post</li>
                        </NavLink>
                        <li className='cursor-pointer hover:opacity-90' onClick={logout}>Logout</li>
                    </>
                ) : (
                    <>
                        <NavLink to='/login'onClick={() => setOpen(!open)}>
                                <li className='cursor-pointer hover:opacity-90'>Login</li>
                            </NavLink>
                            
                        {/* <NavLink to='/register'>
                                <li className='cursor-pointer hover:opacity-90'>Register</li>
                        </NavLink> */}
                    </>
                )
            }
        </ul>
    </div>
  )
}

export default Header