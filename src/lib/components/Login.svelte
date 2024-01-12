<script lang="ts">

  let loading = false
  let email = ''
</script>

<div class="card bg-base-200 w-80">
  <form class="card-body" on:submit|preventDefault="{handleLogin}">
    <h1 class="card-title">Přihlásit se</h1>
    <input placeholder="Email" class="input input-bordered" bind:value={email}/>
    <input placeholder="Password" type="password" class="input input-bordered" bind:value={email}/>
    <button type="submit" class="btn btn-primary" aria-live="polite" disabled="{loading}">
      <span>{loading ? 'Loading' : 'Login'}</span>
    </button>
  </form>
</div>
