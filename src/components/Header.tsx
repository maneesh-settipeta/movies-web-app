import { useSelector } from "react-redux";
import { setModalOpen, setSignModelOpen, setSignUpModalOpen, setUser, setTheatresDetails } from "../Store/appLoginSlice";

import { useEffect, useState, useRef } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { movies } from "../movieList";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import image from '../images/BookMyShow-Logo.jpg'

interface Movie {
    name: string
}

const Header = () => {

    const [searchValue, setSearchValue] = useState<string>("");

    const userNameFromLocalStorage = localStorage.getItem('userDetails');

    const parseUserData = JSON.parse(userNameFromLocalStorage);

    const userName = useSelector((state) => state?.appLogin?.userDetails?.userName) || parseUserData?.userName;
    const firstName = userName?.split(' ');
    const navigate = useNavigate();


    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const searchRef = useRef<HTMLDivElement | null>(null);
    const [handleDropDown, setDropDown] = useState<boolean>(false);
    const dispatch = useDispatch();



    const loginStatus = useSelector((store: string) => store?.appLogin?.signInModalToggle);

    const isCityModalOpen = useSelector((store: boolean) => store?.appLogin?.isCityModalOpen);


    const handleSelectCity = () => {
        dispatch(setModalOpen(!isCityModalOpen));
    }


    const handleSearch = (event) => {


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
    let cityName = useSelector((state) => state?.appLogin?.city?.cityName);


    useEffect(() => {
        if (cityName === undefined) {
            cityName = localStorage.getItem('locationName');
        }

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

    const handleToggleLoginModal = () => {
        if (loginStatus === false) {
            dispatch(setSignUpModalOpen(false));
            dispatch(setSignModelOpen(true));
        }
    }

    const handleToggleLogout = () => {
        setDropDown(!handleDropDown);
    }

    const handleLogout = () => {

        localStorage.clear();
        dispatch(setUser({
            userName: '',
            userEmail: '',
            userId: null
        }));
        dispatch(setTheatresDetails(''));
        dispatch(setModalOpen(true));
        navigate('/home');
    }



    return (
        <>
            <div className="flex justify-between items-center p-3">
                <div className="flex pl-32">
                    <Link to='/home'>
                        <img src={image} className="h-10 w-32 mr-3" />
                    </Link>
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
                    <div className="flex items-center mr-9 cursor-pointer " onClick={() => handleSelectCity()}>{cityName === undefined ? "Please select city" : cityName}
                        <h4 className="  p-1 rounded-md " >
                            <label> <i className="fas fa-chevron-down cursor-pointer"></i></label>
                        </h4>
                    </div>
                    {userName ? <button className="text-red-500 w-32" onClick={handleToggleLogout}> Hi, {firstName[0]}
                        {handleDropDown ? <button className="absolute right-24 border w-20 top-12 px-2 py-1 rounded-md bg-white text-black" onClick={handleLogout}>Logout</button> : null}
                    </button> :
                        <button className="bg-red-500 text-white p-1 rounded-md w-14" onClick={handleToggleLoginModal}>Login</button>}
                </div>
            </div>
        </>
    )
}

export default Header