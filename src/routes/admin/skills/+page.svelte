<script lang="ts">
  import NewSkillForm from "$lib/components/Forms/NewSkillForm.svelte";

  export let data;
  console.log(data);

</script>

<NewSkillForm rawSkills={data.skills.data}/>



