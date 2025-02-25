import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            keyframes: {
                'spin-slow': {
                  '0%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' }
                },
                'ai-pulse': {
                  '0%': { 
                    transform: 'rotate(0deg)',
                    filter: 'drop-shadow(0 0 0 rgba(234, 179, 8, 0))',
                  },
                  '50%': {
                    transform: 'rotate(5deg)',
                    filter: 'drop-shadow(0 0 8px rgba(234, 179, 8, 0.5))',
                  },
                  '100%': {
                    transform: 'rotate(0deg)',
                    filter: 'drop-shadow(0 0 0 rgba(234, 179, 8, 0))',
                  }
                },
                'book-hover': {
                  '0%': { 
                    transform: 'translateY(0) scale(1)',
                    filter: 'brightness(100%)',
                    boxShadow: '0 0 0 rgba(0, 0, 0, 0)'
                  },
                  '50%': {
                    transform: 'translateY(-4px) scale(1.1)',
                    filter: 'brightness(110%)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
                  },
                  '100%': {
                    transform: 'translateY(0) scale(1)',
                    filter: 'brightness(100%)',
                    boxShadow: '0 0 0 rgba(0, 0, 0, 0)'
                  }
                },
                'game-pulse': {
                  '0%': { 
                    transform: 'scale(1)',
                    filter: 'brightness(100%) drop-shadow(0 0 0 rgba(16, 185, 129, 0))',
                  },
                  '30%': {
                    transform: 'scale(1.15) translateY(-2px)',
                    filter: 'brightness(130%) drop-shadow(0 4px 8px rgba(16, 185, 129, 0.4))',
                  },
                  '60%': {
                    transform: 'scale(0.95) translateY(1px)',
                    filter: 'brightness(110%) drop-shadow(0 2px 4px rgba(16, 185, 129, 0.2))',
                  },
                  '100%': {
                    transform: 'scale(1)',
                    filter: 'brightness(100%) drop-shadow(0 0 0 rgba(16, 185, 129, 0))',
                  }
                },
                'scroll-float': {
                  '0%': {
                    transform: 'translateY(0) rotate(0deg)',
                    filter: 'drop-shadow(0 0 0 rgba(99, 102, 241, 0))',
                    opacity: '1'
                  },
                  '25%': {
                    transform: 'translateY(-3px) rotate(2deg) scale(1.05)',
                    filter: 'drop-shadow(0 5px 15px rgba(99, 102, 241, 0.3))',
                    opacity: '0.9'
                  },
                  '75%': {
                    transform: 'translateY(-3px) rotate(-2deg) scale(1.05)',
                    filter: 'drop-shadow(0 5px 15px rgba(99, 102, 241, 0.3))',
                    opacity: '0.9'
                  },
                  '100%': {
                    transform: 'translateY(0) rotate(0deg)',
                    filter: 'drop-shadow(0 0 0 rgba(99, 102, 241, 0))',
                    opacity: '1'
                  }
                },
                'sword-slash': {
                  '0%': {
                    transform: 'scale(1) rotate(0deg)',
                    filter: 'brightness(100%) drop-shadow(0 0 0 rgba(239, 68, 68, 0))',
                  },
                  '15%': {
                    transform: 'scale(1.1) rotate(-20deg)',
                    filter: 'brightness(150%) drop-shadow(2px 2px 4px rgba(239, 68, 68, 0.6))',
                  },
                  '30%': {
                    transform: 'scale(1.2) rotate(45deg)',
                    filter: 'brightness(200%) drop-shadow(4px 4px 8px rgba(239, 68, 68, 0.8))',
                  },
                  '45%': {
                    transform: 'scale(1.1) rotate(90deg)',
                    filter: 'brightness(150%) drop-shadow(2px 2px 4px rgba(239, 68, 68, 0.6))',
                  },
                  '100%': {
                    transform: 'scale(1) rotate(90deg)',
                    filter: 'brightness(100%) drop-shadow(0 0 0 rgba(239, 68, 68, 0))',
                  }
                },
                'ai-scan': {
                  '0%': { 
                    clipPath: 'inset(0 0 0 0)',
                    filter: 'hue-rotate(0deg) brightness(100%) saturate(100%)',
                    transform: 'scale(1)'
                  },
                  '30%': {
                    clipPath: 'inset(0 0 0 0)',
                    filter: 'hue-rotate(20deg) brightness(150%) saturate(200%)',
                    transform: 'scale(1.1)'
                  },
                  '50%': {
                    clipPath: 'inset(50% 0 0 0)',
                    filter: 'hue-rotate(340deg) brightness(200%) saturate(300%)',
                    transform: 'scale(1.1)'
                  },
                  '80%': {
                    clipPath: 'inset(0 0 50% 0)',
                    filter: 'hue-rotate(350deg) brightness(150%) saturate(200%)',
                    transform: 'scale(1.1)'
                  },
                  '100%': {
                    clipPath: 'inset(0 0 0 0)',
                    filter: 'hue-rotate(360deg) brightness(100%) saturate(100%)',
                    transform: 'scale(1)'
                  }
                }
            },
            animation: {
                'spin-slow': 'spin-slow 2s linear infinite',
                'ai-pulse': 'ai-pulse 2s ease-in-out infinite',
                'book-hover': 'book-hover 2s ease-in-out infinite',
                'game-pulse': 'game-pulse 3s ease-in-out infinite',
                'scroll-float': 'scroll-float 3s ease-in-out infinite',
                'sword-slash': 'sword-slash 2s ease-in-out infinite',
                'ai-scan': 'ai-scan 3s ease-in-out infinite'
            },
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            }
        }
    },
    plugins: [require("tailwindcss-animate")]
};

export default config;