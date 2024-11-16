import type { Config } from 'tailwindcss'
import config from './config'

export default <Partial<Config>>{
    theme: {
        extend: {
            colors: {
                ...config.tailwindColors
            }
        }
    }
}