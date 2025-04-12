import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Shimmer from "./Shimmer";
import { useDispatch } from "react-redux";
import { setSelectedMovieId } from '../Store/appMoviesSlice'
import MoviesCarousel from "./MoviesCarousel";
import { baseURL } from '../URL';
import imagesMap from "../movieImages";



const MoviesList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cityId = useSelector((state) => state?.appLogin?.city?.cityId) || localStorage.getItem('locationId');
    const Movies_API = `${baseURL}:8765/search-service/api/v2/movie/explore?cityId=${cityId}`;
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

    console.log(imagesMap.get(201));


    return (
        <div className="flex-column justify-center">
            <div>
                <MoviesCarousel />
            </div>
            <div className="flex justify-center ">
                {moviesListBasedOnCities?.map(([id]) => (

                    <button key={id} className="h-64 w-40 border  m-3 rounded-lg text-center  border-red-400"
                        onClick={() => handleShowShows(Number(id))}
                    >
                        <img src={imagesMap.get(id)} className="h-max w-fit" />
                        {/* <h1 className="font-bold text-1xl">{eachMovie}</h1> */}
                    </button>
                ))}
            </div>

        </div>
    )
}

export default MoviesList;