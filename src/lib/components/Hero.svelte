<script lang="ts">
  export let name: string;
  export let picture: string;
  export let position: string;
  export let links = [
    {
      name: 'Github',
      url: 'github.com',
      logo: "https://img.icons8.com/ios-filled/50/000000/github.png",
    },
    {
      name: 'Github',
      url: 'github.com',
      logo: "https://img.icons8.com/ios-filled/50/000000/github.png",
    },
    {
      name: 'Github',
      url: 'github.com',
      logo: "https://img.icons8.com/ios-filled/50/000000/github.png",
    },
    {
      name: 'Github',
      url: 'github.com',
      logo: "https://img.icons8.com/ios-filled/50/000000/github.png",
    },
    {
      name: 'Github',
      url: 'github.com',
      logo: "https://img.icons8.com/ios-filled/50/000000/github.png",
    },
  ];
</script>

<div class="container mx-auto px-4 py-20 flex flex-col items-center text-center">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <div class="avatar">
        <div class="w-24 rounded-full">
          <img src={picture} alt="avatar"/>
        </div>
      </div>
      <h1 class="mt-4 text-4xl font-bold">{name}</h1>
      <p class="mt-2 text-xl text-gray-400">{position}</p>
      <div class="bg-base-100/80 border-accent-content rounded-full border-2 p-2 mt-6 space-x-4 flex flex-row flex-wrap justify-center">
        {#each links as link}
       <a href={link.url}>
         <img src={link.logo} alt={link.name} class="w-8 h-8 mx-1">
       </a>
          {/each}
      </div>
      </div>
</div>
  </div>

