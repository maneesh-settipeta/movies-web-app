import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSelectedDate } from "../Store/appMoviesSlice";

const MovieShowDates = () => {
    const datesData = useSelector((state) => state?.appMovie?.moviesData);


    const getDatesKeys = datesData.flatMap((eachDate: string) => Object.keys(eachDate));


    const dispatch = useDispatch();

    const [showDates, setDates] = useState<string[]>([]);
    const findDates = (stringDate: string) => {
        const date = parseISO(stringDate);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const day = days[date.getDay()];
        const formattedDate = format(date, 'dd MMMM yyyy');
        return { day, formattedDate, stringDate }
    }

    useEffect(() => {
        const getDates = getDatesKeys?.map((eachDate: string) => {
            return findDates(eachDate);
        });
        const sortedDates = getDates.sort((a, b) => new Date(a.stringDate) - new Date(b.stringDate));
        setDates(sortedDates);
        const intialValue = sortedDates[0]?.stringDate;
        dispatch(setSelectedDate(intialValue));
    }, [])


    return (

        <div className="flex justify-between items-center">
            <div className="flex gap-2 pt-2 pl-36">
                {showDates?.map((eachDate) => (
                    <button className="felx flex-col  p-2 rounded-md " key={eachDate.stringDate}>
                        <p className="text-xs">{eachDate.day.slice(0, 3)}</p>
                        <p>{eachDate.formattedDate.slice(0, 2)}</p>
                        <p className="text-xs">{eachDate.formattedDate.slice(3, 6)}</p>
                    </button>
                ))}
            </div>
            <div className="flex pr-16">
                <p className=" border p-8">Hindi-2D</p>
                <p className="border p-8">Filter Sub Regions</p>
                <p className="border p-8">Filter Price Range</p>
                <p className="border p-8">Filter Show Timings</p>
            </div>
        </div>
    )
}

export default MovieShowDates