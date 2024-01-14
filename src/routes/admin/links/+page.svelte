<script lang="ts">
  import LinksForm from "$lib/components/Forms/LinksForm.svelte";

  export let data;
  console.log(data);

</script>

<LinksForm data={data.links} />


