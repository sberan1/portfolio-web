<script>
import Rating from "$lib/components/Rating.svelte";

export let data;
console.log(data);
</script>


<h1 class="text-3xl font-bold underline">
    Hello {data.user.name}! <br>
    {data.user.positionName} <br>
     <Rating rating={2.5}/>
</h1>


