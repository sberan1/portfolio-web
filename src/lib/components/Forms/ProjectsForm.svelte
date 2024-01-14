<script lang="ts">
  import FileInputBig from "$lib/components/FileInputBig.svelte";
  import Icon from "@iconify/svelte";
  import { supabase } from "$lib/supabaseClient";

  export let data;
  let selectedFile;
  let projectName = "";
  let projectDescription = "";
  let projectGithubLink  = "";
  let projectLiveDemoLink = "";
  let projectShortDescription = "";
  let skills = [];
  let uploadedFilePath = "";
  let editId;


  function addToProjectSkills(id){
    if(skills.includes(id)){
      const index = skills.indexOf(id);
      if (index > -1) {
        skills.splice(index, 1);
        console.log("removed skill", id)
      }
    }
    else {
      skills.push(id);
      console.log("added skill", id);
    }
  }

  async function uploadFile() {
    const file = selectedFile[0];
    if (!file) return;

    const filePath = `Project_themes/${projectName}${Math.random()*100000}${file.name}`;
    const { data, error } = await supabase.storage.from('Profile_images').upload(filePath, file)

    if (error) {
      console.log(error)
    } else {
      console.log(data)
      uploadedFilePath = "https://cswghpezojfyfalgtuyx.supabase.co/storage/v1/object/public/" +  data.fullPath;
    }
  }

  async function saveProject() {
    if (!editId) {
      if (!selectedFile){
        return alert("Please select a file to upload");
      }
      await uploadFile();
      const project = await supabase.from("Experience").insert([
        {
          short_description: projectShortDescription,
          description: projectDescription,
          github_link: projectGithubLink,
          live_demo_link: projectLiveDemoLink,
          name: projectName,
          image: uploadedFilePath,
        }]);
        skills.forEach((skill) => {
         supabase.from("Project_to_Skill").insert([
          {
            project_id: project.data.id,
            skill_id: skill,
          }]);
      });
    }
    else{
      const project = await supabase.from("Experience").update({
        short_description: projectShortDescription,
        description: projectDescription,
        github_link: projectGithubLink,
        live_demo_link: projectLiveDemoLink,
        name: projectName,
        image: uploadedFilePath,
      }).match({id: editId});

      await supabase
        .from('Project_to_Skill')
        .delete()
        .eq('project_id', project.data.id);

      skills.forEach((skill) => {
        supabase.from("Project_to_Skill").insert([
          {
            project_id: project.data.id,
            skill_id: skill,
          }]);
      });
      projectName = "";
      projectDescription = "";
      projectGithubLink  = "";
      projectLiveDemoLink = "";
      projectShortDescription = "";
      skills = [];
      uploadedFilePath = "";
      editId = undefined;
    }
  }
</script>


<div class="card bg-base-300 ">
  <div class="card-header">
    <h1 class="card-title m-5 text-5xl text-neutral">New Experience</h1>
  </div>
  <!-- /.card-header -->
  <div class="card-body">
    <label class="form-control w-full  my-4">
      <div class="label">
        <span class="label-text">Name of the Project?</span>
      </div>
      <input type="text" placeholder="Name of the Project" class="input input-accent input-bordered w-full" bind:value={projectName} />
    </label>
    <p class="label-text text-neutral">Upload a Picture</p>
    <FileInputBig bind:selectedFile />
    <label class="form-control w-full  my-4">
      <div class="label">
        <span class="label-text">Short Description of the Project?</span>
      </div>
      <input type="text" placeholder="Short Description of the Project" class="input input-accent input-bordered w-full" bind:value={projectShortDescription} />
    </label>
    <label class="form-control w-full  my-4">
      <div class="label">
        <span class="label-text">Github link to the Project?</span>
      </div>
      <input type="text" placeholder="Github link to the Project" class="input input-accent input-bordered w-full" bind:value={projectGithubLink} />
    </label>
    <label class="form-control w-full  my-4">
      <div class="label">
        <span class="label-text">Live demo link to the Project?</span>
      </div>
      <input type="text" placeholder="Live demo link to the Project" class="input input-accent input-bordered w-full" bind:value={projectLiveDemoLink} />
    </label>
    <span class="label-text">Description about the Project?</span>
    <textarea class="textarea textarea-accent textarea-bordered h-24" placeholder="Description about the project" bind:value={projectDescription}></textarea>
    <span class="label-text">Skills used in the Project?</span>
    <div class="card bg-base-100">
      <div class="card-body flex flex-row">
        {#each data.skills as skill}
          <div
            class={skills.includes(skill.id) ? "bg-primary" : ""}
            on:click={()=>(addToProjectSkills(skill.id))}
            on:keydown={(event) => {
               if (event.key === 'Enter' || event.key === ' ') {
                  addToProjectSkills(skill.id)
               }
             }}
            role="button"
            tabindex="0"
          >
            <Icon icon={skill.logo} class="h-10 w-10" />
          </div>
        {/each}
    </div>
  </div>
<button class="btn btn-accent mt-10" on:click|preventDefault={saveProject}>Save me</button>
</div>
</div>
