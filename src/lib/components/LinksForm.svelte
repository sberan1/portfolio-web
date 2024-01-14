<script lang="ts">
  import Icon from "@iconify/svelte";
  import IconSelect from "$lib/components/IconSelect.svelte";
  import { supabase } from "$lib/supabaseClient";

  export let data;
  let selectedIcon = "cib:angular";
  let linkName = "";
  let linkUrl = "";
  let editId;

  async function saveLink(){
    if (!editId) {
      await supabase.from('Link').insert(
        { name: linkName, logo: selectedIcon, url: linkUrl },
      );}
    else{
      await supabase.from('Link').update({ name: linkName, logo: selectedIcon, url: linkUrl }).match({ id: editId });
      editId=undefined;
      linkUrl = "";
      selectedIcon = "cib:figma";
      linkName = "";
    }
    let temp = await supabase.from('Link').select('*');
    data = temp.data;

  }

async function deleteLink(id){
    await supabase.from('Link').delete().match({ id: id });
    let temp = await supabase.from('Link').select('*');
    data = temp.data;
  }

  async function updateLink(id){
    let temp = await supabase.from('Link').select('*').match({ id: id }).limit(1).single();
    editId = id;
    linkUrl = temp.data.url;
    selectedIcon = temp.data.logo;
    linkName = temp.data.name;
  }

</script>


<div class="card bg-base-300 mb-10">
  <div class="card-header">
    <h1 class="card-title m-5 text-5xl text-neutral">New Link</h1>
  </div>
  <div class="card-body">
    <div class="rounded-full bg-base-200 h-20 w-20 flex items-center justify-center">
      <Icon class="h-10 w-10" icon="{selectedIcon}" />
    </div>
    <h3 class="text-neutral">Selected icon</h3>
    <IconSelect bind:selectedIcon />
    <label class="form-control w-full  my-10">
      <div class="label">
        <span class="label-text">Name of the Link?</span>
      </div>
      <input type="text" placeholder="Name of the link" class="input input-accent input-bordered w-full" bind:value={linkName} />
    </label>

    <label class="form-control w-full  mb-10">
      <div class="label">
        <span class="label-text">URL of the Link?</span>
      </div>
      <input type="text" placeholder="URL" class="input input-accent input-bordered w-full" bind:value={linkUrl} />
    </label>
    <button class="btn btn-accent" on:click|preventDefault={saveLink}>Add Link</button>
  </div>
</div>

<div class="card bg-base-300">
  <div class="card-header">
    <h2 class="card-title m-5 text-3xl text-neutral">Current Links</h2>
  </div>
  <div class="card-body">
    {#each data as link}
    <div class="card bg-base-200 mx-3 my-2 flex flex-row align-center items-center justify-between">
      <div class="flex flex-row items-center">
        <Icon icon="{link.logo}" class="h-10 w-10 mx-4" />
        <kbd class="kbd mr-4 text-neutral">{link.name}</kbd>
        <kbd class="kbd overflow-hidden text-neutral">{link.url}</kbd>
      </div>
      <div class="buttons mx-4">
      <button class="btn btn-square btn-success my-4" on:click|preventDefault={()=>(updateLink(link.id))}>
        <Icon class="h-6 w-6" icon="material-symbols:edit" />
      </button>
      <button class="btn btn-square btn-error my-4" on:click|preventDefault={()=>(deleteLink(link.id))}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
      </div>
    </div>
      {/each}
  </div>
</div>
