import * as vscode from 'vscode';
import fs = require('fs');
import path = require('path');
import { runInTerminal } from 'run-in-terminal';
import * as cp from 'child_process';


export function activate(context: vscode.ExtensionContext) {
	// 注册命令
	let apiDisposable = vscode.commands.registerCommand('extension.lessGenerator', function (uri) {
		generateCommand(uri, 'less');
	});

	let serviceDisposable = vscode.commands.registerCommand('extension.serviceGenerator', function (uri) {
		generateCommand(uri, 'service');
	});

	let readmeDisposable = vscode.commands.registerCommand('extension.readmeGenerator', function (uri) {
		generateCommand(uri, 'readme');
	});

	let ngJojoDisposable = vscode.commands.registerCommand('extension.ngJojoGenerator', function (uri) {
		ngJojoCommand();
	});

	context.subscriptions.push(apiDisposable, serviceDisposable, readmeDisposable, ngJojoDisposable);
}

export function deactivate() { }

export function generateCommand(uri: any, type?: string) {

	const currentPath = uri.fsPath;
	const stats = fs.statSync(currentPath);

	let parentPath: string = "";

	if (stats.isDirectory()) parentPath = currentPath;
	if (stats.isFile()) parentPath = path.dirname(currentPath);
	const folderPath = parentPath;

	const fileFolderName = getFolderName(folderPath, "\\");

	if (type == 'less') {
		generateLess(folderPath, fileFolderName);
	}
	else if (type == 'service') {
		generateService(folderPath, fileFolderName);
	}
	else if (type == 'readme') {
		generateREADME(folderPath, fileFolderName);
	}

}

/**
 * 生成.less
 */
export function generateLess(folderPath: string, fileFolderName: string) {
	const filePath = path.join(folderPath, `${fileFolderName}.component.less`);

	fs.exists(filePath, (res) => {
		if (res) {
			vscode.window.showErrorMessage(`${fileFolderName}.component.less已经存在！`);
			return;
		}

		fs.writeFile(filePath, '', (error) => {
			if (error) {
				vscode.window.showInformationMessage(error.message);
				return;
			}
			vscode.window.showInformationMessage(`创建${fileFolderName}.component.less成功!`);
		});
	})
}

/**
 * 生成service.ts
 */
export function generateService(folderPath: string, fileFolderName: string) {
	const filePath = path.join(folderPath, `${fileFolderName}.service.ts`);

	fs.exists(filePath, (res) => {
		if (res) {
			vscode.window.showErrorMessage(`${fileFolderName}.service.ts已经存在！`);
			return;
		}

		let serviceContent = `import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})

export class ${classify(fileFolderName)}Service {

	constructor() { }
}`;

		fs.writeFile(filePath, serviceContent, (error) => {
			if (error) {
				vscode.window.showInformationMessage(error.message);
				return;
			}
			vscode.window.showInformationMessage(`创建${fileFolderName}.service.ts成功!`);
		});
	})
}

/**
 * 生成README.md
 */
export function generateREADME(folderPath: string, fileFolderName: string) {
	const filePath = path.join(folderPath, `README.md`);

	fs.exists(filePath, (res) => {
		if (res) {
			vscode.window.showErrorMessage(`README.md已经存在！`);
			return;
		}

		const content = `# README`;

		fs.writeFile(filePath, content, (error) => {
			if (error) {
				vscode.window.showInformationMessage(error.message);
				return;
			}
			vscode.window.showInformationMessage(`创建README.md成功!`);
		});
	})
}

/**
 * 执行ng-jojo的命令
 */
export function ngJojoCommand() {
	const options = [
		'ng g ng-jojo:dynamic --init',
		'ng g ng-jojo:dynamic',
		'ng g ng-jojo:tree-manager --init',
		'ng g ng-jojo:tree-manager',
		'ng g ng-jojo:table',
		'ng g ng-jojo:form',
		'ng g ng-jojo:blank'
	];

	vscode.window.showQuickPick(options,{
		placeHolder:'请选择要执行的命令'
	}).then(res => {
		let terminal = vscode.window.createTerminal();
		terminal.show();
		terminal.sendText(res as string);
	})
}

function runCommandInOutputWindow(args: string[], cwd: string) {

	vscode.window.showInputBox({
		placeHolder: "请输入模块名称"
	}).then(moduleName => {
		let terminal = vscode.window.createTerminal();
		terminal.show();
		terminal.sendText(``);
	})

}

/**
 * app-home转成AppHome这样
 * @param str 右键点击的文件夹的名称
 * 如果app-home转成APPHome
 */
function classify(str: string): string {
	let arr = str.split('-');
	let res = '';
	for (let i = 0; i < arr.length; i++) {
		const firstWord = arr[i][0].toLocaleUpperCase();
		const item = arr[i].split('');
		// splice的返回值是被改变的元素
		item.splice(0, 1, firstWord);
		res += item.join('');
	}
	return res;
}

/**
 * 获取文件夹名称
 */
function getFolderName(path: string, split: string) {
	let strArr = path.split(split)
	let res = strArr[strArr.length - 1] != "" ? strArr[strArr.length - 1] : strArr[strArr.length - 2]
	return res;
}