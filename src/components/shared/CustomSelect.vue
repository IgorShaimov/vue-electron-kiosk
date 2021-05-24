<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="
          selected = option;
          open = false;
          $emit('input', option);
        "
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
        ? this.options[0]
        : null,
      open: false,
    };
  },
  mounted() {
    this.$emit("input", this.selected);
  },
};
</script>

<style scoped>
.custom-select {
  position: relative;
  width: 866PX;
  text-align: left;
  outline: none;
  height: 188px;
  line-height: 188px;
  font-size: 50px;
}

.custom-select .selected {
  background-color: #fff;
  border-radius: 20px;
  border: 1px solid #666666;
  color: var(--secondary-black);
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .selected.open {
  border: 1px solid #ad8225;
  border-radius: 20px 20px 0px 0px;
}

.custom-select .selected:after {
  position: absolute;
  content: "";
  top: 75px;
  right: 1em;
  width: 0;
  height: 0;
  border: 40px solid transparent;
  border-color: var(--secondary-black) transparent transparent transparent;
}

.custom-select .items {
  color: var(--secondary-black);
  border-radius: 0px 0px 6px 6px;
  overflow-y: auto;
  border-right: 1px solid #ad8225;
  border-left: 1px solid #ad8225;
  border-bottom: 1px solid #ad8225;
  position: absolute;
  background-color: white;
  left: 0;
  right: 0;
  z-index: 2;
  height: 330px;
}

.custom-select .items div {
  color: var(--secondary-black);
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
  z-index: 2;
}

.custom-select .items div:hover {
  background-color: #ad8225;
}

.selectHide {
  display: none;
}
</style>
