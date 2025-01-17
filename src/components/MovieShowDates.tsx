import { format } from "date-fns";
import { useEffect, useState } from "react";
const MovieShowDates = ({ dates }) => {

    const [showDates, setDates] = useState([]);

    console.log(showDates, "data");

    const findDates = (stringDate) => {
        const date = new Date(stringDate);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const day = days[date.getDay()];
        const formattedDate = format(date, 'dd MMMM yyyy');
        return { day, formattedDate }
    }
    useEffect(() => {
        const getDates = dates.map((eachDate) => {
            console.log(eachDate, "19");
            const stringDate = Object.keys(eachDate);
            console.log(stringDate);
            return stringDate.map((nestedDate) => findDates(nestedDate));
        });
        console.log(getDates);
        setDates(getDates);

    }, [dates])


    return (
        <div>

        </div>
    )
}

export default MovieShowDates