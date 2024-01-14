<script lang="ts">
import Education from "$lib/components/Education.svelte";
import { supabase } from "$lib/supabaseClient";
export let data;

  let selectedFile;
  let pic = "https://149909199.v2.pressablecdn.com/wp-content/uploads/2015/09/DT39-F.jpg";
  let educationName = "";
  let educationDescription = "";
  let educationTitle = "";
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

  const filePath = `educations/${educationName}${Math.random()*100000}${file.name}`;
  const { data, error } = await supabase.storage.from('Profile_images').upload(filePath, file)

  if (error) {
    console.log(error)
  } else {
    console.log(data)
    uploadedFilePath = "https://cswghpezojfyfalgtuyx.supabase.co/storage/v1/object/public/" +  data.fullPath;
  }
}
  async function saveEducation(){
    if (!editId) {
      if (!selectedFile){
        return alert("Please select a file to upload");
      }
      await uploadFile();
       await supabase.from("Education").insert([
        {
          name: educationName,
          description: educationDescription,
          degree: educationTitle,
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
      const {data, error} = await supabase.from("Education").update([
        {
          name: educationName,
          description: educationDescription,
          degree: educationTitle,
          start_date: startYear,
          end_date: endYear,
          logo: uploadedFilePath ? uploadedFilePath : pic
       }
      ]).match({id: editId});
      editId = undefined;
      educationName = "";
      educationDescription = "";
      educationTitle = "";
      startYear = "";
      endYear = "";
      pic = "https://149909199.v2.pressablecdn.com/wp-content/uploads/2015/09/DT39-F.jpg";
    }
    let temp = await supabase.from('Education').select('*');
    data = temp.data;
  }

  async function deleteEducation(id){
    await supabase.from("Education").delete().match({id: id});
    let temp = await supabase.from('Education').select('*');
    data = temp.data;
  }

  async function editEducation(id){
    editId = id;
    let temp = await supabase.from('Education').select('*').match({id: id}).limit(1).single();
    let education = temp.data;
    educationName = education.name;
    educationDescription = education.description;
    educationTitle = education.degree;
    startYear = education.start_date;
    endYear = education.end_date;
    pic = education.logo;
  }

</script>

<div class="card bg-base-300 ">
  <div class="card-header">
    <h1 class="card-title m-5 text-5xl text-neutral">New Education</h1>
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
        <span class="label-text">Name of the education?</span>
      </div>
      <input type="text" placeholder="Name of the education" class="input input-accent input-bordered w-full" bind:value={educationName} />
    </label>
    <label class="form-control w-full  my-4">
      <div class="label">
        <span class="label-text">Description of the education?</span>
      </div>
      <input type="text" placeholder="Description of the education" class="input input-accent input-bordered w-full" bind:value={educationDescription} />
    </label>
    <label class="form-control w-full  my-4">
      <div class="label">
        <span class="label-text">Obtained title?</span>
      </div>
      <input type="text" placeholder="Obtained title" class="input input-accent input-bordered w-full" bind:value={educationTitle} />
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
    <button class="btn btn-accent my-4" on:click|preventDefault={saveEducation}>Save</button>
  </div>
</div>
<div class="card bg-base-300 mt-10">
  <div class="card-header">
    <h1 class="card-title m-5 text-5xl text-neutral">All Education</h1>
  </div>
  <!-- /.card-header -->
  <div class="card-body">
    {#each data as education}
      <div class="flex-row flex justify-center items-center">
      <button class="btn btn-success my-4" on:click={() => (editEducation(education.id))}>Edit</button>
      <Education startDate={education.start_date} endDate={education.end_date} logo={education.logo} description={education.description} title={education.name}/>
      <button class="btn btn-error my-4 h-max" on:click={() => (deleteEducation(education.id))}>Delete</button>
      </div>
    {/each}
  </div>
</div>
