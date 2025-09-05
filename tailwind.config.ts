import type { Config } from 'tailwindcss';

export default {
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}"
    ],
    theme: {
        extend: {
            keyframes: {
                pop: { '0%': { transform: 'scale(0.9)' }, '100%': { transform: 'scale(1)' } },
                confetti: {
                    '0%': { transform: 'translateY(-20px)' },
                    '100%': { transform: 'translateY(20px)' }
                }
            },
            animation: {
                pop: 'pop 120ms ease-out',
                confetti: 'confetti 800ms ease-in-out infinite alternate'
            }
        }
    },
    plugins: []
} satisfies Config;
