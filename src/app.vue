<template>
	<div id="id">
		<img src="./assets/head.png" alt="">
		<router-view/>
	</div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
$black: black;
$yellow: yellow;
div {
  color: $black;
  background: $yellow;
}
</style>

