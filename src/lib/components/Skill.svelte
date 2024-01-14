<script lang="ts">
import Rating from "$lib/components/Rating.svelte";
import Icon from "@iconify/svelte";

export let logo = "cib:git";
export let rating = 0;

</script>

<div class="border border-accent-content text-card-foreground object-cover p-2 bg-base-100 shadow-lg rounded-2xl flex flex-row my-2 justify-center">
  <Icon  icon={logo} class="w-10 h-10 mr-2"/>
  <Rating {rating}/>
</div>

<style>
</style>

