import React, { useState } from 'react';

const SecondSection = () => {
    const Group1 = "/src/assets/images/Group1.jpg";
    const Group2 = "/src/assets/images/Group2.jpg";
    const Group3 = "/src/assets/images/Group3.jpg";
    const Group4 = "/src/assets/images/Group4.jpg";
    const Logo = "/src/assets/images/logo.png";  // مسار صورة اللوجو

    const [activeSlide, setActiveSlide] = useState(0);

    const features = [
        {
            title: "اختيار الدورة المعتمد على الذكاء الاصطناعي",
            image: Group1,
            logo: "EZY"
        },
        {
            title: "جدول دراسي مخصص بالذكاء الاصطناعي",
            image: Group2,
            logo: "EZY"
        },
        {
            title: "مساعد تعلم ذكي",
            image: Group3,
            logo: "EZY"
        },
        {
            title: "متتبع تقدم التعلم",
            image: Group4,
            logo: "EZY"
        }
    ];

    const goToSlide = (index) => {
        setActiveSlide(index);
    };

    return (
        <>
            <div className="w-full max-w-[1700px] mx-auto flex flex-col md:flex-row min-h-screen bg-white">

                {/* القسم الأيسر - اللوجو والنصوص */}
                <div className="flex-1 flex flex-col justify-center px-6 md:px-12 py-12 w-full text-right">
                    
                    {/* صورة اللوجو فوق النص */}
                    <div className="mb-10 flex justify-end">
                        <img src={Logo} alt="شعار المدرسة" className="w-40 h-auto object-contain" />
                    </div>

                    <h2 className="text-5xl md:text-6xl font-extrabold text-blue-900 leading-snug mb-8">
                        <span className="block mb-6">رؤيتنا</span>
                        <span className="font-normal text-xl leading-relaxed">
                            مجتمع مدرسي مبادر منتمٍ طامح ملتزم بقيم التسامح، نهجه العلم والتطور وصولًا للتميز.
                        </span>
                    </h2>

                    <h3 className="text-4xl md:text-5xl font-bold text-[#F98149] mb-6">رسالتنا</h3>
                    <p className="text-lg md:text-xl leading-relaxed max-w-xl">
                        توفير فرص عادلة لجميع طلبة المدرسة للحصول على تعليم عالي الجودة بما يمكنهم من التفكير العلمي الإبداعي والعمل بروح الفريق والتعلم مدى الحياة، والتزود بالمعارف والمهارات والقيم والاتجاهات التي تؤهلهم للدخول إلى سوق العمل والمساهمة في رفعة الوطن.
                    </p>
                </div>

                {/* القسم الأيمن - سلايدر الميزات */}
                <div className="flex-1 relative flex items-center justify-center">
                    <div className="relative overflow-hidden">
                        {/* سلايدر الميزات */}
                        <div
                            className="flex transition-transform duration-300 ease-in-out"
                            style={{ transform: `translateX(-${activeSlide * 100 / features.length}%)`, width: `${features.length * 100}%` }}
                        >
                            {features.map((feature, index) => (
                                <div key={index} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 p-2" style={{ width: `${100 / features.length}%` }}>
                                    <div>
                                        <img src={feature.image} alt={feature.title} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* أزرار التنقل بين الشرائح */}
                        <div className="flex justify-center space-x-2 mt-6">
                            {features.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`w-8 h-1 rounded ${activeSlide === index ? 'bg-orange-500' : 'bg-gray-300'}`}
                                    aria-label={`الانتقال إلى الشريحة ${index + 1}`}
                                />
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default SecondSection;
