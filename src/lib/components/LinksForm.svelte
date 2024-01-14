<script lang="ts">
  export let data;
</script>


<div class="card bg-base-300">

  <div class="collapse bg-base-200">
    <input type="checkbox" id="modalCheckbox" />
    <div class="collapse-title text-xl font-medium">
      Choose an icon
    </div>
    <div class="collapse-content">
      <div class="flex flex-row flex-wrap">
        {#each iconArray as icon (icon.name)}
          <div title={icon.name}>
            <svg class="fill-neutral h-10 w-10 {selectedIcon === icon ? 'selected' : ''}" id="{icon.name}" on:click|preventDefault={() => handleIconClick(icon)} on:keydown|preventDefault={(e) => e.key === 'Enter' && handleIconClick(icon)} tabindex="0" role="button">{@html icon.body.body}</svg>
          </div>
        {/each}
      </div>
    </div>
  </div>

</div>
