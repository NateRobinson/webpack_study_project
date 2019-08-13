<template>
	<div id="id">
		<img src="./assets/head.png" alt="">
		<ul>
      <li class="ico ico-l1"></li>
      <li class="ico ico-l2"></li>
      <li class="ico ico-l3"></li>
      <li class="ico ico-l4"></li>
    </ul>
		<router-view/>
	</div>
</template>

<script>
import axios from "axios";
import api from "../mock/api";

export default {
  async created() {
    let res = await axios.get(api.getUserInfo);
    console.log(res);
  }
};
</script>

<style lang="scss">
@import "~sprite2.scss";
$black: black;
$yellow: yellow;

div {
  color: $black;
}
</style>

