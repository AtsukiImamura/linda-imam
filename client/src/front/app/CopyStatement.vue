<template>
  <div class="statement">
    <div class="contents row" v-if="isPrimitive">
      <template v-if="redefines.length > 0">
        <div class="col col-header"  >
          <select v-model="selectedRedefineId">
            <option value="">{{ name }}</option>
            <option v-for="(red, index) in redefines" :value="red.id" :key="index">{{ red.name }}</option>
          </select>
        </div>
        <template v-if="childStatements.length == 0">
          <div class="col col-edit">{{ parsedValue }} </div>
          <div class="col col-hex">{{ rawValue }}</div>
        </template>
      </template>
      <template v-if="redefines.length == 0">
        <div class="col col-header">{{ name }}</div>
        <div class="col col-edit">{{ parsedValue }} </div>
        <div class="col col-hex">{{ rawValue }}</div>
      </template>
    </div>
    <div class="children" v-if="childStatements.length > 0">
      <CopyStatement v-for="(child, index) in childStatements" :statement="child" :key="index"></CopyStatement>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { IStatement, ICopyPrimitive, ICopyBook} from "../declaration/interface/ICopy"

@Component({
  components: {}
})
export default class CopyStatement extends Vue {
  @Prop() statement!: IStatement;

  public get isPrimitive(): boolean {
    return (this.statement as any).value !== undefined;
  }

  public get primitive(): ICopyPrimitive | undefined {
    if(!this.isPrimitive) {
      return undefined;
    }
    return this.statement as ICopyPrimitive;
  }

  public get copyBook(): ICopyBook | undefined {
    if(this.isPrimitive) {
      return undefined;
    }
    return this.statement as ICopyBook;
  }


  public get name(): string {
    return this.statement.name;
  }

  public get parsedValue(): string {
    if(!this.primitive){
      return ""
    }
    return this.parseRawValue(this.primitive.value);
  }
  
  public get rawValue(): ArrayBuffer {
    if(!this.primitive){
      return new ArrayBuffer(0); // TODO
    }
    return this.primitive.value;
  }

  /**
   * 表示用に選択されている再定義ID
   */
  public selectedRedefineId: string = "";

  /**
   * この項目にかかっている再定義
   */
  private get redefines(): ICopyBook[] {
    if(!this.primitive) {
      return []
    }
    return this.primitive.redefines;
  }

  /**
   * 現在の選択に基づいて再定義の項目情報を得る
   */
  public get childStatements(): IStatement[] {
    // この項目がCOPY句定義の場合
    if(this.copyBook){
      return this.copyBook.statements;
    }

    if(this.selectedRedefineId == "") {
      return []
    }

    // この項目が手段項目で、表示する再定義が選択されている場合
    const red = this.redefines.filter(r => r.id = this.selectedRedefineId);
      console.log(red);
    if(red.length !== 1){
      throw new Error("redefine id deplicated!")
    }
    return red[0].statements;
  }


  private parseRawValue(val: ArrayBuffer): string {
    return ""
  }

  public mounted(): void {}
}
</script>

<style lang="scss" scoped>
</style>