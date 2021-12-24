<template>
  <div class="loading tw-flex tw-flex-col tw-h-full tw-mt-10 tw-mx-auto tw-justify-center tw-align-center">
    <h2 class="tw-text-center">Loading</h2>
    <div class="tw-flex tw-mt-2 tw-mx-auto">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>


  </div>
</template>

<script>
export default {
  name: "LoadingPage"
}
</script>

<style scoped>
/*
 * Baseline styles
 */
body {
  background: #222;
  text-align: center;
  padding: 20%;
}

h2 {
  color: #ccc;
  margin: 0;
  font: .8em verdana;
  text-transform: uppercase;
  letter-spacing: .1em;
}

/*
 * Loading Dots
 * Can we use pseudo elements here instead :after?
 */
.loading span {
  display: inline-block;
  vertical-align: middle;
  width: .6em;
  height: .6em;
  margin: .19em;
  background: #007DB6;
  border-radius: .6em;
  animation: loading 1s infinite alternate;
}

/*
 * Dots Colors
 * Smarter targeting vs nth-of-type?
 */
.loading span:nth-of-type(2) {
  background: #008FB2;
  animation-delay: 0.2s;
}

.loading span:nth-of-type(3) {
  background: #009B9E;
  animation-delay: 0.4s;
}

.loading span:nth-of-type(4) {
  background: #00A77D;
  animation-delay: 0.6s;
}

.loading span:nth-of-type(5) {
  background: #00B247;
  animation-delay: 0.8s;
}

.loading span:nth-of-type(6) {
  background: #5AB027;
  animation-delay: 1.0s;
}

.loading span:nth-of-type(7) {
  background: #A0B61E;
  animation-delay: 1.2s;
}

/*
 * Animation keyframes
 * Use transition opacity instead of keyframes?
 */
@keyframes loading {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
