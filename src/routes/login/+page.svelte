<script lang="ts">
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

</script>

  <div class="card bg-base-200 w-80">
    <form class="card-body" on:submit|preventDefault={handleSubmit} >
      <h1 class="card-title">Přihlásit se</h1>
      <input name="email" placeholder="Email" class="input input-bordered" bind:value={email}/>
      <input name="password" placeholder="Password" type="password" class="input input-bordered" bind:value={password}/>
      <button class="btn-primary btn"> Login </button>
    </form>
  </div>

