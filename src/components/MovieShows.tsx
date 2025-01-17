import { useEffect, useState } from 'react';
import movieData from '../data.json'
import MovieShowDates from './MovieShowDates'

const MovieShows = () => {

    const [data, setData] = useState([]);
    useEffect(() => {
        const dates = []
        function parseData() {
            const findDates = movieData.theaterShows.showTimes.map(() => {

            })

        }
        parseData();
    }, [movieData])

    return (
        <div>
            <div className='h-36 w-full border border-b-2 flex items-center pl-36'>
                <h1 className='text-4xl '>{movieData.movieName} </h1>
            </div>
            <div>
                <MovieShowDates dates={showDates} />
            </div>
        </div>
    )
}

export default MovieShows