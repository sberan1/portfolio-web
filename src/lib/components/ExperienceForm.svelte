<script lang="ts">
  import Experience from "$lib/components/Experience.svelte";
  import { supabase } from "$lib/supabaseClient";
  export let data;

  let selectedFile;
  let pic = "https://149909199.v2.pressablecdn.com/wp-content/uploads/2015/09/DT39-F.jpg";
  let ExperienceName = "";
  let ExperienceDescription = "";
  let ExperienceTitle = "";
  let startYear = "";
  let endYear = "";
  let uploadedFilePath = "";
  let editId;

  $: if (selectedFile) {
    pic = URL.createObjectURL(selectedFile[0]);
  }

  async function uploadFile() {
    const file = selectedFile[0];
    if (!file) return;

    const filePath = `Experiences/${ExperienceName}${Math.random()*100000}${file.name}`;
    const { data, error } = await supabase.storage.from('Profile_images').upload(filePath, file)

    if (error) {
      console.log(error)
    } else {
      console.log(data)
      uploadedFilePath = "https://cswghpezojfyfalgtuyx.supabase.co/storage/v1/object/public/" +  data.fullPath;
    }
  }
  async function saveExperience(){
    if (!editId) {
      if (!selectedFile){
        return alert("Please select a file to upload");
      }
      await uploadFile();
      await supabase.from("Experience").insert([
        {
          name: ExperienceName,
          description: ExperienceDescription,
          degree: ExperienceTitle,
          start_date: startYear,
          end_date: endYear,
          logo: uploadedFilePath
        }
      ]);

    }
    else {
      if (selectedFile){
        await uploadFile();
      }
      const {data, error} = await supabase.from("Experience").update([
        {
          name: ExperienceName,
          description: ExperienceDescription,
          degree: ExperienceTitle,
          start_date: startYear,
          end_date: endYear,
          logo: uploadedFilePath ? uploadedFilePath : pic
        }
      ]).match({id: editId});
      editId = undefined;
      ExperienceName = "";
      ExperienceDescription = "";
      ExperienceTitle = "";
      startYear = "";
      endYear = "";
      pic = "https://149909199.v2.pressablecdn.com/wp-content/uploads/2015/09/DT39-F.jpg";
    }
    let temp = await supabase.from('Experience').select('*');
    data = temp.data;
  }

  async function deleteExperience(id){
    await supabase.from("Experience").delete().match({id: id});
    let temp = await supabase.from('Experience').select('*');
    data = temp.data;
  }

  async function editExperience(id){
    editId = id;
    let temp = await supabase.from('Experience').select('*').match({id: id}).limit(1).single();
    let Experience = temp.data;
    ExperienceName = Experience.name;
    ExperienceDescription = Experience.description;
    ExperienceTitle = Experience.degree;
    startYear = Experience.start_date;
    endYear = Experience.end_date;
    pic = Experience.logo;
  }

</script>

<div class="card bg-base-300 ">
  <div class="card-header">
    <h1 class="card-title m-5 text-5xl text-neutral">New Experience</h1>
  </div>
  <!-- /.card-header -->
  <div class="card-body">
    <div class="text-center">
      <label for="profilePicture" class="block mb-4">
        <img id="preview" src={uploadedFilePath ? uploadedFilePath : pic} alt="Profile" class="h-64 w-64 rounded-full object-cover cursor-pointer" />
      </label>
      <input type="file" id="profilePicture" class="hidden" bind:files={selectedFile}>
    </div>
    <label class="form-control w-full  my-4">
      <div class="label">
        <span class="label-text">Name of the Experience?</span>
      </div>
      <input type="text" placeholder="Name of the Experience" class="input input-accent input-bordered w-full" bind:value={ExperienceName} />
    </label>
    <label class="form-control w-full  my-4">
      <div class="label">
        <span class="label-text">Description of the Experience?</span>
      </div>
      <input type="text" placeholder="Description of the Experience" class="input input-accent input-bordered w-full" bind:value={ExperienceDescription} />
    </label>
    <label class="form-control w-full  my-4">
      <div class="label">
        <span class="label-text">Obtained title?</span>
      </div>
      <input type="text" placeholder="Obtained title" class="input input-accent input-bordered w-full" bind:value={ExperienceTitle} />
    </label>
    <div class="flex flex-row">
      <label class="form-control w-full  my-4 mr-5">
        <div class="label">
          <span class="label-text">Start</span>
        </div>
        <input type="text" placeholder="Start" class="input input-accent input-bordered w-full" bind:value={startYear} />
      </label>
      <label class="form-control w-full  my-4 ml-5">
        <div class="label">
          <span class="label-text">End</span>
        </div>
        <input type="text" placeholder="End" class="input input-accent input-bordered w-full" bind:value={endYear} />
      </label>
    </div>
    <button class="btn btn-accent my-4" on:click|preventDefault={saveExperience}>Save</button>
  </div>
</div>
