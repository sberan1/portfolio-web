<script>
  export let rating = 0;

  $: {
    if (rating < 0 || rating > 5 || rating % 0.5 !== 0) {
      console.error('Invalid rating value. Rating should be between 0 and 5 and a multiple of 0.5');
      rating = 0;
    }
  }

</script>

<div class="rating rating-sm rating-half">
  <input type="radio" name="rating-5" class="rating-hidden" disabled checked={rating === 0}/>
  <input type="radio" name="rating-5" class="bg-warning mask mask-star-2 mask-half-1" disabled checked={rating === 0.5}/>
  <input type="radio" name="rating-5" class="bg-warning mask mask-star-2 mask-half-2" disabled checked={rating === 1}/>
  <input type="radio" name="rating-5" class="bg-warning mask mask-star-2 mask-half-1"  disabled checked={rating === 1.5} />
  <input type="radio" name="rating-5" class="bg-warning mask mask-star-2 mask-half-2" disabled checked={rating === 2}/>
  <input type="radio" name="rating-5" class="bg-warning mask mask-star-2 mask-half-1" disabled checked={rating === 2.5}/>
  <input type="radio" name="rating-5" class="bg-warning mask mask-star-2 mask-half-2" disabled checked={rating === 3}/>
  <input type="radio" name="rating-5" class="bg-warning mask mask-star-2 mask-half-1" disabled checked={rating === 3.5}/>
  <input type="radio" name="rating-5" class="bg-warning mask mask-star-2 mask-half-2" disabled checked={rating === 4}/>
  <input type="radio" name="rating-5" class="bg-warning mask mask-star-2 mask-half-1" disabled checked={rating === 4.5}/>
  <input type="radio" name="rating-5" class="bg-warning mask mask-star-2 mask-half-2" disabled checked={rating === 5}/>
</div>
