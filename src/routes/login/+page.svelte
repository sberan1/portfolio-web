<script lang="ts">
import  Icon  from '@iconify/svelte';
import { icons } from '@iconify-json/cib';
import {supabase} from "$lib/supabaseClient";
import { goto } from "$app/navigation";

 let email = ''
 let password = ''

async function handleSubmit() {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error('Error: ', error.message);
  } else {
    // Redirect user to home page or dashboard
    await goto('/admin');
  }
}
export let data;
// Log the icon names
const iconArray = Object.entries(icons.icons).map(([name, body]) => ({ name, body }));

</script>

  <div class="card bg-base-200 w-80">
    <form class="card-body" on:submit|preventDefault={handleSubmit} >
      <h1 class="card-title">Přihlásit se</h1>
      <input name="email" placeholder="Email" class="input input-bordered" bind:value={email}/>
      <input name="password" placeholder="Password" type="password" class="input input-bordered" bind:value={password}/>
      <button class="btn-primary btn"> Login </button>
    </form>
  </div>
  <!-- {#each iconArray as icon (icon.name)}
    <div>
      <h2>{icon.name}</h2>
      <svg class="fill-neutral h-6 w-6">{@html icon.body.body}</svg>
    </div>
  {/each} -->
