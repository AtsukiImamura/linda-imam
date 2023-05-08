<template>
  <div class="main">
      <div id="panel-data">
          <CopyStatementView v-if="statement" :statement="statement"></CopyStatementView>
      </div>
  </div>
</template>

<script lang="ts" setup>
import CopyStatementView from "@/components/CopyStatementView.vue";
import CopyStatement from "@/model/CopyStatement";
import { ref, reactive, computed, onMounted, watch } from "vue"

// @ts-ignore
const vscode = acquireVsCodeApi();

const statement = ref<CopyStatement | undefined>(undefined);

onMounted(() => {
    // @ts-ignore
    (window as any).addEventListener('message', async e => {
        const { type, body, requestId } = e.data;
        switch (type) {
            case 'init':{}
            case 'copy':
                {
                    statement.value = body.copy ? new CopyStatement(body.copy) : undefined;
                    console.log("@@ message received!!")
                    console.log(this.statement)
                    return;
                }
    }
    });
    
    vscode.postMessage({
        type: 'init',
    });
})

</script>

<style lang="scss" scoped>
.main {
  @include main-container;
}

.header-selection {
width: 100%;
padding: 10px 5px;
background-color: rgba(48, 48,48, 0.9);
.title {
  font-size: 0.7rem;
}

}

</style>