import React, { useState } from 'react';

const OurAchievements = () => {
  // State to control team members visibility
  const [showAllTeamMembers, setShowAllTeamMembers] = useState(false);

  // Data for achievements section
  const achievements = [
    { number: '+200', label: 'Courses' },
    { number: '50K', label: 'Mentors' },
    { number: '370k', label: 'Students' },
    { number: '100+', label: 'Recognition' },
  ];

  // Data for team members
  const teamMembers = [
    {
      name: 'James Nduku',
      position: 'Marketing Coordinator',
      image: '/api/placeholder/120/120',
    },
    {
      name: 'Joseph Munyambu',
      position: 'Nursing Assistant',
      image: '/api/placeholder/120/120',
    },
    {
      name: 'Joseph Ngumbau',
      position: 'Medical Assistant',
      image: '/api/placeholder/120/120',
    },
    {
      name: 'Erick Kipkemboi',
      position: 'Web Designer',
      image: '/api/placeholder/120/120',
    },
    {
      name: 'Stephen Kerubo',
      position: 'President of Sales',
      image: '/api/placeholder/120/120',
    },
    {
      name: 'John Leboo',
      position: 'Dog Trainer',
      image: '/api/placeholder/120/120',
    },
  ];

  // Get the first 3 team members or all based on state
  const visibleTeamMembers = showAllTeamMembers ? teamMembers : teamMembers.slice(0, 3);

  return (
    <div>
    {/* Achievements Section */}
<div className="py-20 px-4">
  <h2 className="text-3xl font-bold text-center mb-4">Our Achievements</h2>
  <p className="text-center max-w-3xl mx-auto mb-16 text-gray-700">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
  </p>

  <div className="flex flex-wrap justify-between max-w-6xl mx-auto px-8">
    {achievements.map((achievement, index) => (
      <div
        key={index}
        className="text-center w-1/2 md:w-1/4 mb-10"
      >
        <h3 className="text-3xl md:text-4xl font-bold mb-2">
          {achievement.number}
        </h3>
        <p className="text-sm text-gray-600">{achievement.label}</p>
      </div>
    ))}
  </div>
</div>


      {/* Team Section */}
      <div className="py-20 px-4 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-4">Our team</h2>
        <p className="text-center max-w-2xl mx-auto mb-16">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto mb-12">
          {visibleTeamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center">
              <img 
                src={member.image}
                alt={member.name}
                className="w-24 h-24 object-cover mb-4"
              />
              <h3 className="font-medium text-lg">{member.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{member.position}</p>
              <div className="flex gap-2">
                <a href="#" className="p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                  </svg>
                </a>
                <a href="#" className="p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                  </svg>
                </a>
                <a href="#" className="p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dribbble" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 0C3.584 0 0 3.584 0 8s3.584 8 8 8c4.408 0 8-3.584 8-8s-3.592-8-8-8zm5.284 3.688a6.802 6.802 0 0 1 1.545 4.251c-.226-.043-2.482-.503-4.755-.217-.052-.112-.096-.234-.148-.355-.139-.33-.295-.668-.451-.99 2.516-1.023 3.662-2.498 3.81-2.69zM8 1.18c1.735 0 3.323.65 4.53 1.718-.122.174-1.155 1.553-3.584 2.464-1.12-2.056-2.36-3.74-2.551-4A6.95 6.95 0 0 1 8 1.18zm-2.907.642A43.123 43.123 0 0 1 7.627 5.77c-3.193.85-6.013.833-6.317.833a6.865 6.865 0 0 1 3.783-4.78zM1.163 8.01V7.8c.295.01 3.61.053 7.02-.971.199.381.381.772.555 1.162l-.27.078c-3.522 1.137-5.396 4.243-5.553 4.504a6.817 6.817 0 0 1-1.752-4.564zM8 14.837a6.785 6.785 0 0 1-4.19-1.44c.12-.252 1.509-2.924 5.361-4.269.018-.009.026-.009.044-.017a28.246 28.246 0 0 1 1.457 5.18A6.722 6.722 0 0 1 8 14.837zm3.81-1.171c-.07-.417-.435-2.412-1.328-4.868 2.143-.338 4.017.217 4.251.295a6.774 6.774 0 0 1-2.924 4.573z"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <button 
            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setShowAllTeamMembers(!showAllTeamMembers)}
          >
            {showAllTeamMembers ? 'Show Less' : 'View All'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OurAchievements;