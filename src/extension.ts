import * as vscode from 'vscode';
import fs = require('fs');
import path = require('path');


export function activate(context: vscode.ExtensionContext) {
	vscode.window.showInformationMessage('Hello World!');

	let apiDisposable = vscode.commands.registerCommand('extension.lessGenerator', function (uri) {
		genCommand(uri);
	});

	context.subscriptions.push(apiDisposable);

	let serviceDisposable = vscode.commands.registerCommand('extension.serviceGenerator', function (uri) {
		vscode.window.showQuickPick(['a', 'b', 'c']).then(res => {
			vscode.window.showInformationMessage(res as string);
			vscode.commands.executeCommand('node -v')
		})
	});

	context.subscriptions.push(serviceDisposable);
}

export function deactivate() { }



export function genCommand(uri: any) {
	const currentPath = uri.fsPath;
	const stats = fs.statSync(currentPath);

	let parentPath: string = "";
	// 获取文件夹名称
	if (stats.isDirectory()) parentPath = currentPath;
	if (stats.isFile()) parentPath = path.dirname(currentPath);
	const folderPath = parentPath;
	// 当前文件夹名称
	const fileFolderName = getFolderName(folderPath, "\\");
	// less文件的路径
	const lessFilePath = path.join(folderPath, `${fileFolderName}.component.less`);

	fs.exists(lessFilePath, (res) => {
		if (res) {
			vscode.window.showErrorMessage(`${fileFolderName}.component.less已经存在！`);
			return;
		}

		fs.writeFile(lessFilePath, '', (error) => {
			if (error) {
				vscode.window.showInformationMessage(error.message);
				return;
			}
			vscode.window.showInformationMessage(`创建${fileFolderName}.component.less成功!`);
		});
	})
}


function getFolderName(path: string, split: string) {
	let strArr = path.split(split)
	let res = strArr[strArr.length - 1] != "" ? strArr[strArr.length - 1] : strArr[strArr.length - 2]
	return res;
}