<script lang="ts">
  import { supabase } from "$lib/supabaseClient";

  let selectedFile = null;
  let uploadedFilePath = "";
  export let user = {
    bio: "Im so hella interesting m8",
    created_at: "2024-01-12T21:03:56.431787+00:00",
    email: "stepan.beran@outlook.com",
    id: 1,
    name: "Stepan Beran",
    picture: "https://i.seadn.io/gae/2hDpuTi-0AMKvoZJGd-yKWvK4tKdQr_kLIpB_qSeMau2TNGCNidAosMEvrEXFO9G6tmlFlPQplpwiqirgrIPWnCKMvElaYgI-HiVvXc?auto=format&dpr=1&w=1000",
    position_name: "Debil"
  };

  async function uploadFile() {
    const file = selectedFile[0];
    if (!file) return;

    const filePath = `profile_pictures/${user.id}${Math.random()*100000}${file.name}`;
    const { data, error } = await supabase.storage.from('Profile_images').upload(filePath, file)

    if (error) {
      console.log(error)
    } else {
      console.log(data)
      uploadedFilePath = "https://cswghpezojfyfalgtuyx.supabase.co/storage/v1/object/public/" +  data.fullPath;
    }
  }

  async function saveProfile(){
    if(selectedFile !== undefined) {
      await uploadFile();
    }
    const { data, error } = await supabase
      .from('User')
      .upsert({
        id: user.id,
        name: user.name,
        position_name: user.position_name,
        bio: user.bio,
        picture: uploadedFilePath
      })
    if (error) {
      console.log(error)
    } else {
      user = await supabase.from('User').select('*').limit(1).single().data;
    }
  }

  $: if (selectedFile) {
    user.picture = URL.createObjectURL(selectedFile[0]);
  }

</script>


<div class="card bg-base-300 ">
  <div class="card-header">
    <h1 class="card-title m-5 text-5xl ">About YOU</h1>
  </div>
  <!-- /.card-header -->
  <div class="card-body">
    <div class="text-center">
      <label for="profilePicture" class="block mb-4">
        <img id="preview" src={user.picture} alt="Profile" class="h-64 w-64 rounded-full object-cover cursor-pointer" />
      </label>
      <input type="file" id="profilePicture" class="hidden" bind:files={selectedFile}>
    </div>
    <label class="form-control w-full ">
      <div class="label">
        <span class="label-text">What is your name?</span>
      </div>
      <input type="text" placeholder="John Doe" class="input input-accent input-bordered w-full " bind:value={user.name}/>
    </label>
    <label class="form-control w-full ">
      <div class="label">
        <span class="label-text">What is your position?</span>
      </div>
      <input type="text" placeholder="Your Position" class="input input-accent input-bordered w-full" bind:value={user.position_name} />
    </label>
    <label class="form-control w-full ">
      <div class="label">
        <span class="label-text">What is your email?</span>
      </div>
      <input type="text" placeholder="Your Position" class="input input-accent input-bordered w-full" bind:value={user.email} />
    </label>
    <label class="form-control">
      <div class="label">
        <span class="label-text">Your bio</span>
      </div>
      <textarea class="textarea textarea-accent textarea-bordered h-24" placeholder="I'm the most interesting person...." bind:value={user.bio}></textarea>
    </label>
    <button class="btn btn-accent mt-4" on:click|preventDefault={saveProfile}>Save</button>
    </div>
  <!-- /.card-body -->
</div>

