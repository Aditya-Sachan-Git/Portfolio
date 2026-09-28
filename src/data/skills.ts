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
    x: 25,
    y: 32,
  },
  {
    id: 'healthcare',
    label: 'AI-Powered Multilingual Healthcare Assistant',
    shortLabel: 'MediLingo Pro',
    x: 70,
    y: 30,
  },
  {
    id: 'srf',
    label: 'SRF Limited / Enterprise Software + BI',
    shortLabel: 'SRF Limited',
    x: 48,
    y: 74,
  },
]

/* ── Technology nodes ── */

export const techNodes: TechNode[] = [
  // Languages
  { id: 'python',  label: 'Python',  category: 'Languages', x: 38, y: 18, connections: ['fedllm', 'healthcare'] },
  { id: 'java',    label: 'Java',    category: 'Languages', x: 54, y: 11, connections: [] },
  { id: 'c',       label: 'C',       category: 'Languages', x: 62, y: 9,  connections: [] },
  { id: 'cpp',     label: 'C++',     category: 'Languages', x: 68, y: 14, connections: [] },

  // AI / Machine Learning
  { id: 'llm-apps',   label: 'LLM Applications',       category: 'AI / ML', x: 36, y: 44, connections: ['fedllm', 'healthcare'] },
  { id: 'prompt-eng', label: 'Prompt Engineering',      category: 'AI / ML', x: 15, y: 50, connections: ['fedllm'] },
  { id: 'nlp',        label: 'NLP',                     category: 'AI / ML', x: 78, y: 18, connections: ['healthcare'] },
  { id: 'ml',         label: 'Machine Learning',        category: 'AI / ML', x: 44, y: 8,  connections: ['fedllm', 'healthcare'] },
  { id: 'tsf',        label: 'Time-Series Forecasting', category: 'AI / ML', x: 18, y: 64, connections: ['fedllm'] },

  // Frameworks
  { id: 'flask', label: 'Flask', category: 'Frameworks', x: 80, y: 52, connections: [] },
  { id: 'html5', label: 'HTML5', category: 'Frameworks', x: 80, y: 62, connections: [] },
  { id: 'css3',  label: 'CSS3',  category: 'Frameworks', x: 78, y: 72, connections: [] },

  // Developer Tools
  { id: 'github',       label: 'GitHub',       category: 'Dev Tools', x: 28, y: 46, connections: ['fedllm'] },
  { id: 'vscode',       label: 'VS Code',      category: 'Dev Tools', x: 20, y: 78, connections: [] },
  { id: 'antigravity',  label: 'Antigravity',  category: 'Dev Tools', x: 14, y: 22, connections: ['fedllm'] },

  // Databases
  { id: 'mongodb', label: 'MongoDB Atlas', category: 'Databases', x: 80, y: 38, connections: ['healthcare'] },
  { id: 'sqlite',  label: 'SQLite',        category: 'Databases', x: 76, y: 82, connections: [] },

  // BI / Analytics
  { id: 'dashboard', label: 'Dashboard Development', category: 'BI / Analytics', x: 28, y: 84, connections: ['srf'] },
  { id: 'dataviz',   label: 'Data Visualization',   category: 'BI / Analytics', x: 48, y: 88, connections: ['srf'] },
  { id: 'bi',        label: 'Business Intelligence', category: 'BI / Analytics', x: 64, y: 84, connections: ['srf'] },
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
