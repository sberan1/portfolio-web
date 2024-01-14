<script lang="ts">
  import EducationForm from "$lib/components/EducationForm.svelte";

  export let data;
  console.log(data);

</script>

<EducationForm data={data.education} />


