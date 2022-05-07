<template>
    <div class="main">
        <div id="panel-copy-selection" class="header-selection">
            <div class="title">
                <span>COPY句</span>
            </div>
            <PullDownSelector :selections="copySelections" :title="'-- COPY句を選択 --'" @select="selectCopyBook">
                <div id="no-previous-selection"></div>
            </PullDownSelector>
        </div>
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


    public created(): void {
        console.log("::::created.");
        // const buf = Buffer.from(new ArrayBuffer(10))
        // console.log(buf)
    }
    public mounted(): void {
        // @ts-ignore
        (window as any).addEventListener('message', async e => {
            const { type, body, requestId } = e.data;
            switch (type) {
                case 'init':{}
                case 'copy':
                    {
                        console.log("@@ message received!!")
                        console.log(body.copy)
                        this.statement = body.copy ? new CopyStatement(body.copy) : {};
                        return;
                    }
		    }
        });
        
        console.log("mounted!!!!!")
        this.vscode.postMessage({
            type: 'copy',
            path: "C:\\Users\\ohmoo\\projects\\linda-imam\\client\\media\\test.cpy",
        });
    }

    public get copySelections(): any[] {
        return [
            {
                id: "C0A000A",   
                title: "C0A000A"   
            },
            {
                id: "C0A000B",   
                title: "C0A000B"   
            }
        ]
    }

    public selectCopyBook(op: string): void {
        console.log(`## selectCopyBook  op: ${op}`)
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