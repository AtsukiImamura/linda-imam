<template>
  <div class="statement">
    <div class="contents row">
      <template v-if="statement.redefinedStatements.length > 0">
        <div class="col col-header"  >
          <select v-model="selectedRedefineId">
            <option value="">{{ statement.name }}</option>
            <option v-for="(red, index) in statement.redefinedStatements" :value="red.id" :key="index">{{ red.name }}</option>
          </select>
        </div>
        <template v-if="drilldownStatements.length == 0">
          <div class="col col-edit">
            <input v-model="statement.dispValue" />
          </div>
          <div class="col col-hex">
            <BinaryEditor :statement="statement"></BinaryEditor>
          </div>
        </template>
      </template>
      <template v-if="statement.redefinedStatements.length == 0">
        <div class="col col-header">{{ statement.name }}</div>
        <div class="col col-edit" v-if="statement.isPrimitive">            
          <input v-model="statement.dispValue" />
        </div>
        <div class="col col-hex"  v-if="statement.isPrimitive">
            <BinaryEditor :statement="statement"></BinaryEditor>
        </div>
      </template>
    </div>
    <div class="children" v-if="drilldownStatements.length > 0">
      <CopyStatementView v-for="(child, index) in drilldownStatements" :statement="child" :key="index"></CopyStatementView>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import CopyStatement from "../model/CopyStatement"
import BinaryEditor from "./BinaryEditor.vue"

@Component({
  components: {BinaryEditor}
})
export default class CopyStatementView extends Vue {
  @Prop() statement!: CopyStatement;

  /**
   * 表示用に選択されている再定義ID
   */
  public selectedRedefineId: string = "";

  /**
   * 現在の選択に基づいて再定義の項目情報を得る
   */
  public get drilldownStatements() {

    if(this.selectedRedefineId == "") {
      // この項目がCOPY句定義の場合
      if(this.statement.isGroup){
        return this.statement.childStatements!;
      }else {
        return [];
      }
    }

    // この項目が集団項目で、表示する再定義が選択されている場合
    const red = this.statement.redefinedStatements
                .filter(r => r.id == this.selectedRedefineId);
    if(red.length !== 1){
      throw new Error("redefine id deplicated!")
    }
    if(red[0].isPrimitive){
      //* primitive
      return [red[0]]
    }
    return red[0].childStatements
  }

  public mounted(): void {
  }
}
</script>

<style lang="scss" scoped>
</style>