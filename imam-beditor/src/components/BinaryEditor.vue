<template>
    <div>
      <textarea rows="2" :maxlength="fieldLength" v-model="textValue" @input="onInput"></textarea>
    </div>
</template>

<script lang="ts" setup>

import { ref, reactive, computed, onMounted, watch } from "vue"
import CopyStatement from "@/model/CopyStatement";

const props = defineProps({statement: {type: CopyStatement, required: true}})

const __stmt = ref<CopyStatement>()

const textValue = computed<string>({
  get(){ 
    if(!__stmt.value) return ""
    return __stmt.value.dispByteValue;
  },
  set(txt: string){
    if(!__stmt.value) return
    try {
      __stmt.value.dispByteValue = txt
    }catch(e) {
        console.log("error: "+ (e as Error).message)
        __stmt.value.dispByteValue = props.statement.dispByteValue
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
})

const fieldLength = computed(() => {
    if(!__stmt.value) return 0
    return __stmt.value.dispByteValue.length
})


function onInput(e: any) {
    console.log(e.getTargetRanges())
}

onMounted(() => {
  __stmt.value = props.statement
})

</script>

<style lang="scss" scoped>
</style>