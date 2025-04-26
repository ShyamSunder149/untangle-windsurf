// src/types/index.ts

// Define the structure of your user interaction data
export interface UserInteraction {
  id: number;
  created_at: string; // Timestamp of the interaction
  website: string; // The website domain (e.g., 'example.com')
  website_path: string; // The path on the website (e.g., '/page/article') // Keeping this for now, maybe phase out?
  path?: string; // Optional path field
  details?: string; // Optional details field (keep or remove as needed)
  // Add other relevant fields from your table if needed, e.g., duration
}
