import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Shimmer from "./Shimmer";
import { useDispatch } from "react-redux";
import { setSelectedMovieId } from '../Store/appMoviesSlice'
import MoviesCarousel from "./MoviesCarousel";
// import { VITE_baseURL } from '../URL';
import imagesMap from "../movieImages";
import BMSImage1 from '../assets/BMS-I-1.png';
import BMSImage2 from '../assets/BMSI-2.png';
import BMSImage3 from '../assets/BMS-3.png';



const MoviesList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cityId = useSelector((state) => state?.appLogin?.city?.cityId) || localStorage.getItem('locationId');
    const Movies_API = `${import.meta.env.VITE_baseURL}/search-service/api/v2/movie/explore?cityId=${cityId}`;
    const fetchMovies = async () => {
        const { data } = await axios.get(Movies_API);
        return data;
    }

    const { data, isLoading } = useQuery({
        queryKey: ["movies", cityId],
        queryFn: fetchMovies,
    });

    const moviesListBasedOnCities = data ? Object.entries(data) : []





    const handleShowShows = (id: number) => {
        dispatch(setSelectedMovieId(id));
        navigate(`/home/movie/${id}/city/${cityId}`);
    }


    if (isLoading) return <Shimmer />;

    (imagesMap.get(201));


    return (
        <div className="flex-column justify-center">
            <div>
                <MoviesCarousel />
            </div>
            <div className="flex justify-center ">
                {moviesListBasedOnCities?.map(([id, movieName]) => (
                    <div>

                        <button key={id} className="h-64 w-40   mt-3 ml-3 mr-3 rounded-lg text-center  "
                            onClick={() => handleShowShows(Number(id))}
                        >
                            <img src={imagesMap.get(id)} className="h-fit w-fit rounded-lg" />
                            {/* <h1 className="font-bold text-1xl">{eachMovie}</h1> */}
                        </button>
                        <h1 className="mb-3 mr-3 ml-4   w-36 font-medium break-words "> {movieName}</h1>
                        <p className="font-medium text-gray-400 text-xs  w-36 mb-3 mr-3 ml-4 ">Action/Drama/Thriller</p>
                    </div>
                ))}

            </div>
            <div>

            </div>
            <img src={BMSImage1} />
            <img src={BMSImage2} />
            <img src={BMSImage3} />
        </div>
    )
}

export default MoviesList;