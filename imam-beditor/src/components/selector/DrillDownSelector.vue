<template>
  <div>
      <div class="drill" @click="onClickDrill">
        <!-- Usage:
            <template v-slot:title>
                <h1>ログイン</h1>
            </template>
         -->
        <slot name="title"></slot>
      </div>
      <div class="children" v-if="isOpened">
        <slot></slot>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class DrillDownSelector extends Vue {

    public isOpened: boolean = false;

    public onClickDrill() {
        this.isOpened != this.isOpened
    }

    public mounted(): void {}
}
</script>

<style lang="scss" scoped>
.drill {
    position: relative;
    &:hover {
        cursor: pointer;
        background-color: rgba(56, 56,56, 0.9);
        transition-duration: 0.25s;
    }
    &:before, &:after {
        position: absolute;
        content: "";
        width: 10px;
        height: 1px;
        background-color: #ffffff;
    }
    &:after {
        top: 15px;
        left: -18px;
        transform: rotate(45deg);
    }
    &:before {
        top: 15px;
        left: -11px;
        transform: rotate(-45deg);
    }
}
</style>