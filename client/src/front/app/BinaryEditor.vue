<template>
    <div>
      <textarea rows="2" :maxlength="fieldLength" v-model="textValue" @input="onInput"></textarea>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import CopyStatement from "../model/CopyStatement"

@Component({
  components: {}
})
export default class BinaryEditor extends Vue {
  @Prop() statement!: CopyStatement;

  public get fieldLength(): number {
      return this.statement.dispByteValue.length
  }

  public get textValue(): string {
      return this.statement.dispByteValue;
    //   const value = this.statement.dispByteValue;
    //   console.log("textValue")
    //   console.log(value)
    //   return value[0] + "\n" + value[1]
  }


  public onInput(e: any) {
      console.log(e.getTargetRanges())
  }

  public set textValue(txt: string) {
      try {
        this.statement.dispByteValue = txt
      }catch(e) {
          console.log("error: "+ (e as Error).message)
          this.statement.dispByteValue = this.statement.dispByteValue
          return;
      }
    //   const token = txt.split(/\r?\n/g)
    //   if(token.length != 2){
    //       this.statement.dispByteValue = this.statement.dispByteValue
    //       return;
    //   }
    //     const length = this.statement.dispByteValue[0].length
    //   if(token[0].length > length){
    //       this.statement.dispByteValue = this.statement.dispByteValue
    //       return;
    //   }
    //     if(token[1].length > length){
    //       this.statement.dispByteValue = this.statement.dispByteValue
    //       return;
    //   }
    //   try {
    //       const value = Array.from([0,1]).map(n => token[n] + "0".repeat(length - token[n].length))
    //       console.log(value)
    //       this.statement.dispByteValue = value
    //   }catch(e) {
    //       console.log("error: "+ (e as Error).message)
            
    //       this.statement.dispByteValue = this.statement.dispByteValue
    //       return;
    //   }
  }

  public mounted(): void {}
}
</script>

<style lang="scss" scoped>
</style>