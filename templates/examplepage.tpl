{* Page specific JS can be specified here and will run when goToPage() is called *}
<script src="framework/js/examplepage.js"></script>

<div class="text-center">
  <a href="index.php">
    <marquee behavior="alternate" scrollamount="5" direction="right">
        <img src="framework/images/dont-panic.jpg" alt="Portal Framework 2.0" class="img-fluid py-5">
        <img src="framework/images/flame.gif" alt="Portal Framework 2.0" class="img-fluid py-5">
        <img src="framework/images/dont-panic.jpg" alt="Portal Framework 2.0" class="img-fluid py-5">
    </marquee>
  </a>
  <br><br>
  <div class="text-center" style="background-color: yellow; width: 50%; height: 10px; margin: 0 auto; animation: flash 1s linear infinite;">
  </div>
</div>
<style>
    @keyframes flash {
        0% { opacity: 0; }
        50% { opacity: 1; }
        100% { opacity: 0; }
    }
</style>