import { useSelector } from "react-redux";
import { setShowID } from '../Store/appMoviesSlice';
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Theatres = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const URL = location.pathname.split('/');
    const movieId = URL[3];
    const cityId = URL[5];

    const theatreNames = useSelector((state: object[]) => state?.appMovie?.moviesData);
    const selectedDate = useSelector((state: string) => state?.appMovie?.selectedDate);
    const filterShowsForMovie = theatreNames[0]?.[selectedDate];

    const handleShowTheatre = (showId: number) => {
        dispatch(setShowID(showId));
        navigate(`/home/movie/${movieId}/city/${cityId}/theatre/${showId}`);
    }

    return (
        <div>
            <div className="bg-gray-200  flex justify-center ">
                <div className="bg-white w-[80vw]   h-[calc(69vh-62px)] mt-3 ">
                    <div className="flex justify-end gap-2 mr-14 p-2">
                        <div className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            <p className="text-xs">Available</p>
                        </div>

                        <div className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                            <p className="text-xs">Fast Filling</p>
                        </div>

                        <div className="flex items-center gap-1">
                            <p className="text-xs">Subtitles Language</p>
                        </div>
                    </div>
                    {filterShowsForMovie?.map((theaterShows) => (
                        <>
                            <hr />
                            <div className="flex items-center">
                                <div key={theaterShows.theaterId} className="pl-36 w-96">
                                    <h1 className="text-xs font-bold ">{theaterShows.theaterName}</h1>
                                    <div className="flex gap-3 p-2">
                                        <p className="text-xs text-green-500"> M-Ticket</p>
                                        <p className="text-xs text-orange-400"> Food & Beverage</p>
                                    </div>
                                </div>
                                <div className="flex  p-3">
                                    {Object.keys(theaterShows.showTimes).map((showtime) => (
                                        <button key={theaterShows.showTimes[showtime]} className="p-3 border border-gray-800 mr-2 rounded-md"
                                            onClick={() => handleShowTheatre(theaterShows.showTimes[showtime])}>
                                            <h1 className="text-green-500 text-sm">{showtime}</h1>
                                            <p className="text-xs">Laser Dolby Atmos</p>
                                        </button>
                                    ))}

                                </div>

                            </div>

                            <hr />
                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Theatres