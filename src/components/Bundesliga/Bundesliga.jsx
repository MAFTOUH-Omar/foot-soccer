import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './Bundesliga.css'

const Bundesliga = () => {
  const [standings, setStandings] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [name , setName] = useState()
  const [session , setSession] = useState()

  const ITEMS_PER_PAGE = 5;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://football-standings-api-pqotco6hc-azharimm.vercel.app/leagues/ger.1/standings'
      );
      setStandings(response.data.data.standings);
      setName(response.data.data.name);
      setSession(response.data.data.seasonDisplay);
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const paginatedStandings = standings.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <div className="p-5" >
      <div className='flex justify-center text-center my-3'>
        <h1 className='font-semibold text-xl text-lime-700'>{name}&nbsp;<span className='bg-lime-400 rounded-lg py-1 px-5 text-white'>{session}</span></h1>
      </div>
      <div className="flex justify-center mx-auto">
        <table className="bg-lime-100 rounded-md">
          <thead>
            <tr className="text-left bg-lime-200">
              <th className="px-6 py-3">Rank</th>
              <th className="px-6 py-3" rowSpan={2}>Club</th>
              <th className="px-6 py-3">Points</th>
              <th className="px-6 py-3">Games Played</th>
              <th className="px-6 py-3">Wins</th>
              <th className="px-6 py-3">Draws</th>
              <th className="px-6 py-3">Losses</th>
              <th className="px-6 py-3">Goals For</th>
              <th className="px-6 py-3">Goals Against</th>
              <th className="px-6 py-3">Goal Difference</th>
            </tr>
          </thead>
          <tbody>
            {paginatedStandings.map((item) => (
                <tr key={item.team.id} className={`${item.note ? item.note.rank<=1 || item.note.rank<=4 ? 'border-l-2 border-blue-600' : '' : ''} `}>
                    <td className="px-5 py-4">{item.note ? item.note.rank : 'N/A'}</td>
                    <td className="px-6 py-4 inline-flex items-center">
                        <img src={item.team.logos[0].href} alt="" className='w-10 h-10 hover:scale-105 transition-all' />
                        &nbsp;&nbsp;
                        <span>
                            {item.team.name}
                        </span>
                    </td>
                    <td className="px-6 py-4">
                        {item.stats.find((stat) => stat.name === 'points')?.value || 'N/A'}
                    </td>
                    <td className="px-5 py-4">{item.stats.find((stat) => stat.name === 'gamesPlayed')?.value || 'N/A'}</td>
                    <td className="px-6 py-4"><span className='bg-lime-500 text-white px-1 rounded-lg'>{item.stats.find((stat) => stat.name === 'wins')?.value || 'N/A'}</span></td>
                    <td className="px-6 py-4">{item.stats.find((stat) => stat.name === 'ties')?.value || 'N/A'}</td>
                    <td className="px-6 py-4"><span className='bg-red-500 text-white px-1 rounded-lg'>{item.stats.find((stat) => stat.name === 'losses')?.value || 'N/A'}</span></td>
                    <td className="px-6 py-4">{item.stats.find((stat) => stat.name === 'pointsFor')?.value || 'N/A'}</td>
                    <td className="px-6 py-4">{item.stats.find((stat) => stat.name === 'pointsAgainst')?.value || 'N/A'}</td>
                    <td className="px-6 py-4">{item.stats.find((stat) => stat.name === 'pointDifferential')?.displayValue || 'N/A'}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-center">
        <ReactPaginate
          previousLabel={'Precedent'}
          nextLabel={'Next'}
          breakLabel={<span className="custom-break-label">...</span>}
          pageCount={Math.ceil(standings.length / ITEMS_PER_PAGE)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          previousClassName="custom-previous"
          nextClassName="custom-next"
          breakClassName="custom-break"
          pageClassName="custom-page"
          activeClassName="custom-active"
          className='flex justify-center'
        />
      </div>
    </div>
  );
};

export default Bundesliga;
