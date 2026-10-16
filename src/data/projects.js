// Copy this template into projects. Use a unique id for each project.
// Put screenshots in public/projects. Images display in array order, starting at index 0.
// One image displays on its own; multiple images show previous/next slider controls.
// Each entry can be a path string or { src: '/projects/filename.jpg', alt: 'Description' }.
// Existing imageUrl and imageAlt fields are also supported for single images.
// Leave unknown details and URLs empty; links appear only for valid HTTP(S) URLs.
export const projects = [
  {
  id: 1,
  title: 'Real-time Student Complaint System',
  role: 'Sole Developer',
  stack: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB', ],
  problem: 'Lack of central complaint system for students to report issues and track resolutions in real-time.',
  contribution: 'Created a full-stack web application that allows students to submit complaints, view status updates, and receive notifications on resolutions. Implemented real-time functionality with an integrated AI chatbot to assist students in navigating the complaint process. Features a staff and admin dashboard for staff to manage complaints and communicate with students.',
  outcome: 'N/A',
  images: [
    { src: '/projects/Login.jpeg', alt: 'Main project screen' },
    { src: '/projects/LiveFeed-student.jpeg', alt: 'Live feed for students' },
    { src: '/projects/Submit-complaint.jpeg', alt: 'Submit complaint' },
    { src: '/projects/Complaint-detail.jpeg', alt: 'Complaint details' },
    { src: '/projects/Complaint-controls.jpeg', alt: 'Complaint controls' },
    { src: '/projects/AI-chatbot.jpeg', alt: 'AI chatbot' },
    { src: '/projects/AI-chat.jpeg', alt: 'Conversation with ai chatbot' },
    { src: '/projects/Track-complaint.jpeg', alt: 'Track complaint' },
    { src: '/projects/anonymous-option.jpeg', alt: 'Anonymous option' },
    { src: '/projects/Student-dashboard.jpeg', alt: 'Student dashboard' },
    { src: '/projects/Staff-dashboard.jpeg', alt: 'Staff dashboard' },
    { src: '/projects/admin-dashboard.jpeg', alt: 'Admin dashboard' },
    { src: '/projects/notification-center.jpeg', alt: 'Notification center' },
    { src: '/projects/Search-complaints.jpeg', alt: 'Search complaints' },
    { src: '/projects/Complaint-moderation.jpeg', alt: 'complaint moderation' },
    { src: '/projects/FAQ-cell.jpeg', alt: 'FAQ' },
  ],
  demoUrl: 'https://real-time-scs.netlify.app/',
  // repoUrl: 'https://github.com/moburo101/Student-Complaint-System',
},
]
