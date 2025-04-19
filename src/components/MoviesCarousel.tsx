import { useState } from "react";
const assets = [
    'src/assets/Carousel-1.jpg',
    'src/assets/Carousel-2.jpg',
    'src/assets/Carousel-3.jpg',
]

const MoviesCarousel = () => {

    const [currentImage, setCurrentImage] = useState<number>(0);
    const currentImageCarousel = assets[currentImage]

    const handleBackwardImage = () => {
        if (currentImage === 0) {
            const lastImage = assets.length - 1
            setCurrentImage(lastImage);
        }
        else {
            setCurrentImage((prevImage) => prevImage - 1);
        }
    }


    const handleForwardImage = () => {
        if (currentImage === assets.length - 1) {
            setCurrentImage(0);
        }
        else {
            setCurrentImage((prevImage) => prevImage + 1);
        }

    }


    return (

        <div>
            <div className="h-10 w-10 absolute top-56 left-4 transform border-gray-500 border text-center bg-transparent  rounded-md">
                <button className="text-2xl text-gray-200" onClick={handleBackwardImage}>&lt;</button>
            </div>
            <img src={currentImageCarousel} className="h-80 w-full" />
            <div className="absolute h-10 w-10 top-56 right-4 transform border-gray-500 border text-center bg-transparent  rounded-md">
                <button className="text-2xl text-gray-200" onClick={handleForwardImage}> &gt;</button>
            </div>


        </div>
    )
}

export default MoviesCarousel