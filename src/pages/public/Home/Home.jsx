import React from 'react';
import FrstSection from './FrstSection';
import SecondSection from './SecondSection';
import FourthSection from './FourthSection';
import ThirdSection from './ThirdSection';
import Mentors from './Mentors';
import OurCertificationsAndOurCollaborations from './OurCertificationsAndOurCollaborations';

const Home = () => {
  return (
    <>
      <FrstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <img src="/src/assets/images/OurAchievements.png" className='mt-5 ml-4' />
      <Mentors />
      <OurCertificationsAndOurCollaborations />
    </>
  );
};

export default Home;
