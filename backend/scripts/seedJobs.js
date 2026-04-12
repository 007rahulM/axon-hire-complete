// backend/scripts/seedJobs.js
require('dotenv').config();
const mongoose = require('mongoose');
const Job = require('../models/Job');

const RECRUITER_ID = '691ddc3ee3823e7dbc90100b'; // axon@gmail.com

const seedJobs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB...');

    await Job.deleteMany({ postedBy: RECRUITER_ID });
    console.log('Cleared old jobs for this recruiter...');

    const sampleJobs = [
      {
        title: 'Frontend Developer',
        company: 'Axon Hire',
        location: 'Remote',
        type: 'Full-time',
        salary: '8-12 LPA',
        description: 'Build stunning UIs using React and Tailwind CSS. You will work closely with designers to implement pixel-perfect interfaces and ensure the best user experience.',
        requirements: ['React', 'JavaScript', 'Tailwind CSS', 'Git', 'HTML', 'CSS'],
        postedBy: RECRUITER_ID,
        isOpen: true,
        atsEnabled: true,
        autoEvaluate: true,
        evaluationMode: 'ai',
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      },
      {
        title: 'Backend Developer',
        company: 'Axon Hire',
        location: 'Bangalore, India',
        type: 'Full-time',
        salary: '10-15 LPA',
        description: 'Build scalable REST APIs using Node.js and MongoDB. You will design database schemas, write clean code, and collaborate with the frontend team.',
        requirements: ['Node.js', 'Express', 'MongoDB', 'JWT', 'REST API', 'Git'],
        postedBy: RECRUITER_ID,
        isOpen: true,
        atsEnabled: true,
        autoEvaluate: true,
        evaluationMode: 'ai',
        deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
      },
      {
        title: 'Full Stack Developer',
        company: 'Axon Hire',
        location: 'Remote',
        type: 'Full-time',
        salary: '12-18 LPA',
        description: 'Work on both frontend and backend of our SaaS platform. Own features end-to-end from database design to UI implementation.',
        requirements: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Docker', 'REST API'],
        postedBy: RECRUITER_ID,
        isOpen: true,
        atsEnabled: true,
        autoEvaluate: true,
        evaluationMode: 'ai',
        deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      },
      {
        title: 'React Native Developer',
        company: 'Axon Hire',
        location: 'Hyderabad, India',
        type: 'Full-time',
        salary: '8-14 LPA',
        description: 'Build cross-platform mobile apps for both iOS and Android. You will integrate REST APIs, manage state, and ensure smooth performance.',
        requirements: ['React Native', 'JavaScript', 'Redux', 'Firebase', 'REST API'],
        postedBy: RECRUITER_ID,
        isOpen: true,
        atsEnabled: true,
        autoEvaluate: false,
        evaluationMode: 'local',
        deadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
      },
      {
        title: 'DevOps Engineer',
        company: 'Axon Hire',
        location: 'Remote',
        type: 'Contract',
        salary: '15-20 LPA',
        description: 'Manage CI/CD pipelines and cloud infrastructure. Set up monitoring, handle deployments, and ensure system reliability and uptime.',
        requirements: ['Docker', 'Kubernetes', 'AWS', 'Jenkins', 'Linux', 'Git'],
        postedBy: RECRUITER_ID,
        isOpen: true,
        atsEnabled: true,
        autoEvaluate: false,
        evaluationMode: 'local',
        deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      },
      {
        title: 'UI/UX Designer',
        company: 'Axon Hire',
        location: 'Remote',
        type: 'Full-time',
        salary: '6-10 LPA',
        description: 'Design user interfaces and experiences for web and mobile applications. Create wireframes, prototypes, and work with developers to bring designs to life.',
        requirements: ['Figma', 'Adobe XD', 'Wireframing', 'Prototyping', 'User Research'],
        postedBy: RECRUITER_ID,
        isOpen: true,
        atsEnabled: false,
        autoEvaluate: false,
        evaluationMode: 'local',
        deadline: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
      },
      {
        title: 'Python Developer',
        company: 'Axon Hire',
        location: 'Pune, India',
        type: 'Full-time',
        salary: '9-14 LPA',
        description: 'Build data pipelines, automation scripts, and backend services using Python. Work with ML engineers and data scientists.',
        requirements: ['Python', 'Django', 'REST API', 'PostgreSQL', 'Git', 'Linux'],
        postedBy: RECRUITER_ID,
        isOpen: true,
        atsEnabled: true,
        autoEvaluate: true,
        evaluationMode: 'ai',
        deadline: new Date(Date.now() + 22 * 24 * 60 * 60 * 1000),
      },
      {
        title: 'Data Analyst Intern',
        company: 'Axon Hire',
        location: 'Remote',
        type: 'Internship',
        salary: '15,000-25,000/month',
        description: 'Analyze data to generate business insights. Work with dashboards, SQL queries, and help the product team make data-driven decisions.',
        requirements: ['SQL', 'Excel', 'Python', 'Power BI', 'Data Analysis'],
        postedBy: RECRUITER_ID,
        isOpen: true,
        atsEnabled: true,
        autoEvaluate: false,
        evaluationMode: 'local',
        deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      },
    ];

    const inserted = await Job.insertMany(sampleJobs);

    console.log(`\n✅ Successfully seeded ${inserted.length} jobs!`);
    console.log('\nJobs created:');
    inserted.forEach((job, i) => {
      console.log(`  ${i + 1}. ${job.title} — ${job.company} (${job.type})`);
    });

    console.log('\nYou can now:');
    console.log('  → See them in your Jobs page');
    console.log('  → Manage them in Recruiter Dashboard');
    console.log('  → Test applications with AI scoring\n');

    process.exit(0);

  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
};

seedJobs();