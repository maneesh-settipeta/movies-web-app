import { useEffect, useState } from 'react';
import MovieShowDates from './MovieShowDates'
import Theatres from './Theatres';
import { useDispatch } from 'react-redux';
import { setMoviesData } from '../Store/appMoviesSlice';
import { useLocation } from 'react-router-dom';
// import { VITE_baseURL } from '../URL';

const MovieShows = () => {

    const dispatch = useDispatch();

    const [movieData, setmovieData] = useState([]);

    // const movieId = useSelector((state) => state?.appMovie?.selectedMovieId);
    // const cityId = useSelector((state) => state?.appLogin?.city?.cityId);

    const location = useLocation();
    const URL = location.pathname.split('/');

    const movieId = URL[3];
    const cityId = URL[5];


    const SHOWS_API = `${import.meta.env.VITE_baseURL}/search-service/api/v2/shows/search?movieId=${movieId}&theaterCityId=${cityId}`;

    useEffect(() => {
        function sortShowTimings(showTimes) {
            const sortedShowTimes = Object.entries(showTimes || {})
                .sort(([timeA], [timeB]) => {
                    const dateA = new Date(`1970-01-01T${timeA}:00`);
                    const dateB = new Date(`1970-01-01T${timeB}:00`);
                    return dateA - dateB;
                });
            return Object.fromEntries(sortedShowTimes);
        }
        const fetchApiData = async () => {
            try {
                const res = await fetch(SHOWS_API);
                const result = await res.json();
                setmovieData(result);
                parseData(result);
            } catch (error) {
                console.error(error, "Error")
            }
        }

        function parseData(movieData1) {
            const groupedByDate = {};
            movieData1?.theaterShows?.map((theater) => {
                Object.entries(theater?.showTimes)?.forEach(([date, times]) => {
                    if (!groupedByDate[date]) {
                        groupedByDate[date] = [];
                    }
                    groupedByDate[date].push({
                        theaterId: theater.theaterId,
                        theaterName: theater.theaterName,
                        showTimes: sortShowTimings(times),
                    });
                });
            });
            dispatch(setMoviesData(groupedByDate));
        }
        fetchApiData();

    }, []);

    return (
        <div>
            <div className='  bg-gray-200 flex p-4 gap-4 pl-36'>
                <p>Movies</p>
                <p>Stream</p>
                <p>Events</p>
                <p>Plays</p>
                <p>Sports</p>
                <p>Activities</p>
            </div>
            <div className=' w-full h-20 border flex items-center pl-36'>
                <h1 className='text-4xl '>{movieData?.movieName} </h1>
            </div>
            <div className='h-24 mb-1'>
                <MovieShowDates />
            </div>
            <div >
                <Theatres />
            </div>
        </div>
    )
}

export default MovieShows