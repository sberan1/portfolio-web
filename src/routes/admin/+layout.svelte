<script lang="ts">
  import { supabase } from "$lib/supabaseClient";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  async function checkUser() {
    const user = await supabase.auth.getSession();
    if (!user.data.session) {
      goto("/login");
    }
  }

  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) console.log("Error logging out:", error.message);
    else goto("/login");
  }

  onMount(checkUser)

</script>

<div class="flex">
  <div class="sidebar bg-secondary text-white h-fit sticky w-64 p-5 top-20 z-10">
    <a href="/admin" class="text-neutral block py-2 px-3 rounded hover:bg-accent">Dashboard</a>
    <a href="/admin/skills" class="text-neutral block py-2 px-3 rounded hover:bg-accent">Skills</a>
    <a href="/admin/links" class="block text-neutral py-2 px-3 rounded hover:bg-accent">Links</a>
    <a href="#section3" class="block text-neutral py-2 px-3 rounded hover:bg-accent">Education</a>
    <a href="#section4" class="block py-2 px-3 text-neutral rounded hover:bg-accent">Experience</a>
    <a href="#section4" class="block py-2 px-3 rounded text-neutral hover:bg-accent ">Projects</a>
    <button on:click|preventDefault={logout} class="btn-error btn">Log out</button>
  </div>
  <div class="m-10 top-0 grow max-w-6xl">
    <slot />
  </div>
</div>
