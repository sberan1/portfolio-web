<script>
  export let logo = "https://pr.vse.cz/wp-content/uploads/page/58/VSE_logo_CZ_circle_blue.png";
  export let startDate = "2018";
  export let endDate = "2021";
  export let title = "University of West Bohemia";
  export let description = "Bachelor's degree, Computer Science";
</script>


<div class="education-item card border-accent-content border-2 bg-base-100 p-5 flex flex-col justify-center items-center">
  <div class="avatar">
    <div class="w-24 rounded-full">
      <img src={logo} alt="logo of {title}"/>
    </div>
  </div>
  <h3 class="text-2xl font-bold text-neutral my-2">{title}</h3>
  <p class="text-neutral">{startDate} - {endDate}</p>
  <p class="text-neutral">{description}</p>
</div>
