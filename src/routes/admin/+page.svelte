<script lang="ts">
  import AboutMeForm from "$lib/components/AboutMeForm.svelte";

  export let data;

</script>

<AboutMeForm user={data.user.data}/>



