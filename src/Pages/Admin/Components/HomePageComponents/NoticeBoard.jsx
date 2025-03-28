import React from 'react';

const NoticeBoard = () => {
  const NoticeBoardData = [
    {
      Icon: '📢',
      Name: 'Hackathon Registration Deadline',
      Description:
        'The last date for registration for the Smart India Hackathon (SIH) 2024 is 30th November. Make sure to complete all your submissions before the deadline.',
      Date: '2024-11-18',
    },
    {
      Icon: '📅',
      Name: 'Team Meeting Schedule',
      Description:
        'Our next team meeting is scheduled for 20th November at 10:00 AM. We will be discussing our project milestones and next steps.',
      Date: '2024-11-19',
    },
    {
      Icon: '📝',
      Name: 'Code Submission Reminder',
      Description:
        'All code submissions for the first phase of the project are due on 25th November. Ensure that everything is tested and working before submission.',
      Date: '2024-11-20',
    },
    {
      Icon: '🔔',
      Name: 'Workshop on Machine Learning',
      Description:
        'A workshop on "Introduction to Machine Learning" will be held on 22nd November. It’s a great opportunity to learn about ML algorithms and their applications.',
      Date: '2024-11-22',
    },
    {
      Icon: '💡',
      Name: 'Idea Pitching Session',
      Description:
        'We will be hosting an Idea Pitching session on 26th November for the SIH. Everyone is encouraged to present their innovative ideas.',
      Date: '2024-11-26',
    },
  ];

  const NoticeBoardCard = ({ Icon, Name, Description, Date }) => {
    const truncateText =  (text, wordLimit) => {
        const words =  text.split(' ');
        return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
      };
    return (
        <div className="flex items-center justify-between w-full  bg-white p-4 rounded-lg shadow-lg border">
        {/* Left Section: Icon and Title */}
        <div className="flex items-center">
          <div className="bg-blue-500 text-white w-12 h-12 flex items-center justify-center rounded-md">
            <span className="text-2xl">{Icon}</span> {/* Replace with an icon */}
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-bold text-black">{Name}</h2>
            <div className='w-80   h-5 overflow-hidden'>
            <p className="text-gray-500 text-sm truncate">{Description}</p>
            </div>
          </div>
        </div>
  
        {/* Right Section: Date and More Options */}
        <div className="flex items-center space-x-2">
          <div className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm font-medium">
            {Date}
          </div>
          <div className="text-black text-lg">
            <span>•••</span> {/* More options icon */}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <h1 className="text-black text-xl font-bold mt-10 -mb-8  ">NoticeBoard</h1>
    <div className="text-black  mt-4  h-52 px-5 py-5 no-scrollbar rounded-lg shadow-md overflow-y-auto w-full " id="NoticeBoard-container">
      {NoticeBoardData.map((notice, index) => (
        <NoticeBoardCard
          key={index}
          Icon={notice.Icon}
          Name={notice.Name}
          Description={notice.Description}
          Date={notice.Date}
        />
      ))}
    </div>
    </>
  );
};

export default NoticeBoard;
