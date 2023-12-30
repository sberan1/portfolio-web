<script>
    import "../app.css";
    import Navbar from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";
</script>

<Navbar />
<slot />
<Footer />


<style>
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: 'Roboto', sans-serif;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
</style>
