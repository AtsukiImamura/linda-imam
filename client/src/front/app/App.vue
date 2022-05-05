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
            <CopyStatement :statement="statement"></CopyStatement>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CopyStatement from "./CopyStatement.vue";
import { ICopyBook, IStatement} from "../declaration/interface/ICopy"
import PullDownSelector from "./components/PullDownSelector.vue"

@Component({
    components: { CopyStatement, PullDownSelector}
})
export default class App extends Vue {

    public mounted(): void {}

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

    public statement: ICopyBook = {
        id: "C001",
        name: "企業",
        statements: [
            {
                id: "001",
                name: "名称",
                value: "This is a name",
                redefines:[]
            } as IStatement,
            {
                id: "001",
                name: "設立年月日",
                value: "20220401",
                redefines: [
                    {
                        id: "C002",
                        name: "年月日",
                        statements: [
                            {
                                id: "00101",
                                name: "年",
                                value: "2022",
                                redefines:[
                                    {
                                        id: "C002",
                                        name: "年月日４",
                                        statements: [
                                            {
                                                id: "001021",
                                                name: "年１",
                                                value: "2",
                                                redefines:[]
                                            } as IStatement,
                                            {
                                                id: "001021",
                                                name: "年２",
                                                value: "0",
                                                redefines:[]
                                            } as IStatement,
                                            {
                                                id: "001021",
                                                name: "年３",
                                                value: "2",
                                                redefines:[]
                                            } as IStatement,
                                            {
                                                id: "001021",
                                                name: "年４",
                                                value: "2",
                                                redefines:[]
                                            } as IStatement,
                                        ]
                                    }
                                ]
                            } as IStatement,
                            {
                                id: "00102",
                                name: "月",
                                value: "04",
                                redefines:[]
                            } as IStatement,
                            {
                                id: "00103",
                                name: "日",
                                value: "01",
                                redefines:[]
                            } as IStatement,
                        ]
                    } as IStatement,

                ]
            } as IStatement,
            {
                id: "001",
                name: "代表取締役",
                value: "iMam",
                redefines:[]
            } as IStatement,
        ]
    }
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