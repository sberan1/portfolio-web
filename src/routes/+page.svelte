<script lang="ts">
import Skill from "$lib/components/Skill.svelte";
import Hero from "$lib/components/Hero.svelte";
import Education from "$lib/components/Education.svelte";
import Experience from "$lib/components/Experience.svelte";
import Project from "$lib/components/Project.svelte";
export let data;
</script>


<svelte:head>
    <title>Štěpán Beran</title>
</svelte:head>

<div class="p-10">

<Hero name={data.user.name} position={data.user.positionName} picture={data.user.picture}/>
<h2 class="text-3xl text-neutral mb-5">Skills</h2>
  <div class="skills flex-row flex-wrap justify-evenly flex">
    <Skill rating={5} />
    <Skill rating={5} />
    <Skill rating={5} />
    <Skill rating={5} />
    <Skill rating={5} />
    <Skill rating={5} />
    <Skill rating={5} />
    <Skill rating={5} />
    <Skill rating={5} />
    <Skill rating={5} />
    <Skill rating={5} />
    <Skill rating={5} />
    <Skill rating={5} />
    <Skill rating={5} />
    <Skill rating={5} />
    <Skill rating={5} />
    <Skill rating={5} />
    <Skill rating={5} />
    <Skill rating={5} />
    <Skill rating={5} />
    <Skill rating={5} />
    <Skill rating={5} />
    <Skill rating={5} />
    <Skill rating={5} />
    <Skill rating={5} />
    <Skill rating={5} />
    <Skill rating={5} />
    <Skill rating={5} />
    <Skill rating={5} />
    <Skill rating={5} />
</div>
  <h2 class="text-3xl text-neutral mb-5 pt-4 ">Education</h2>
  <div class="education carousel w-auto">
    <Education/>
    <Education/>
    <Education/>
    <Education/>
    <Education/>
  </div>
  <h2 class="text-3xl text-neutral mb-5 pt-4">Experience</h2>
  <div class="experience carousel w-auto">
    <Experience/>
    <Experience/>
    <Experience/>
    <Experience/>
    <Experience/>
  </div>
  <h2 class="text-3xl text-neutral mb-5 pt-4">Projects</h2>
  <div class="project carousel w-auto">
    <Project/>
    <Project/>
    <Project/>
    <Project/>
    <Project/>
    <Project/>
  </div>
</div>
