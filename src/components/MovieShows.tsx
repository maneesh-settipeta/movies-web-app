import { useEffect, useState } from 'react';
import movieData from '../data.json'
import MovieShowDates from './MovieShowDates'
import Theatres from './Theatres';
import { useDispatch } from 'react-redux';
import { setMoviesData } from '../Store/appMoviesSlice';

const MovieShows = () => {
    const dispatch = useDispatch();

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

        function parseData() {
            const groupedByDate = {};
            movieData?.theaterShows?.map((theater) => {
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
            console.log(groupedByDate, "group");

            dispatch(setMoviesData(groupedByDate));
        }
        parseData();
    }, []);

    return (
        <div>
            <div className='bg-gray-200 flex p-4 gap-4 pl-36'>
                <p>Movies</p>
                <p>Stream</p>
                <p>Events</p>
                <p>Plays</p>
                <p>Sports</p>
                <p>Activities</p>
            </div>
            <div className='h-36 w-full border border-b-2 flex items-center pl-36'>
                <h1 className='text-4xl '>{movieData.movieName} </h1>
            </div>
            <div>
                <MovieShowDates />
                <Theatres />
            </div>
        </div>
    )
}

export default MovieShows