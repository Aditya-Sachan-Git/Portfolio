export interface ResearchTopic {
  id: string
  title: string
  connectsToFedLLM: boolean
}

export const researchTopics: ResearchTopic[] = [
  { id: 'fl', title: 'Federated Learning', connectsToFedLLM: true },
  { id: 'llm', title: 'Large Language Models', connectsToFedLLM: true },
  { id: 'xai', title: 'Explainable AI', connectsToFedLLM: true },
  { id: 'tf', title: 'Traffic Forecasting', connectsToFedLLM: true },
  { id: 'ppai', title: 'Privacy-Preserving AI', connectsToFedLLM: true },
  { id: 'its', title: 'Intelligent Transportation Systems', connectsToFedLLM: true },
  { id: 'realtime-ai', title: 'Real-Time AI Systems', connectsToFedLLM: false },
  { id: 'multilingual-ai', title: 'Multilingual AI', connectsToFedLLM: false },
  { id: 'contextual-moderation', title: 'Contextual AI Moderation', connectsToFedLLM: false },
  { id: 'nlp', title: 'NLP', connectsToFedLLM: false },
  { id: 'ml', title: 'Machine Learning', connectsToFedLLM: false },
]
