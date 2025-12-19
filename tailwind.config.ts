import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/app/**/*.(js, jsx, ts, tsx)',
        './src/componants/**/*.(js, jsx, ts, tsx)',
        './src/pages/**/*.(js, jsx, ts, tsx)'
    ],
    theme: {
        extend: {
            animation: {
                'bounce-slow': 'bounce 2s infinite',
            },
        },
    },
    plugins: [],
}

export default config;