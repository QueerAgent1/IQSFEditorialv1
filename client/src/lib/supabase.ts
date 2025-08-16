// This file provides a mock Supabase client interface for use with the in-memory storage
// In production, this would connect to the actual Supabase instance

export interface SupabaseClient {
  from: (table: string) => any;
}

// Mock client that works with our in-memory storage via API calls
export const createClient = (url: string, key: string): SupabaseClient => {
  return {
    from: (table: string) => ({
      select: (query = '*') => ({
        async then(resolve: (result: any) => void) {
          try {
            const response = await fetch(`/api/${table}`);
            const data = await response.json();
            resolve({ data, error: null });
          } catch (error) {
            resolve({ data: null, error });
          }
        }
      }),
      insert: (data: any) => ({
        async then(resolve: (result: any) => void) {
          try {
            const response = await fetch(`/api/${table}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });
            const result = await response.json();
            resolve({ data: result, error: null });
          } catch (error) {
            resolve({ data: null, error });
          }
        }
      })
    })
  };
};

// Initialize with environment variables or fallbacks
export const supabase = createClient(
  process.env.VITE_SUPABASE_URL || 'http://localhost:5000',
  process.env.VITE_SUPABASE_ANON_KEY || 'mock-key'
);
