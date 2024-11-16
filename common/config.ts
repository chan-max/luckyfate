

export interface Config {
    tailwindColors: Record<string, Record<string, string>>; // Custom Tailwind color configuration
    brandName: string; // The name of the brand or application
    tagline: string; // A short tagline or slogan for the application
    apiKey: string; // API key used for authenticating requests
    apiURL: string; // Base URL for the application's API
    gtmID?: string; // Optional Google Tag Manager ID
    favicon: string; // Path to the application's favicon
    metaDescription: string; // SEO description for the application
    metaKeywords: string; // SEO keywords for the application
}


export function defineConfig(config: Config): Config {
    return config;
}