import React, { useState } from 'react'
import Bars from '../../assets/Icons/Bars';
import {BrowserRouter as Router , Routes , Route , Link} from 'react-router-dom'
import PrimeraDivison from '../PrimeraDivison/PrimeraDivison';
import PremierLeague from '../PremierLeague/PremierLeague';
import Ligue1 from '../Ligue1/Ligue1';
import Bundesliga from '../Bundesliga/Bundesliga';
import SerieA from '../SerieA/SerieA';
import TodayMatches from '../TodayMatches/TodayMatches';
const NavBar = () => {
    const [isOpen , setIsOpen] = useState(false)

    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

  return (
    <div  className={`bg-lime-200 flex transition-all duration-500 h-screen w-[200px] py-2 ${!isOpen ? 'w-[60px]' : 'w-[200px]'}`}>
        <Router>
            <div className='w-full'>
                {/* button toggle bar */}
                <div className='transition-all duration-500'>
                    <button className={`flex transition-all duration-500 bg-lime-500 rounded-xl py-1 px-2 ${isOpen ? 'ml-[150px]' : 'ml-[5px]'}`} onClick={toggleNav}>
                        <Bars/>
                    </button>
                </div>
                {/* Leagues */}
                <div className='transition-all duration-500 mt-5'>
                    <Link to={'/'} className='inline-flex  items-center mt-1'>
                        <span className='ml-3 text-2xl'>⚽</span>
                        {
                            isOpen && <span className='font-semibold ml-1'>Today Matches</span>
                        }
                    </Link>
                    <Link to={'/PrimeraDivison'} className='inline-flex  items-center mt-1'>
                        <img src="assets/Leagues/PD.png" alt="" className={`ml-1 ${isOpen ? 'w-[50px]' : 'w-[50px]'}`} />
                        {
                            isOpen && <span className='font-semibold ml-1'>Primera Division</span>
                        }
                    </Link>
                    <Link to={'/PremierLeague'} className='inline-flex items-center mt-1'>
                        <img src="assets/Leagues/PL.png" alt="" className={`ml-1 ${isOpen ? 'w-[50px]' : 'w-[50px]'}`} />
                        {
                            isOpen && <span className='font-semibold ml-1'>Premier League</span>
                        }
                    </Link>
                    <Link to={'/Bundesliga'} className='inline-flex items-center mt-1'>
                        <img src="assets/Leagues/BL1.png" alt="" className={`ml-1 ${isOpen ? 'w-[50px]' : 'w-[50px]'}`} />
                        {
                            isOpen && <span className='font-semibold ml-1'>Bundesliga</span>
                        }
                    </Link>
                    <Link to={'/SerieA'} className='inline-flex items-center mt-1'>
                        <img src="assets/Leagues/SA.png" alt="" className={`ml-1 ${isOpen ? 'w-[50px]' : 'w-[50px]'}`} />
                        {
                            isOpen && <span className='font-semibold ml-1'>Serie A</span>
                        }
                    </Link>
                    <Link to={'/Ligue1'} className='inline-flex items-center mt-1'>
                        <img src="assets/Leagues/FL1.png" alt="" className={`ml-1 ${isOpen ? 'w-[50px]' : 'w-[50px]'}`} />
                        {
                            isOpen && <span className='font-semibold ml-1'>Ligue 1</span>
                        }
                    </Link>
                </div>
            </div>
            <div className='flex md:ml-[110px] ml-2' >
                <Routes>
                    <Route path='/PrimeraDivison' element={<PrimeraDivison/>} />
                    <Route path='/PremierLeague' element={<PremierLeague/>} />
                    <Route path='/Ligue1' element={<Ligue1/>} />
                    <Route path='/Bundesliga' element={<Bundesliga/>} />
                    <Route path='/SerieA' element={<SerieA/>} />
                    <Route path='/' element={<TodayMatches/>} />
                </Routes>
            </div>
        </Router>
    </div>
  )
}

export default NavBar