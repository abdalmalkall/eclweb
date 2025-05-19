import React from 'react';

const FirstSection = () => {
    const FemaleImage = "/src/assets/images/FemaleImage.png";

    return (
        <div className="w-full max-w-[1700px] mx-auto flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 overflow-hidden">
            {/* القسم الأيسر */}
            <div className="flex-1 flex flex-col justify-center px-6 md:px-16 py-12 animate-fade-in z-10 relative">
                <h1 className="text-[48px] md:text-[64px] lg:text-[80px] font-extrabold text-blue-900 leading-tight mb-4">
                    منصة التواصل التعليمية
                </h1>

                <p className="text-gray-600 text-lg md:text-xl mb-8">
                    Educational Communication Launcher
                </p>
            </div>

            {/* القسم الأيمن - الصورة أكبر ومغبشة */}
            <div className="flex-1 flex items-center justify-center px-6 md:px-16 py-12 relative">
                <img
                    src={FemaleImage}
                    alt="صورة توضيحية"
                    className="max-w-full h-auto rounded-lg shadow-lg filter blur-sm scale-110"
                    style={{ maxHeight: '600px', objectFit: 'cover' }}
                />
                {/* لو حبيت تضيف تأثير تغبيش أعمق أو ظلال يمكنك تعديل filter */}
            </div>
        </div>
    );
};

export default FirstSection;
