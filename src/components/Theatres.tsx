import { useSelector } from "react-redux";
const Theatres = () => {
    const theatreNames = useSelector((state: object[]) => state?.appMovie?.moviesData);
    const selectedDate = useSelector((state: string) => state?.appMovie?.selectedDate);
    console.log(theatreNames);
    console.log(selectedDate);
    const filterShowsForMovie = theatreNames[0]?.[selectedDate];
    console.log(JSON.stringify(filterShowsForMovie));



    return (
        <div className="bg-gray-300 ">
            <div className="bg-white  ">
                {filterShowsForMovie?.map((theaterShows) => (
                    <>
                        <hr />
                        <div className="flex items-center ">
                            <div key={theaterShows.theaterId} className="pl-36 w-96">
                                <h1 className="text-xs font-bold ">{theaterShows.theaterName}</h1>
                            </div>
                            <div className="flex  p-3">
                                {Object.keys(theaterShows.showTimes).map((showtime) => (
                                    <button key={theaterShows.showTimes[showtime]} className="p-3 border mr-2 w-24 ">
                                        <h1 className="text-green-500">{showtime}</h1>
                                    </button>
                                ))}
                            </div>
                            {/* // Object.entries(theaterShows.showTimes).map(([time, showId]) => (
                            //     <div key={showId}>
                            //         <h1>{time}</h1>
                            //     </div>
                            // )) */}

                        </div>
                        <hr />
                    </>
                ))}
            </div>
        </div>
    )
}

export default Theatres