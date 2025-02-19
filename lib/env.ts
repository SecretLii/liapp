const requiredServerEnvs = [
  'TAVILY_API_KEY',
  'DATABASE_URL'
] as const

// Type for server-side environment variables
type ServerEnv = typeof requiredServerEnvs[number]

// Function to get server-side environment variables
export function getServerEnv(key: ServerEnv): string {
  const value = process.env[key]

  if (!value) {
    throw new Error(
      `Missing required server-side environment variable: ${key}\n` +
      'Make sure you have added it to your .env file.'
    )
  }

  return value
}

// Function to validate all required environment variables
export function validateEnv() {
  const missingEnvs = requiredServerEnvs.filter(
    (env) => !process.env[env]
  )

  if (missingEnvs.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingEnvs.join(', ')}\n` +
      'Make sure you have created a .env file with all required variables.'
    )
  }
}

// Validate environment variables during development
if (process.env.NODE_ENV !== 'production') {
  validateEnv()
} 