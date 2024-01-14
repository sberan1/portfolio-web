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
<svelte:head>
  <title>Admin Dashboard</title>
</svelte:head>
<div class="flex">
  <div class="sidebar bg-secondary text-black h-fit sticky w-64 p-5 top-20 z-10">
    <a href="/admin" class="text-black block py-2 px-3 rounded hover:bg-accent">Dashboard</a>
    <a href="/admin/skills" class="text-black block py-2 px-3 rounded hover:bg-accent">Skills</a>
    <a href="/admin/links" class="block text-black py-2 px-3 rounded hover:bg-accent">Links</a>
    <a href="/admin/education" class="block text-black py-2 px-3 rounded hover:bg-accent">Education</a>
    <a href="/admin/experience" class="block py-2 px-3 text-black rounded hover:bg-accent">Experience</a>
    <a href="/admin/projects" class="block py-2 px-3 rounded text-black hover:bg-accent ">Projects</a>
    <button on:click|preventDefault={logout} class="btn-error btn mt-4">Log out</button>
  </div>
  <div class="m-10 top-0 grow max-w-6xl">
    <slot />
  </div>
</div>
