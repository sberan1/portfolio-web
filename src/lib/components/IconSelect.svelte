<script lang="ts">
  import { icons } from "@iconify-json/devicon";
  import { getIconData, iconToSVG, iconToHTML, replaceIDs } from "@iconify/utils";
  export let selectedIcon = "devicon:java";

  const iconArray = Object.entries(icons.icons).map(([name, body]) => ({ name, body }));

  let parsedIcons = [];

  for (let icon of iconArray){
    const iconData = getIconData(icons, icon.name)
    if (!iconData) {
      throw new Error(`Icon is missing`);
    }
    const renderData = iconToSVG(iconData, {
      // Setting only height will also remove width
      height: 'unset',
    });

    const svg = iconToHTML(replaceIDs(renderData.body), renderData.attributes);

    console.log()
    parsedIcons.push({name: icon.name, body: svg});
  }
  function handleIconClick(icon) {
    selectedIcon = "devicon:"+ icon.name;
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
      {#each parsedIcons as icon (icon.name)}
        <div class="" title={icon.name}>
          <svg class="fill-neutral w-10 h-10 m-1 {selectedIcon === icon ? 'selected' : ''}" id="{icon.name}" on:click|preventDefault={() => handleIconClick(icon)} on:keydown|preventDefault={(e) => e.key === 'Enter' && handleIconClick(icon)} tabindex="0" role="button">{@html icon.body}</svg>
        </div>
      {/each}
    </div>
  </div>
</div>
