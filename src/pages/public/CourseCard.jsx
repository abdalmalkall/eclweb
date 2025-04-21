const CourseCard = ({ course }) => {
    // Add error handling for missing properties
    if (!course) {
      console.error('Course data is missing');
      return null;
    }
  
    // Debug log the course data
    console.log('Rendering course:', course);
  
    // Check for required properties and provide fallbacks
    const {
      id = '',
      name = 'Untitled Course',
      description = 'No description available',
      price = '0.00',
      image = '/api/placeholder/400/300',
      users_count = 0,
      comments_count = 0,
      category = { name: 'Uncategorized' }
    } = course;
  
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow">
      <div className="relative h-48">
        <img 
          src={image} 
          alt={name} 
          className="h-full w-full object-cover"
          onError={(e) => {
            console.error('Image failed to load:', image);
            e.target.src = '/api/placeholder/400/300';
          }}
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">{category.name}</span>
          <div className="flex items-center">
            <span className="text-xs font-bold mr-1">{users_count}</span>
          </div>
        </div>
        <h3 className="font-bold text-lg mb-1">{name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xs font-bold mr-1">{comments_count}</span>
          </div>
          <span className="font-bold">${price}</span>
        </div>
        <button className="mt-4 w-full py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition">
          Enroll Now
        </button>
      </div>
    </div>
    );
  };
  
  export default CourseCard;