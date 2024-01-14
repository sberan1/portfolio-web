<script lang="ts">
  import  Icon  from '@iconify/svelte';
  import { icons } from "@iconify-json/cib";
  import { supabase } from "$lib/supabaseClient";
  import  Skill from "$lib/components/Skill.svelte";
  import IconSelect from "$lib/components/IconSelect.svelte";

  let skillLevel = 0.5;
  let selectedIcon = "cib:figma";
  let skillName = "";
  let editId;
  export let rawSkills = [];

  async function addSkill() {
    if (!editId) {
    await supabase.from('Skill').insert(
      { name: skillName, logo: selectedIcon, knowledge: skillLevel },
    );}
    else{
      await supabase.from('Skill').update({ name: skillName, logo: selectedIcon, knowledge: skillLevel }).match({ id: editId });
      editId=undefined;
      skillLevel = 0;
      selectedIcon = "cib:figma";
      skillName = "";
      }
    let temp = await supabase.from('Skill').select('*');
    rawSkills = temp.data;
  }

  async function deleteSkill(id) {
    await supabase.from('Skill').delete().match({ id: id });
    let temp = await supabase.from('Skill').select('*');
    rawSkills = temp.data;
  }

  async function editSkill(id) {
    editId = id;
    let temp = await supabase.from('Skill').select('*').match({ id: id }).limit(1).single();
    console.log(temp)
    skillName = temp.data.name;
    skillLevel = temp.data.knowledge;
    selectedIcon = temp.data.logo;
  }

</script>

<div class="card bg-base-300 ">
  <div class="card-header">
    <h1 class="card-title m-5 text-5xl text-neutral">New Skill</h1>
  </div>
  <!-- /.card-header -->
  <div class="card-body">
    <div class="rounded-full bg-base-200 h-20 w-20 flex items-center justify-center">
      <Icon class="h-10 w-10" icon="{selectedIcon}" />
    </div>
    <h3 class="text-neutral">Selected icon</h3>
    <IconSelect bind:selectedIcon={selectedIcon} />
    <label class="form-control w-full  my-10">
      <div class="label">
        <span class="label-text">Name of the skill?</span>
      </div>
      <input type="text" placeholder="Name of the skill?" class="input input-accent input-bordered w-full" bind:value={skillName} />
    </label>
    <h3 class="text-neutral">Choose a skill level</h3>
    <input type="range" min="0" max="5" bind:value={skillLevel} class="range range-accent" step="0.5" />
    <kbd class="kbd mt-2">{skillLevel}</kbd>
      <button class="btn btn-accent mt-10" on:click|preventDefault={addSkill}>Add Skill</button>
  </div>
</div>
<div class="card bg-base-300">
  <div class="card-header">
    <h2 class="card-title m-5 text-5xl text-neutral">All skills</h2>
  </div>
  <div class="card-body">
    <div class="flex flex-row flex-wrap">
    {#each rawSkills as skill}
      <div class="mr-3 flex flex-row">
      <button class="btn btn-square btn-success my-4" on:click|preventDefault={() => (editSkill(skill.id))}>
        <Icon class="h-6 w-6" icon="material-symbols:edit" />
      </button>
      <Skill logo={skill.logo} rating={Number(skill.knowledge)}/>
      <button class="btn btn-square btn-error my-4" on:click|preventDefault={() => (deleteSkill(skill.id))}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
      </div>
    {/each}
    </div>
  </div>
</div>
