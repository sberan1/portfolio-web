<script>
  export let name = 'MyStay';
  export let logo = 'https://www.hotelminder.com/images/brand/MyStay.png';
  export let startDate = '2019-01-01';
  export let endDate = '2019-12-31';
  export let description = 'MyStay is a guest communication platform that helps hotels to improve their guest experience and generate more revenue.';
  export let position = 'Full Stack Developer';


</script>


<div class="education-item mx-3 card border-accent-content border-2 max-w-md bg-base-100 p-5 flex flex-col justify-center items-center carousel-item">
  <div class="avatar">
    <div class="w-24 rounded-full">
      <img src={logo} alt="logo of {name}"/>
    </div>
  </div>
  <p class="text-3xl font-bold text-neutral mt-4">{position}</p>
  <h3 class="text-xl text-neutral my-2">{name}</h3>
  <p class="text-neutral mb-3">{startDate} - {endDate ? endDate : 'Present'}</p>
  <p class="text-neutral">{description}</p>
</div>
