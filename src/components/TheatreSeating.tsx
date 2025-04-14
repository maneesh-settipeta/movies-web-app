import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setSummary, setSummaryMovieInfo } from '../Store/appPaymentSlice'
import { useDispatch } from "react-redux";
import { setSignModelOpen } from '../Store/appLoginSlice';
import { setSelectedSeats } from '../Store/appMoviesSlice'
import { VITE_baseURL } from "../URL";

const TheatreSeating = () => {

    const location = useLocation();
    const URL = location.pathname.split('/');
    const showID = URL[URL.length - 1];
    const movieId = URL[3];
    const theatreId = URL[5];


    const navigate = useNavigate();

    const dispatch = useDispatch();


    const [seats, setSeats] = useState({
        seatIds: [],
        totalPrice: 0,
    });

    const SEATS_API = `${import.meta.env.VITE_baseURL}/search-service/api/theater/seats?showId=${showID}`;

    const fetchSeats = async () => {
        const data = await axios.get(SEATS_API);
        return data
    }

    const { data } = useQuery({
        queryKey: ["seats"],
        queryFn: fetchSeats,
        refetchOnWindowFocus: false,

    });
    console.log(data);

    const details = data?.data?.showDetails;
    const seatDetails = data?.data?.seatDetails

    const handleSelectSeats = (id: number, price: number) => {
        setSeats((prevState) => {
            if (prevState.seatIds.includes(id)) {
                const filteredIds = prevState.seatIds.filter((eachId) => eachId !== id);
                const calculateSub = prevState.totalPrice - price;
                dispatch(setSelectedSeats(filteredIds));
                return {
                    seatIds: filteredIds,
                    totalPrice: calculateSub,
                }
            }
            else {
                const seatIdsArray = [...prevState.seatIds, id];
                const calculateAdd = prevState.totalPrice + price;
                dispatch(setSelectedSeats(seatIdsArray));
                return {
                    seatIds: seatIdsArray,
                    totalPrice: calculateAdd
                }
            }
        })
    }

    const getSummaryDetails = async () => {
        const userDetails = localStorage.getItem('userDetails');
        if (!userDetails) {
            dispatch(setSignModelOpen(true));
        }

        else {
            try {
                const response = await axios.post(`${import.meta.env.VITE_baseURL}/booking-service/api/booking/summary`, {
                    seatsUniqueIds: seats.seatIds,
                    showId: showID,
                    currentSeatStatus: 0,
                    isUpdateRequired: true
                })
                console.log(response);
                if (response.status === 200) {
                    dispatch(setSummary(response.data.seatPricingDetails));
                    dispatch(setSummaryMovieInfo(response.data.showDetails));
                    localStorage.setItem('movieId', details.movieId);
                    navigate(`/summary/movie/${movieId}/city/${theatreId}/theatre/${showID}`);
                }
            } catch (error) {
                alert("Error while booking seat, please choose other");
                setSeats(() => {
                    return {
                        seatIds: [],
                        totalPrice: 0,
                    }
                })
                console.error(error, "");
            }
        }
    }


    return (
        <>
            <div className="flex flex-col h-14 bg-gray-100 justify-center mb-2 pl-5">
                <h1 className=" text-base font-medium">{details?.movieName}</h1>
                <div className="flex">
                    <p className="text-xs">{details?.theaterName} |</p>
                    <div className=" flex ml-2">
                        <p className="text-xs">{details?.showDate}</p>
                        <p className="text-xs ml-2"> {details?.showTime}</p>
                    </div>
                </div>
            </div>
            <div className="h-[80vh] flex flex-col ">
                <div className="flex  justify-center mb-16">
                    <div className="flex flex-col ">
                        {Object.keys(seatDetails || {}).map((row) => (
                            <div key={row} className="flex gap-3 mb-5">
                                <h4 className="w-6">{row}</h4>
                                {Object.keys(seatDetails?.[row] || {}).map((seat) => (
                                    <button key={seatDetails?.[row][seat].showseatId} onClick={() => seatDetails?.[row][seat].status !== "BOOKED" && seatDetails?.[row][seat].status !== "PENDING" && handleSelectSeats(seatDetails?.[row][seat].showseatId,
                                        seatDetails?.[row][seat].price)}>
                                        <p className={seats.seatIds.includes(seatDetails?.[row][seat].showseatId) ?
                                            'flex  h-7 w-7  border text-xs items-center justify-center bg-green-600 text-white border-green-600' :
                                            seatDetails?.[row][seat].status === "BOOKED" ? "bg-gray-200 text-white border-gray-200  h-7 w-7  border text-xs content-center" : seatDetails?.[row][seat].status === "PENDING" ? "bg-orange-400 text-white border-orange-400 h-7 w-7  border text-xs content-center" :
                                                " bg-white text-green-400 border-green-500   h-7 w-7  border text-xs content-center "}>
                                            {seat}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full flex justify-center ">
                    <div className="bg-gray-200 w-3/4 h-10 flex items-center justify-center rounded-lg">
                        <h4 className="text-lg font-medium">SCREEN</h4>
                    </div>
                </div>
                {seats?.seatIds?.length > 0 && (
                    <div className={`fixed bottom-0 left-0 w-full bg-white shadow-lg border-t-2 flex justify-center items-center py-3 transition-all duration-300 ${seats?.seatIds?.length > 0 ? "translate-y-0" : "translate-y-full"}`}>
                        <button className="bg-red-500 text-white rounded-lg px-4 py-2 w-72" onClick={() => getSummaryDetails()}>
                            {`Pay now ₹${seats.totalPrice}`}
                        </button>
                    </div>
                )}
            </div>
        </ >
    )
}

export default TheatreSeating