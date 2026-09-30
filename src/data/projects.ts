export interface Project {
  id: string
  number: string
  title: string
  fullTitle: string
  description: string
  techStack: string[]
  category: string
  categoryLabel: string
  details: string[]
  links: {
    github?: string
    live?: string
    caseStudy?: string
  }
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 'fedllm-traffic',
    number: '01',
    title: 'FedLLM',
    fullTitle: 'Federated Large Language Model for Explainable Traffic Prediction',
    description:
      'A privacy-preserving federated LLM framework for 15–60 minute traffic prediction.',
    techStack: [
      'Federated Learning',
      'QLoRA',
      'Qwen2.5',
      'Flower',
      'FedCSS',
      'NetworkX',
      'PeMS',
    ],
    category: 'AI / ML',
    categoryLabel: 'FEDERATED SYSTEMS',
    details: [
      'Applied data-to-text prompt engineering.',
      'Used QLoRA and Qwen2.5.',
      'Implemented FedCSS aggregation.',
      'Generated flow-theory explanations.',
      'Generated dynamic Dijkstra routes.',
    ],
    links: {
      github: 'https://github.com/Aditya-Sachan-Git/FedLLM-for-Explainable-Traffic-Prediction.git',
      caseStudy: '#fedllm',
    },
    featured: true,
  },
  {
    id: 'healthcare-assistant',
    number: '02',
    title: 'MediLingo Pro',
    fullTitle: 'AI-Powered Multilingual Healthcare Assistant',
    description:
      'An AI healthcare assistant supporting multilingual voice/text interaction and NLP-based processing.',
    techStack: ['NLP', 'Multilingual Voice/Text', 'Disease Prediction', 'MongoDB'],
    category: 'AI / NLP',
    categoryLabel: 'APPLICATION',
    details: [
      'Multilingual voice/text interaction.',
      'NLP-based query processing.',
      'Symptom-oriented disease prediction.',
      'MongoDB storage and retrieval.',
      'AI-assisted healthcare information.',
    ],
    links: {
      github: 'https://github.com/Aditya-Sachan-Git/AI-Powered_Multilingual_Healthcare_Assistant.git',
    },
    featured: true,
  },
  {
    id: 'commonsai',
    number: '03',
    title: 'CommonsAI',
    fullTitle: 'AI-Powered Real-Time Contextual Chat Moderator',
    description:
      'A production-grade multilingual AI moderation platform for real-time chat safety, combining deterministic filtering, semantic search, and machine-learning-based analysis for contextual message moderation.',
    techStack: [
      'Python',
      'FastAPI',
      'Node.js',
      'Express.js',
      'FAISS',
      'Hugging Face',
      'PostgreSQL',
      'Redis',
      'Celery',
      'Docker',
      'Telegram Bot API',
      'JavaScript',
      'HTML/CSS',
    ],
    category: 'AI / SYSTEMS',
    categoryLabel: 'MODERATION PLATFORM',
    details: [
      'Built a 4-stage moderation pipeline for real-time message analysis.',
      'Combined deterministic filtering, FAISS semantic search, and ML-based analysis.',
      'Integrated Telegram and Microsoft Teams for automated message moderation.',
      'Used Redis, PostgreSQL, and Celery for low-latency scalable processing.',
      'Supported 7 languages plus Hinglish with contextual feedback.',
    ],
    links: {
      github: 'https://github.com/Aditya-Sachan-Git/AI-Powered_Real-Time_Contextual_Chat_Moderator.git',
    },
    featured: true,
  },
]
