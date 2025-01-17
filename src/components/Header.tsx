import { useSelector, useDispatch } from "react-redux";
import { setModalOpen } from "../Store/appLoginSlice";
import { useEffect, useState, useRef } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { movies } from "../movieList";

interface Movie {
    name: string
}
const Header = () => {


    const [searchValue, setSearchValue] = useState<string>("");
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const searchRef = useRef<HTMLDivElement | null>(null);

    const dispatch = useDispatch();

    const cityName = useSelector((store: string) => store?.appLogin?.isCitySelected);
    const isModal = useSelector((store: boolean) => store?.appLogin?.isModalOpen);
    const handleSelectCity = () => {
        dispatch(setModalOpen(!isModal));

    }
    // useEffect(() => {
    //     for (let i = 1; i <= 5; i++) {
    //         setTimeout(() => {
    //             console.log(i);
    //         }, 2000)
    //     }
    // }, [])

    const handleSearch = (event) => {
        console.log("20");
        const movieSearch = event.target.value;
        setSearchValue(movieSearch);
        if (movieSearch) {
            const filterMovie = movies.filter((eachMovie) => eachMovie.toLowerCase().includes(movieSearch.toLowerCase()));
            setFilteredMovies(filterMovie);
            setShowDropDown(true);
        }
        else {
            setFilteredMovies([]);
            setShowDropDown(false);
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowDropDown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="flex justify-between items-center p-3">
                <div className="flex pl-32">
                    <img src='src\images\BookMyShow-Logo.jpg' className="h-10 w-32 mr-3" />
                    <div className="relative" ref={searchRef}>
                        <input
                            type='text'
                            placeholder="Search for movies"
                            className="h-10 w-96 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
                            value={searchValue}
                            onChange={handleSearch}
                        />
                        <i className="fas fa-search absolute left-3 top-1/2  transform -translate-y-1/2 text-gray-500"></i>
                        {showDropDown && searchValue &&
                            <div className="absolute  top-12  w-full bg-white border border-gray-300 rounded-md min-h">
                                {filteredMovies.length > 0 ?
                                    filteredMovies.map((eachMovie, index) => (
                                        <div key={index} className="p-2 hover:bg-gray-200 cursor-pointer text-left">
                                            <h4>{eachMovie}</h4>
                                        </div>
                                    ))
                                    :
                                    <h4>No Movies found</h4>
                                }
                            </div>
                        }
                    </div>
                </div>
                <div className="flex items-center pr-16 ">
                    <div className="flex items-center mr-2 cursor-pointer" onClick={() => handleSelectCity()}>{cityName === "" ? "Please select city" : cityName}
                        <h4 className="  p-1 rounded-md " ></h4>
                        <label>  <i className="fas fa-chevron-down cursor-pointer"></i></label>
                    </div>
                    <button className="bg-red-500 text-white p-1 rounded-md w-14">Login</button>
                </div>
            </div>
        </>
    )
}

export default Header