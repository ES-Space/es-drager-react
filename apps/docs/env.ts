import process from 'node:process'

export const BASE_PATH = process.env.NODE_ENV === 'production' ? '/es-drager-react' : ''
