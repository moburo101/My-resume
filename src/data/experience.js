// Add a role by copying the template below into experienceEntries.
// Use a unique id and YYYY-MM dates. The timeline sorts newest first.
// Set datesVerified only after checking dates. For a current role, omit endDate
// and set isCurrent: true. Add quantified outcomes only when confirmed.
/*
{
  id: 'unique-role-id',
  company: 'Company name',
  jobTitle: 'Job title',
  startDate: '2026-01',
  endDate: '2026-06',
  isCurrent: false,
  datesVerified: true,
  responsibilities: ['Describe a responsibility.'],
  outcomes: [], // Optional: [{ text: 'A confirmed result.', confirmed: true }]
},
*/

export const experienceEntries = [
  {
    id: 'olive-march-web-developer',
    company: 'Olive & March Partners Limited',
    jobTitle: 'Content Management Services and Web Developer',
    startDate: '2026-02',
    isCurrent: true,
    datesVerified: true,
    responsibilities: [
      'Manage and maintain WordPress and React-based websites.',
      'Handle CMS administration, website updates, frontend adjustments, analytics, SEO configuration, deployment, and troubleshooting.',
      'Work with Google Analytics 4, MonsterInsights, Google Site Kit, Rank Math, Looker Studio, and related analytics tools.',
      'Configure website tracking and reporting systems.',
      'Troubleshoot WordPress plugins, Elementor, site performance, analytics integrations, and frontend issues.',
      'Support ongoing website development and technical operations.',
      'Work on both The Daily Circular and Mass Meter Nigeria web properties.',
      'Assist with API and analytics integration into internal tools.',
    ],
    outcomes: [],
  },
  {
    id: 'multi-tasks-siwes',
    company: 'Multi Tasks Ltd, Abuja',
    jobTitle: 'Data Analyst / ICT Intern — SIWES',
    startDate: '2025-05',
    endDate: '2025-11',
    isCurrent: false,
    datesVerified: true,
    responsibilities: [
      'Worked with internet usage data for approximately 82 schools connected through YahClick services across Northern Nigeria.',
      'Prepared monthly internet usage reports for individual schools.',
      'Generated quarterly usage summaries measured in terabytes.',
      'Created charts and visual reports for school internet usage.',
      'Assisted with account expiry monitoring and usage tracking.',
      'Supported preparation of monthly review materials and presentations for NCC-related reporting.',
      'Migrated records and reporting workflows to Google Drive and Google Sheets.',
      'Organized shared folders and cloud-based documentation.',
      'Performed general ICT and administrative tasks.',
    ],
    outcomes: [],
  },
  {
    id: 'cysec-cms-manager',
    company: 'CYSEC NG',
    jobTitle: 'CMS Manager',
    startDate: '2022-03',
    endDate: '2022-04',
    isCurrent: false,
    datesVerified: true,
    responsibilities: [
      'Debugged the main and academy websites using WordPress and native development environments.',
      'Contributed to the team building the WordPress store website.',
    ],
    outcomes: [],
  },
]
