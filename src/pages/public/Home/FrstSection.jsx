import React from 'react';
// يمكنك استيراد الصورة بالطريقة المناسبة حسب إعدادات المشروع:
// import FemaleImage from '@/assets/images/FemaleImage.png';

const FirstSection = () => {
    const FemaleImage = "/src/assets/images/FemaleImage.png";

    return (
        <div className="w-full max-w-[1700px] mx-auto flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 overflow-hidden">
            {/* القسم الأيسر */}
            <div className="flex-1 flex flex-col justify-center px-6 md:px-16 py-12 animate-fade-in">
                <h1 className="text-[48px] md:text-[64px] lg:text-[80px] font-extrabold text-blue-900 leading-tight mb-4">
                    منصة التواصل التعليمية
                </h1>

                <p className="text-gray-600 text-lg md:text-xl mb-8">
                    Educational Communication Launcher
                </p>
            </div>

            {/* القسم الأيمن - عرض الصورة */}
            <div className="flex-1 flex items-center justify-center px-6 md:px-16 py-12">
                <img src={FemaleImage} alt="صورة توضيحية" className="max-w-full h-auto rounded-lg shadow-lg" />
            </div>
        </div>
    );
};

export default FirstSection;
