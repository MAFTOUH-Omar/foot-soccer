import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const TodayMatches = () => {
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('https://football-results-of-today.p.rapidapi.com/today', {
          headers: {
            'X-RapidAPI-Key': 'c0b5e8a4dfmsh16ed9ebd8f051dbp162e9ejsn4709b4612c73',
            'X-RapidAPI-Host': 'football-results-of-today.p.rapidapi.com',
          },
        });
        setResults(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchResults();
  }, []);

  const paginatedMatches = [];
  // Divisez les matchs en groupes de 5
  results.forEach((competition) => {
    for (let i = 0; i < competition.match.length; i += itemsPerPage) {
      paginatedMatches.push({
        competition: competition.competition,
        competitionLogo: competition.competitionLogo, 
        matches: competition.match.slice(i, i + itemsPerPage),
      });
    }
  });

  const offset = currentPage;
  const page = paginatedMatches[offset];

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <div className='md:w-[1000px] p-5 mx-auto md:pl-[160px]'>
      {page ? (
        <div className='text-center flex flex-col items-center'>
          <h2 className="text-xl font-semibold text-lime-700">
            <img src={page.competitionLogo} alt={page.competition} className="w-8 h-8 mr-2" />
            {page.competition}
          </h2>
          {page.matches.map((match, index) => (
            <div
              key={match.matchId}
              className={`${
                match.over ? 'bg-sky-300 hover:bg-sky-400' : 'bg-lime-300 hover:bg-lime-400'
              }  sm:w-full hover:scale-105 transition-all mx-auto duration-500 my-2 md:w-[600px] w-[390px] flex flex-col items-center py-4 rounded-xl `}
            >
              <div className='flex items-center justify-center'>
                <span className='font-bold'>{match.teamA}</span>&nbsp;&nbsp;
                <img src={match.teamALogo} alt={match.teamA} className="w-8 h-8 mr-2 rounded-xl" />
                <span className='px-2 '>{match.teamAResult}</span>
                <span className='px-2 '>{match.teamBResult}</span>
                <img src={match.teamBLogo} alt={match.teamB} className="w-8 h-8 mr-2 rounded-xl" />
                <span className='font-bold'>{match.teamB}</span>&nbsp;&nbsp;
                <div className='flex items-center justify-end'>
                <span className='font-mono'>{match.live ? <span className='bg-orange-600 rounded-md py-1 px-3 text-white'>Live</span> : match.over ? <span className='bg-sky-800 rounded-md py-1 px-3 text-white'>Finished</span> : ''}</span>
                {
                    match.startIn && <span  className='bg-lime-600 rounded-md py-1 px-3 text-white'>{match.startIn}</span>
                }
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <p>No matches available on this page.</p>
      )}
      
      <div className="mt-4 flex justify-center mx-auto">
        <div className='text-center'>
        <ReactPaginate
          previousLabel={'Precedent'}
          nextLabel={'Next'}
          breakLabel={<span className="custom-break-label">...</span>}
          pageCount={paginatedMatches.length}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
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
    </div>
  );
}

export default TodayMatches;
