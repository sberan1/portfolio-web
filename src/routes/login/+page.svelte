<script lang="ts">
import  Icon  from '@iconify/svelte';
import { icons } from '@iconify-json/cib';
import Login from "$lib/components/Login.svelte";

export let data;
// Log the icon names
const iconArray = Object.entries(icons.icons).map(([name, body]) => ({ name, body }));

</script>

  <div class="card bg-base-200 w-80">
    <form class="card-body" action="?/login" method="post" >
      <h1 class="card-title">Přihlásit se</h1>
      <input name="email" placeholder="Email" class="input input-bordered"/>
      <input name="password" placeholder="Password" type="password" class="input input-bordered" />
      <button class="btn-primary btn"> Login </button>
    </form>
  </div>
  <!-- {#each iconArray as icon (icon.name)}
    <div>
      <h2>{icon.name}</h2>
      <svg class="fill-neutral h-6 w-6">{@html icon.body.body}</svg>
    </div>
  {/each} -->
