<script lang="ts">

  import { icons } from "@iconify-json/cib";

  export let selectedIcon = "cib:figma";

  const iconArray = Object.entries(icons.icons).map(([name, body]) => ({ name, body }));

  function handleIconClick(icon) {
    selectedIcon = "cib:"+ icon.name;
    document.getElementById('modalCheckbox').click();
  }

</script>

<div class="collapse bg-base-200">
  <input type="checkbox" id="modalCheckbox" />
  <div class="collapse-title text-xl font-medium text-neutral">
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
