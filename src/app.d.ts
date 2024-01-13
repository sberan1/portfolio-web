// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { Session } from '@supabase/supabase-js';
import { SupabaseClient } from '@supabase/supabase-js';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient<Database>;
			getSession(): Promise<Session | null>;
		} // interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
