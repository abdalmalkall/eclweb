import React from 'react';

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="bg-[#03326D] text-white rounded-bl-4xl relative overflow-hidden py-16">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Text Content */}
        <div className="flex-1">
          <p className="text-orange-500 text-sm font-semibold mb-4">ABOUT US</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            The Platform<br />
            For The Next<br />
            Billion Learners
          </h1>
          <p className="text-gray-300 text-lg">
            Transforming tech education for the next generation of students & employees
          </p>
        </div>

        {/* Images */}
        <div className="flex-1 grid grid-cols-2 gap-2 relative">
          <div className="col-span-1">
            <img src="/api/placeholder/400/320" alt="Library"
              className="rounded-lg h-48 w-56 object-cover" />
          </div>
          <div className="col-span-1 flex flex-col gap-2">
            <img src="/api/placeholder/400/320" alt="Team"
              className="rounded-lg z-10 h-32 w-64 object-cover" />
            <img src="/api/placeholder/400/320" alt="Students"
              className="rounded-lg z-10 h-56 w-72 object-cover absolute top-40 right-20" />
          </div>

          {/* Orange Circle */}
          <div className="absolute top-40 right-20 -translate-y-1/2 translate-x-1/2 w-40 h-40 rounded-full bg-orange-500 opacity-40 z-0"></div>
        </div>
      </div>

      {/* Orange Dots Pattern */}
      <div className="absolute left-1/4 bottom-8 opacity-30">
        <div className="grid grid-cols-12 gap-2">
          {Array(36).fill().map((_, i) => (
            <div key={i} className="w-2 h-2 bg-[#FF914C] rounded-full"></div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Story Section Component
const StorySection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-8">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          {/* Images Column */}
          <div className="md:w-1/2 relative">
            {/* Blue Arrow SVG */}
            <svg className="absolute -right-6 -top-12 w-12 h-36" viewBox="0 0 49 142" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd"
                d="M48.0881 25.5578C46.8376 26.8707 44.7697 26.9116 43.4692 25.6492L24.5 7.23464L5.53083 25.6492C4.23036 26.9116 2.16241 26.8707 0.911956 25.5578C-0.338502 24.2448 -0.297956 22.157 1.00252 20.8946L21.1038 1.38104C23.0006 -0.460352 25.9994 -0.460343 27.8962 1.38104L47.9975 20.8946C49.298 22.157 49.3385 24.2448 48.0881 25.5578ZM48.088 54.4153C46.8376 55.7282 44.7697 55.7692 43.4692 54.5067L24.5 36.0922L5.53083 54.5067C4.23036 55.7692 2.16241 55.7282 0.911954 54.4153C-0.338503 53.1023 -0.297957 51.0146 1.00252 49.7521L21.1038 30.2386C23.0006 28.3972 25.9994 28.3972 27.8962 30.2386L47.9975 49.7521C49.298 51.0146 49.3385 53.1023 48.088 54.4153ZM43.4692 83.3642C44.7696 84.6267 46.8376 84.5858 48.088 83.2728C49.3385 81.9599 49.298 79.8721 47.9975 78.6096L27.8962 59.0961C25.9994 57.2547 23.0006 57.2547 21.1038 59.0961L1.00252 78.6096C-0.297958 79.8721 -0.338505 81.9599 0.911953 83.2728C2.16241 84.5858 4.23035 84.6267 5.53083 83.3642L24.5 64.9497L43.4692 83.3642ZM48.088 112.13C46.8376 113.443 44.7696 113.484 43.4692 112.222L24.5 93.8072L5.53083 112.222C4.23035 113.484 2.16241 113.443 0.911952 112.13C-0.338506 110.817 -0.297959 108.73 1.00252 107.467L21.1038 87.9536C23.0006 86.1122 25.9994 86.1122 27.8962 87.9536L47.9975 107.467C49.298 108.73 49.3385 110.817 48.088 112.13ZM43.4692 141.079C44.7696 142.342 46.8376 142.301 48.088 140.988C49.3385 139.675 49.298 137.587 47.9975 136.325L27.8962 116.811C25.9994 114.97 23.0006 114.97 21.1038 116.811L1.00252 136.325C-0.297961 137.587 -0.338507 139.675 0.911951 140.988C2.16241 142.301 4.23035 142.342 5.53082 141.079L24.5 122.665L43.4692 141.079Z"
                fill="#003F7D" />
            </svg>

            {/* Orange Circle */}
            <div className="absolute top-32 left-8 w-64 h-64 rounded-full bg-orange-500 opacity-30 z-0"></div>

            {/* Team Image */}
            <img src="/api/placeholder/400/320"
              className="relative ml-16 rounded-2xl w-64 h-64 z-10 object-cover shadow-lg" alt="Team" />

            {/* Orange Plus SVG */}
            <svg className="absolute -left-6 bottom-4 w-16 h-32 z-20" viewBox="0 0 67 145" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M66.7168 56.8581L66.7168 48.6517L57.1427 48.6517L57.1427 39.0776L48.9363 39.0776L48.9363 48.6517L39.3623 48.6517L39.3623 56.8581L48.9364 56.8581L48.9364 66.4322L57.1427 66.4322L57.1427 56.8581L66.7168 56.8581Z"
                fill="#F98149" />
              <path
                d="M27.6406 56.8581L27.6406 48.6517L18.0665 48.6517L18.0665 39.0776L9.86018 39.0776L9.86018 48.6517L0.28609 48.6517L0.28609 56.8581L9.86018 56.8581L9.86018 66.4322L18.0665 66.4322L18.0665 56.8581L27.6406 56.8581Z"
                fill="#F98149" />
              <path
                d="M66.7168 17.7804L66.7168 9.57409L57.1427 9.57409L57.1427 -4.18497e-07L48.9363 -4.18497e-07L48.9363 9.57409L39.3623 9.57409L39.3623 17.7804L48.9364 17.7804L48.9364 27.3545L57.1427 27.3545L57.1427 17.7804L66.7168 17.7804Z"
                fill="#F98149" />
              <path
                d="M27.6406 17.7804L27.6406 9.57409L18.0665 9.57409L18.0665 -4.18497e-07L9.86018 -4.18497e-07L9.86018 9.57409L0.28609 9.57409L0.28609 17.7804L9.86018 17.7804L9.86018 27.3545L18.0665 27.3545L18.0665 17.7804L27.6406 17.7804Z"
                fill="#F98149" />
              <path
                d="M66.7168 135.014L66.7168 126.808L57.1427 126.808L57.1427 117.234L48.9363 117.234L48.9363 126.808L39.3623 126.808L39.3623 135.014L48.9364 135.014L48.9364 144.588L57.1427 144.588L57.1427 135.014L66.7168 135.014Z"
                fill="#F98149" />
              <path
                d="M27.6406 135.014L27.6406 126.808L18.0665 126.808L18.0665 117.234L9.86018 117.234L9.86018 126.808L0.28609 126.808L0.28609 135.014L9.86018 135.014L9.86018 144.588L18.0665 144.588L18.0665 135.014L27.6406 135.014Z"
                fill="#F98149" />
              <path
                d="M66.7168 95.9365L66.7168 87.7301L57.1427 87.7301L57.1427 78.156L48.9363 78.156L48.9363 87.7301L39.3623 87.7301L39.3623 95.9365L48.9364 95.9365L48.9364 105.511L57.1427 105.511L57.1427 95.9365L66.7168 95.9365Z"
                fill="#F98149" />
              <path
                d="M27.6406 95.9365L27.6406 87.7301L18.0665 87.7301L18.0665 78.156L9.86018 78.156L9.86018 87.7301L0.28609 87.7301L0.28609 95.9365L9.86018 95.9365L9.86018 105.511L18.0665 105.511L18.0665 95.9365L27.6406 95.9365Z"
                fill="#F98149" />
            </svg>
          </div>

          {/* Text Column */}
          <div className="md:w-1/2">
            <div className="flex flex-col items-start">
              <h5 className="text-[#003F7D] text-sm tracking-wider mb-4 font-semibold">OUR STORY</h5>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#FF914C]">Innovating new ways to train students</h2>
              <div className="space-y-4 text-gray-600">
                <p>We started back in 2021 with a simple goal: to revolutionize tech education.
                  Our mission was to make learning accessible, engaging, and effective for everyone.</p>
                <p>As a team of tech professionals, we understand the challenges and opportunities
                  in the tech industry. That's why we've built a platform that combines practical
                  learning with industry insights.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Person Card Component for reusability
const PersonCard = ({ image, name, title }) => {
  return (
    <div className="text-center transform transition-transform duration-300 hover:scale-105">
      <div className="w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <h4 className="text-xl font-semibold">{name}</h4>
      <p className="text-gray-600">{title}</p>
    </div>
  );
};

// Team Section Component
const TeamSection = () => {
  const team = [
    { id: 1, name: "NAREN M", title: "Co-founder", image: "/api/placeholder/400/320" },
    { id: 2, name: "SUCHITRA", title: "DIRECTOR - HR & OPERATIONS", image: "/api/placeholder/400/320" },
    { id: 3, name: "KISHORE KUMAR", title: "CEO & FOUNDER, CARAMEL IT SERVICES", image: "/api/placeholder/400/320" }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-8">
        <h2 className="text-center text-3xl font-bold mb-16">Our <span className="text-[#FF914C]">Team</span></h2>
        <div className="relative">
          <div className="grid md:grid-cols-3 gap-8">
            {team.map(person => (
              <PersonCard 
                key={person.id}
                image={person.image}
                name={person.name}
                title={person.title}
              />
            ))}
          </div>
          
          {/* Navigation Arrows */}
          <button className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors">
            <svg className="w-6 h-6 text-[#FF914C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors">
            <svg className="w-6 h-6 text-[#FF914C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

// Advisors Section Component
const AdvisorsSection = () => {
  const advisors = [
    { id: 1, name: "CHITRA", title: "SR.EXECUTIVE ADVISOR", image: "/api/placeholder/400/320" },
    { id: 2, name: "Anand Kumar", title: "ANGEL INVESTOR", image: "/api/placeholder/400/320" },
    { id: 3, name: "PRASAD", title: "PHARMA INDUSTRIALIST", image: "/api/placeholder/400/320" }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-8">
        <h2 className="text-center text-3xl font-bold mb-16">Our <span className="text-[#FF914C]">Advisors</span></h2>
        <div className="relative">
          <div className="grid md:grid-cols-3 gap-8">
            {advisors.map(person => (
              <PersonCard 
                key={person.id}
                image={person.image}
                name={person.name}
                title={person.title}
              />
            ))}
          </div>
          
          {/* Navigation Arrows */}
          <button className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors">
            <svg className="w-6 h-6 text-[#FF914C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors">
            <svg className="w-6 h-6 text-[#FF914C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

// Mission Vision Card Component for reusability
const MissionVisionCard = ({ image, title, content, type }) => {
  return (
    <div className="text-center bg-[#003F7D] rounded-lg shadow-xl p-8 transform transition-transform duration-300 hover:scale-105">
      <div className="mx-auto w-40 h-40 mb-6 flex items-center justify-center">
        <img src={image} alt={title} className="w-full" />
      </div>
      <h3 className="text-white text-2xl font-bold mb-4">Our <span className="text-[#FF914C]">{type}</span></h3>
      <p className="text-gray-300">
        {content}
      </p>
    </div>
  );
};

// Mission Vision Section Component
const MissionVisionSection = () => {
  return (
    <section className="bg-gradient-to-b from-[#003F7D] to-[#02294D] py-20 mt-15">
      <div className="container mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-16">
          <MissionVisionCard 
            image="/api/placeholder/400/320"
            title="Mission"
            type="Mission"
            content="To empower individuals with cutting-edge tech skills and knowledge, enabling them to thrive in the digital age."
          />
          
          <MissionVisionCard 
            image="/api/placeholder/400/320"
            title="Vision"
            type="Vision"
            content="To become the world's leading platform for tech education, creating a global community of skilled tech professionals."
          />
        </div>
      </div>
    </section>
  );
};

// Main About Page Component
const AboutPage = () => {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <StorySection />
      <MissionVisionSection />
      <TeamSection />
      <AdvisorsSection />
    </div>
  );
};

export default AboutPage;