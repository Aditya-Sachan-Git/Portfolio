/* ═══════════════════════════════════════════════════
   Skills & Technology — Data Model
   ═══════════════════════════════════════════════════ */

export interface SystemNode {
  id: string
  label: string
  shortLabel: string
  x: number // percentage position (0-100)
  y: number
}

export interface TechNode {
  id: string
  label: string
  category: string
  x: number
  y: number
  connections: string[] // system IDs this tech connects to
}

/* ── Central project/system nodes ── */

export const systemNodes: SystemNode[] = [
  {
    id: 'fedllm',
    label: 'FedLLM',
    shortLabel: 'FedLLM',
    x: 22,
    y: 28,
  },
  {
    id: 'healthcare',
    label: 'AI-Powered Multilingual Healthcare Assistant',
    shortLabel: 'MediLingo Pro',
    x: 74,
    y: 26,
  },
  {
    id: 'commonsai',
    label: 'CommonsAI / Real-Time Contextual Chat Moderator',
    shortLabel: 'CommonsAI',
    x: 25,
    y: 66,
  },
  {
    id: 'srf',
    label: 'SRF Limited / Enterprise Software + BI',
    shortLabel: 'SRF Limited',
    x: 70,
    y: 64,
  },
]

/* ── Technology nodes ── */

export const techNodes: TechNode[] = [
  // Languages
  { id: 'python',     label: 'Python',     category: 'Languages', x: 46, y: 22, connections: ['fedllm', 'healthcare', 'commonsai'] },
  { id: 'javascript', label: 'JavaScript', category: 'Languages', x: 32, y: 80, connections: ['commonsai'] },
  { id: 'java',       label: 'Java',       category: 'Languages', x: 56, y: 12, connections: [] },
  { id: 'c',          label: 'C',          category: 'Languages', x: 66, y: 8,  connections: [] },
  { id: 'cpp',        label: 'C++',        category: 'Languages', x: 74, y: 14, connections: [] },

  // AI / Machine Learning
  { id: 'llm-apps',    label: 'LLM Applications',       category: 'AI / ML', x: 44, y: 34, connections: ['fedllm', 'healthcare'] },
  { id: 'prompt-eng',  label: 'Prompt Engineering',      category: 'AI / ML', x: 10, y: 40, connections: ['fedllm'] },
  { id: 'nlp',         label: 'NLP',                     category: 'AI / ML', x: 80, y: 18, connections: ['healthcare', 'commonsai'] },
  { id: 'ml',          label: 'Machine Learning',        category: 'AI / ML', x: 36, y: 8,  connections: ['fedllm', 'healthcare', 'commonsai'] },
  { id: 'tsf',         label: 'Time-Series Forecasting', category: 'AI / ML', x: 10, y: 50, connections: ['fedllm'] },
  { id: 'faiss',       label: 'FAISS',                   category: 'AI / ML', x: 36, y: 56, connections: ['commonsai'] },
  { id: 'huggingface', label: 'Hugging Face',            category: 'AI / ML', x: 38, y: 68, connections: ['commonsai'] },

  // Frameworks
  { id: 'fastapi', label: 'FastAPI',    category: 'Frameworks', x: 10, y: 60, connections: ['commonsai'] },
  { id: 'nodejs',  label: 'Node.js',    category: 'Frameworks', x: 36, y: 62, connections: ['commonsai'] },
  { id: 'express', label: 'Express.js', category: 'Frameworks', x: 38, y: 74, connections: ['commonsai'] },
  { id: 'celery',  label: 'Celery',     category: 'Frameworks', x: 10, y: 72, connections: ['commonsai'] },
  { id: 'flask',   label: 'Flask',      category: 'Frameworks', x: 84, y: 44, connections: [] },
  { id: 'html5',   label: 'HTML5',      category: 'Frameworks', x: 84, y: 56, connections: [] },
  { id: 'css3',    label: 'CSS3',       category: 'Frameworks', x: 84, y: 50, connections: [] },

  // Developer Tools
  { id: 'docker',      label: 'Docker',           category: 'Dev Tools', x: 10, y: 82, connections: ['commonsai'] },
  { id: 'telegram',    label: 'Telegram Bot API', category: 'Dev Tools', x: 14, y: 92, connections: ['commonsai'] },
  { id: 'github',      label: 'GitHub',           category: 'Dev Tools', x: 26, y: 42, connections: ['fedllm'] },
  { id: 'vscode',      label: 'VS Code',          category: 'Dev Tools', x: 8,  y: 20, connections: [] },
  { id: 'antigravity', label: 'Antigravity',      category: 'Dev Tools', x: 8,  y: 12, connections: ['fedllm'] },

  // Databases
  { id: 'postgresql', label: 'PostgreSQL',    category: 'Databases', x: 32, y: 88, connections: ['commonsai'] },
  { id: 'redis',      label: 'Redis',         category: 'Databases', x: 22, y: 84, connections: ['commonsai'] },
  { id: 'mongodb',    label: 'MongoDB Atlas', category: 'Databases', x: 84, y: 36, connections: ['healthcare'] },
  { id: 'sqlite',     label: 'SQLite',        category: 'Databases', x: 86, y: 68, connections: [] },

  // BI / Analytics
  { id: 'dashboard', label: 'Dashboard Development', category: 'BI / Analytics', x: 50, y: 76, connections: ['srf'] },
  { id: 'dataviz',   label: 'Data Visualization',   category: 'BI / Analytics', x: 54, y: 88, connections: ['srf'] },
  { id: 'bi',        label: 'Business Intelligence', category: 'BI / Analytics', x: 90, y: 78, connections: ['srf'] },
]

/* ── Connection computation ── */

export interface Connection {
  techId: string
  systemId: string
  x1: number
  y1: number
  x2: number
  y2: number
}

export function computeConnections(): Connection[] {
  return techNodes.flatMap((tech) =>
    tech.connections.map((sysId) => {
      const sys = systemNodes.find((s) => s.id === sysId)!
      return {
        techId: tech.id,
        systemId: sysId,
        x1: tech.x,
        y1: tech.y,
        x2: sys.x,
        y2: sys.y,
      }
    })
  )
}

/* ── Mobile grouping ── */

export interface SystemGroup {
  system: SystemNode
  techs: TechNode[]
}

export function getSystemGroups(): SystemGroup[] {
  return systemNodes.map((sys) => ({
    system: sys,
    techs: techNodes.filter((t) => t.connections.includes(sys.id)),
  }))
}

export function getUnconnectedTechs(): TechNode[] {
  return techNodes.filter((t) => t.connections.length === 0)
}
