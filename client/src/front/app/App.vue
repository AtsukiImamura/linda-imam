<template>
    <div class="main">
        <div id="panel-data">
            <CopyStatementView v-if="statement.name" :statement="statement"></CopyStatementView>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CopyStatementView from "./CopyStatementView.vue";
import { ICopyBook, ICopyPrimitive} from "../declaration/interface/ICopy"
import PullDownSelector from "./components/PullDownSelector.vue"
import CopyStatement from "../model/CopyStatement";

@Component({
    components: { CopyStatementView, PullDownSelector}
})
export default class App extends Vue {

    // @ts-ignore
	private vscode = acquireVsCodeApi();

    public mounted(): void {
        // @ts-ignore
        (window as any).addEventListener('message', async e => {
            const { type, body, requestId } = e.data;
            switch (type) {
                case 'init':{}
                case 'copy':
                    {
                        this.statement = body.copy ? new CopyStatement(body.copy) : {};
                        // console.log("@@ message received!!")
                        // console.log(this.statement)
                        return;
                    }
		    }
        });
        
        this.vscode.postMessage({
            type: 'init',
        });
    }

    public statement: CopyStatement | {} = {};
}
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