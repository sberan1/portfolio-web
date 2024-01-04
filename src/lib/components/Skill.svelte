<script lang="ts">
import Rating from "$lib/components/Rating.svelte";

export let image = "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"w-8 h-8\">\n" +
  "  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z\" />\n" +
  "</svg>";
export let rating = 0;

</script>

<div class="border border-accent-content text-card-foreground object-cover p-2 bg-base-100 shadow-lg rounded-2xl flex flex-row mx-3 my-2 justify-center">
  <figure class="h-70 w-50">{@html image}</figure>
  <Rating {rating}/>
</div>

<style>
</style>

