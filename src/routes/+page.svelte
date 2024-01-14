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

<Hero name={data.user.data.name} position={data.user.data.position_name} picture={data.user.data.picture} links={data.links}/>
  <h2 class="text-3xl text-neutral mb-5" id="Skills">Skills</h2>
  <div class="skills flex-row flex-wrap justify-evenly flex">
    {#each data.skills as skill}
      <Skill logo={skill.logo} rating={Number(skill.knowledge)}/>
    {/each}
</div>
  <h2 class="text-3xl text-neutral mb-5 pt-4" id="Education">Education</h2>
  <div class="education carousel w-auto">
    {#each data.education as education}
      <Education startDate={education.start_date} endDate={education.end_date} logo={education.logo} description={education.description} title={education.name}/>
    {/each}
  </div>
  <h2 class="text-3xl text-neutral mb-5 pt-4" id="Experience">Experience</h2>
  <div class="experience carousel w-auto">
    {#each data.experience as experience}
      <Experience startDate={experience.start_date} endDate={experience.end_date} logo={experience.logo} position={experience.position} description={experience.description} name={experience.name}/>
    {/each}
  </div>
  <h2 class="text-3xl text-neutral mb-5 pt-4" id="Projects">Projects</h2>
  <div class="project carousel w-auto">
    <Project/>
    <Project/>
    <Project/>
    <Project/>
    <Project/>
    <Project/>
  </div>
</div>
