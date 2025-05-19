import React from 'react';

function Mentors() {
  return (
    <>
      <div className="w-full max-w-[1400px] mx-auto px-8 py-12 bg-white relative">
        {/* العنوان */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900">
            <span>تعرف على </span>
            <span className="text-orange-500">خبرائنا والمدربين</span>
          </h2>
        </div>

        {/* قائمة المدربين */}
        <div className="flex flex-wrap gap-8 justify-center">
          {/* بطاقة المدرب */}
          <div className="w-full sm:w-[48%] lg:w-[30%] bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1 p-6 flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <img
                src="https://via.placeholder.com/100"
                alt="Sandeep"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold text-xl text-blue-900">Sandeep</h3>
                <p className="text-sm text-gray-600">مطور أندرويد وفلاتر</p>
              </div>
            </div>

            {/* التقييم */}
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-600 ml-3">(70 تقييم)</span>
            </div>

            {/* الإحصائيات */}
            <div className="flex gap-6 mb-6 text-gray-500 text-xs">
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>99.5 ألف دقيقة</span>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <span>275 طالب</span>
              </div>
            </div>

            {/* الوصف */}
            <p className="text-gray-700 text-sm flex-grow">
              Sandeep مطور شامل متخصص في MERN stack. متحمس لمساعدة آلاف الطلاب لبناء مستقبل ناجح في مجال التطوير.
            </p>
          </div>

          {/* بطاقة المدرب الثانية */}
          <div className="w-full sm:w-[48%] lg:w-[30%] bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1 p-6 flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <img
                src="https://via.placeholder.com/100"
                alt="Sudhansu"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold text-xl text-blue-900">Sudhansu</h3>
                <p className="text-sm text-gray-600">هاكر أخلاقي، أمن سيبراني، تحقيقات</p>
              </div>
            </div>

            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-600 ml-3">(93 تقييم)</span>
            </div>

            <div className="flex gap-6 mb-6 text-gray-500 text-xs">
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>17.6 ألف دقيقة</span>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <span>102 طالب</span>
              </div>
            </div>

            <p className="text-gray-700 text-sm flex-grow">
              Sudhansu هاكر أخلاقي معتمد وخبير في الأمن السيبراني والتحليل الجنائي. لديه خبرة أكثر من 20 سنة في توجيه الطلاب لحماية الأنظمة الرقمية.
            </p>
          </div>
        </div>

        {/* الديكور البرتقالي نصف الدائرة */}
        <div className="absolute left-0 bottom-0 w-32 h-64 bg-orange-400 rounded-r-full opacity-30"></div>
      </div>
    </>
  );
}

export default Mentors;
