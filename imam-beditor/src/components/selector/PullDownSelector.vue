<template>
  <div class="general-selection ">
        <div class="contents-background" v-if="copySelectionOpened" @click="copySelectionOpened = !copySelectionOpened"></div>
        <div class="selected" @click="copySelectionOpened = !copySelectionOpened">
            <span>{{ selectedOptionTitle }}</span>
        </div>
        <div class="list" v-if="copySelectionOpened">
            <template>
                <slot></slot>
            </template>
            <template v-if="selections.length > 0">
                <div class="option"  v-for="(op, index) in selections" :key="index" :value="op.id" @click="select(op.id)"><span>{{ op.title }}</span></div>
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
    
    @Prop() selections!: {id: string, title: string}[];

    @Prop() title?: string;

    public copySelectionOpened: boolean = false;

    private selectedOptionId: string = "";

    public get selectedOptionTitle(): string {
        if(this.selectedOptionId == "") {
            return this.title ? this.title : "-- 選択 --";
        }
        const op = this.selections.filter(op => op.id == this.selectedOptionId);
        return op[0].title
    }

    @Emit()
    public select(op: string) {
        this.selectedOptionId = op;
        this.copySelectionOpened = false;
        return op;
    }


</script>

<style lang="scss" scoped>

.general-selection {
	width: 100%;
	position: relative;
	.selected {
		padding: 3px 4px;
		border-bottom: 1px solid rgba(80, 80, 80, 0.9);;
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
			right: 18px;
			transform: rotate(45deg);
		}
		&:before {
			top: 15px;
			right: 11px;
			transform: rotate(-45deg);
		}
	}
	.list {
		&.closed {
			display: none;
		}
		position: absolute;
		top: 5px;
		left: 0px;
		background-color: #151515;
		box-shadow: 3px 5px 3px rgba(60, 60, 60, 0.8);
		width: 100%;
		.option {
			width: calc(100% - 12px);
			padding: 6px 6px;
			&:hover {
				background-color: #222222;
				cursor: pointer;
				transition-duration: 0.25s;
			}
		}
	}
}
.contents-background {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(49,49,49,0.3);
	transition-duration: 0.35s;
}
</style>