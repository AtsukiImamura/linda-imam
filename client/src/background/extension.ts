import "reflect-metadata";
import * as vscode from 'vscode';
import { PawDrawEditorProvider } from './pawDrawEditor';
import { container } from "tsyringe";
import LspService from './service/LspService';
import LspCommunicator from "./model/lspCommunicator";

export function activate(context: vscode.ExtensionContext) {
	// Register our custom editor providers
	context.subscriptions.push(PawDrawEditorProvider.register(context));

	// container.register<LspService>("LspService", {
	// 	useClass: LspService,
	//   });
	// const service = (container.resolve("LspService") as LspService)
	
	// const com = new LspCommunicator((data: string) => {
	// 	console.log("[data] "+data);
	// })

	// console.log("start...");

	// com.putMessage( "hello world!!");
	
}
