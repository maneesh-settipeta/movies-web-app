
const Shimmer = () => {

    return (
        <div className="flex gap-10 left-20 ">
            {Array(7).fill().map((_, index) => (
                <div key={index} className="h-64 w-40 border border-b-2 m-3 rounded-lg animate-pulse bg-gray-200 ">
                    <span></span>
                </div>
            ))}
        </div>

    )
}

export default Shimmer;