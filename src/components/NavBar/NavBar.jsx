import React, { useState } from 'react'
import Bars from '../../assets/Icons/Bars';
import {BrowserRouter as Router , Routes , Route , Link} from 'react-router-dom'
import PrimeraDivison from '../PrimeraDivison/PrimeraDivison';
const NavBar = () => {
    const [isOpen , setIsOpen] = useState(false)

    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

  return (
    <div className={`bg-lime-200 flex transition-all duration-500 h-screen w-[200px] py-2 ${!isOpen ? 'w-[60px]' : 'w-[200px]'}`}>
        <Router>
            <div className='flex-1'>
                {/* button toggle bar */}
                <div className='transition-all duration-500'>
                    <button className={`flex transition-all duration-500 bg-lime-500 rounded-xl py-1 px-2 ${isOpen ? 'ml-[150px]' : 'ml-[5px]'}`} onClick={toggleNav}>
                        <Bars/>
                    </button>
                </div>
                {/* Leagues */}
                <div className='transition-all duration-500 mt-5'>
                    <Link to={'/PrimeraDivison'} className='inline-flex  items-center mt-1'>
                        <img src="assets/Leagues/PD.png" alt="" className={`ml-1 ${isOpen ? 'w-[50px]' : 'w-[50px]'}`} />
                        {
                            isOpen && <span className='font-semibold ml-1'>Primera Division</span>
                        }
                    </Link>
                    <Link to={'/'} className='inline-flex items-center mt-1'>
                        <img src="assets/Leagues/PL.png" alt="" className={`ml-1 ${isOpen ? 'w-[50px]' : 'w-[50px]'}`} />
                        {
                            isOpen && <span className='font-semibold ml-1'>Premier League</span>
                        }
                    </Link>
                    <Link to={'/'} className='inline-flex items-center mt-1'>
                        <img src="assets/Leagues/BL1.png" alt="" className={`ml-1 ${isOpen ? 'w-[50px]' : 'w-[50px]'}`} />
                        {
                            isOpen && <span className='font-semibold ml-1'>Bundesliga</span>
                        }
                    </Link>
                    <Link to={'/'} className='inline-flex items-center mt-1'>
                        <img src="assets/Leagues/SA.png" alt="" className={`ml-1 ${isOpen ? 'w-[50px]' : 'w-[50px]'}`} />
                        {
                            isOpen && <span className='font-semibold ml-1'>Serie A</span>
                        }
                    </Link>
                    <Link to={'/'} className='inline-flex items-center mt-1'>
                        <img src="assets/Leagues/FL1.png" alt="" className={`ml-1 ${isOpen ? 'w-[50px]' : 'w-[50px]'}`} />
                        {
                            isOpen && <span className='font-semibold ml-1'>Ligue 1</span>
                        }
                    </Link>
                </div>
            </div>
            <div className='w-1/2 ml-[100px]'>
                <Routes>
                    <Route path='/PrimeraDivison' element={<PrimeraDivison/>} />
                </Routes>
            </div>
        </Router>
    </div>
  )
}

export default NavBar