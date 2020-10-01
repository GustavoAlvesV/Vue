<template>
  <div class="citacao">
<!--   (1)  {{texto}}   USANDO PROPS   -->

<!--   (2)  <slot></slot>      -->

<!-- (3)
    <slot name="autor"></slot>
    <slot name="texto"></slot>
    <slot name="fonte"></slot>
-->
    <slot name="autor"></slot>
    <slot></slot>
    <slot name="fonte"></slot>


  </div>
</template>

<script>
export default {
  props: ["texto"],
};
</script>

<style scoped>
.citacao {
  border: 1px solid #ddd;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 25px;
  max-width: 450px;
  margin-bottom: 20px;
}
</style>
