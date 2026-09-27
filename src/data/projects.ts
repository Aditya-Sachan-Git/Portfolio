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
      'A privacy-preserving federated LLM framework for 15–60 minute traffic prediction using QLoRA and Qwen2.5.',
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
      'Developed a privacy-preserving federated LLM for 15–60 minute traffic prediction.',
      'Used QLoRA and Qwen2.5.',
      'Implemented FedCSS aggregation using traffic volume, temporal variance, sensor reliability, and spatial coverage.',
      'Generated flow-theory explanations.',
      'Generated dynamic Dijkstra routes from predicted traffic speeds.',
    ],
    links: {
      caseStudy: '#fedllm',
    },
    featured: true,
  },
  {
    id: 'healthcare-assistant',
    number: '02',
    title: 'Healthcare Assistant',
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
    links: {},
    featured: true,
  },
]
