import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './Liga.css'

const PrimeraDivision = () => {
  const [standings, setStandings] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const ITEMS_PER_PAGE = 5;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://football-standings-api-pqotco6hc-azharimm.vercel.app/leagues/esp.1/standings?season=2023'
      );
      setStandings(response.data.data.standings);
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
    <div className="p-5">
        <div className='flex px-10 mx-auto text-center'>
            <h1 className=''>Spanish LALIGA</h1>
        </div>
      <div className="">
        <table className="bg-lime-100 rounded-xl">
          <thead>
            <tr className="text-left bg-lime-200">
              <th className="px-6 py-3">Club</th>
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
                <tr key={item.team.id} className="border-b-2 border-lime-300">
                    <td className="px-6 py-4 inline-flex items-center">
                        <img src={item.team.logos[0].href} alt="" className='w-10 h-10' />
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
      <div className="mt-4">
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
          className='flex mx-auto'
        />
      </div>
    </div>
  );
};

export default PrimeraDivision;
