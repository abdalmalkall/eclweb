import React from 'react';
import SkillDevelopment from '@/components/svg/SkillDevelopment';
import SkillDevLogo from '@/components/svg/SkillDevLogo';


const ThirdSection = () => {
    return (
        <>
            <div className="w-full max-w-[1700px] mx-auto flex flex-col md:flex-row min-h-screen bg-white">
                <div className="flex-1">
                    <SkillDevLogo />
                </div>
                <div className="flex-1">
                    <SkillDevelopment />
                </div>
            </div>

        </>
    );
};

export default ThirdSection;