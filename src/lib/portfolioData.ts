// Aggregated portfolio data for print resume
// This consolidates all data from various components

export const getSkillsData = () => [
  { name: 'React', level: 95, category: 'Frontend' },
  { name: 'TypeScript', level: 90, category: 'Frontend' },
  { name: 'Next.js', level: 85, category: 'Frontend' },
  { name: 'Tailwind CSS', level: 92, category: 'Frontend' },
  { name: 'Vue.js', level: 75, category: 'Frontend' },
  { name: 'Node.js', level: 88, category: 'Backend' },
  { name: 'Express.js', level: 85, category: 'Backend' },
  { name: 'PostgreSQL', level: 80, category: 'Backend' },
  { name: 'MongoDB', level: 72, category: 'Backend' },
  { name: 'PHP', level: 90, category: 'Backend' },
  { name: 'SQL', level: 78, category: 'Backend' },
  { name: 'Git', level: 90, category: 'Tools & Others' },
  { name: 'Postman', level: 90, category: 'Tools & Others' },
  { name: 'Figma', level: 75, category: 'Tools & Others' },
  { name: 'Jira', level: 90, category: 'Tools & Others' },
  { name: 'Microsoft Azure', level: 90, category: 'Tools & Others' },
  { name: 'Docker', level: 70, category: 'Tools & Others' }
];

export const getProjectsData = () => [
  {
    title: 'Chocomaid AI Discord Bot',
    year: 2025,
    descriptionKey: 'printResume.projects.chocomaidBot',
    technologies: ['React', 'Node.js', 'MySQL', 'MongoDB', 'Discord.js', 'Google API', 'YouTube API', 'Twitch API', 'Clash Of Clans API', 'Valorant API', 'Cloudflare', 'i18n']
  },
  {
    title: 'Cipta Sejati Indonesia',
    year: 2023,
    descriptionKey: 'printResume.projects.ciptaSejati',
    technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'jQuery', 'AJAX', 'Chart.js', 'Cloudflare']
  },
  {
    title: 'ERP Application',
    year: 2019,
    descriptionKey: 'printResume.projects.erpApp',
    technologies: ['C#', 'MySQL', 'PHP', 'Javascript', 'Bootstrap', 'jQuery', 'AJAX', 'Chart.js', 'Cloudflare']
  },
  {
    title: 'Digital Library System',
    year: 2018,
    descriptionKey: 'printResume.projects.digitalLibrary',
    technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'jQuery', 'AJAX', 'Chart.js', 'Cloudflare']
  },
  {
    title: 'Product Specification System',
    year: 2018,
    descriptionKey: 'printResume.projects.productSpec',
    technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'jQuery', 'AJAX', 'Chart.js', 'Cloudflare']
  },
  {
    title: 'Recruitment System',
    year: 2018,
    descriptionKey: 'printResume.projects.recruitment',
    technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'jQuery', 'AJAX', 'Chart.js', 'Cloudflare']
  },
  {
    title: 'Parking Management System',
    year: 2018,
    descriptionKey: 'printResume.projects.parking',
    technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'jQuery', 'AJAX', 'Chart.js', 'Cloudflare']
  },
  {
    title: 'Shipment Tracking System',
    year: 2018,
    descriptionKey: 'printResume.projects.shipment',
    technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'jQuery', 'AJAX', 'Chart.js', 'Cloudflare']
  },
  {
    title: 'Maintenance Management System',
    year: 2017,
    descriptionKey: 'printResume.projects.maintenance',
    technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'jQuery', 'AJAX', 'Chart.js', 'Cloudflare']
  },
  {
    title: 'HRIS Application',
    year: 2017,
    descriptionKey: 'printResume.projects.hrisApp',
    technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'jQuery', 'AJAX', 'Chart.js', 'Cloudflare']
  }
];

export const getCertificationsData = () => [
  {
    title: 'LLM-Based Tools and Gemini API Integration for Data Science',
    issuer: 'Hacktiv8',
    date: '2025'
  },
  {
    title: 'LLM-Based Tools and Gemini API Integration for Developers',
    issuer: 'Hacktiv8',
    date: '2025'
  },
  {
    title: 'PHP Tutorial Course',
    issuer: 'Sololearn',
    date: '2019'
  },
  {
    title: 'Javascript Tutorial Course',
    issuer: 'Sololearn',
    date: '2019'
  },
  {
    title: 'SQL Fundamentals Course',
    issuer: 'Sololearn',
    date: '2019'
  },
  {
    title: 'HTML Tutorial Course',
    issuer: 'Sololearn',
    date: '2019'
  },
  {
    title: 'CSS Tutorial Course',
    issuer: 'Sololearn',
    date: '2019'
  },
  {
    title: 'jQuery Tutorial Course',
    issuer: 'Sololearn',
    date: '2019'
  }
];

export const getMilestonesData = () => [
  {
    year: '2020',
    title: 'Application Management Specialist',
    company: 'Wilmar International Limited',
    duration: 'Feb 2020 - Present',
    descriptionKey: 'printResume.experience.wilmar'
  },
  {
    year: '2017',
    title: 'Full Stack Developer',
    company: 'PT. Mega Marine Pride',
    duration: 'Sept 2017 - Feb 2020',
    descriptionKey: 'printResume.experience.megaMarine'
  },
  {
    year: '2016',
    title: 'Software Developer',
    company: 'PT. 3.6.9. Group',
    duration: 'Jan 2016 - Sept 2017',
    descriptionKey: 'printResume.experience.group369'
  }
];

export const getEducation = () => [
  {
    year: '2014',
    title: 'Computer Science Degree (S1)',
    School: 'STIKOM Surabaya',
    Location: 'Surabaya, Indonesia',
    RemarkKey: 'printResume.education.remark.incomplete'
  }
];

export const getLanguages = () => [
  {
    language: 'English',
    proficiencyKey: 'printResume.languages.proficiency.intermediate'
  },
  {
    language: 'Indonesian',
    proficiencyKey: 'printResume.languages.proficiency.native'
  }
];

export const getContactDetails = () => [
  {
    type: 'Email',
    value: 'adityahusni90@gmail.com'
  },
  {
    type: 'Phone',
    value: '+62 877-0246-2220'
  },
  {
    type: 'Whatsapp',
    value: '+62 851-5648-0762'
  },
  {
    type: 'Instagram',
    value: 'https://www.instagram.com/husniadityaa'
  },
  {
    type: 'LinkedIn',
    value: 'https://www.linkedin.com/in/husni-aditya'
  },
  {
    type: 'Github',
    value: 'https://github.com/husniaditya'
  },
  {
    type: 'Wakatime',
    value: 'https://wakatime.com/@mynhilde'
  },
  {
    type: 'Website',
    value: 'https://husniaditya.vercel.app/'
  }
];

export const getAboutMe = () => 'printResume.summary';
