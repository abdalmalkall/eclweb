import WomanImage from '@/assets/images/Image.jpg';
import Logos from '@/assets/images/Logos.svg';

function Home() {

  return (
    <>
      <div className="flex flex-col w-full bg-white">
        {/* Main section */}
        <div className="flex flex-col md:flex-row w-full">
          {/* Left content */}
          <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Learn new skills online with ease</h1>
            <p className="text-gray-700 mb-8">Discover a wide range of courses covering a variety of subjects, taught by expert instructors.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors">
                Start learning now
              </button>
              <button className="border border-gray-300 text-black py-3 px-6 rounded-md hover:bg-gray-100 transition-colors">
                Explore Courses
              </button>
            </div>
          </div>

          {/* Right image */}
          <div className="w-full md:w-1/2 bg-amber-50 flex items-center justify-center">
            <img
              src={WomanImage}
              alt="Woman holding orange folder"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Logos section */}
        <div className="w-full py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              {/* Text slit */}
              <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <p className="text-lg font-medium text-center md:text-left">Trusted by 2000+ companies worldwide.</p>
              </div>

              {/* Logos slit */}
              <div className="w-full md:w-2/3">
                <div className="flex items-center justify-center md:justify-end">
                  {/* Placeholder logos */}
                  <img
                    src={Logos}
                    alt="Logos"
                    className="max-w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </>
  )
}

export default Home;
