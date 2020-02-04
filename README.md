# NG-Soarway-VsCode
Soarway Angular项目代码片段和小功能的插件。之前的smart-pcq-snippets全部移到此插件实现。

### 小功能
* 右键工作目录可快速生成less.ts、service.ts和README.md
* 右键工作目录可执行更便捷的执行ng-jojo的命令


### 代码片段一览

### sff
```
*ngFor="let item of items;trackBy: trackByIndex;"
```

### sii
```
*ngIf=""
```

### sm-form
```
<form nz-form [formGroup]="form" (ngSubmit)="submit(event)">
   
</form>
```

### sm-form-input
```
<nz-form-item nz-row>
    <nz-form-control [nzSpan]="controlSpan">
        <input nz-input formControlName="" id="" placeholder="">
    </nz-form-control>
</nz-form-item>
```
***说明：sm-form-select、sm-form-input-number、sm-form-radio-group、sm-form-switch 同上**


### smart_error_template
```
<ng-template #ErrorTpl>
   
</ng-template>
```
***说明：sm-template-warning、 sm-template-success 同上**

### sm-modal
```
<nz-modal [(nzVisible)]="isVisible" nzTitle="'title'" (nzOnCancel)="handleCancel()" (nzOnOk)="handleOk()">
   
</nz-modal>
```

### sm-card
```
<nz-card nzTitle="'title'"  [nzExtra]="extraTpl">
   <ng-template #extraTpl>
       <button nz-button nzShape="circle" [nzLoading]="http.loading" (click)="reload()">
           <i nz-icon nzType="reload" nzTheme="outline"></i>
       </button>
   </ng-template>

   
</nz-card>
```

###  sm-drawer
```
<nz-drawer [nzVisible]="isVisible" nzTitle="'title'" (nzOnClose)="handleClose()">
   
</nz-drawer>
```

### sm-btn-reload
```
<button nz-button nzShape="circle" [nzLoading]="http.loading" (click)="reload()">
    <i nz-icon nzType="reload" nzTheme="outline"></i>
</button>
```



## **下面的片段适用于ts文件**

### sm-ies
```
if (res.status.isSuccess) {
    this.msg.success(``);
       
} else {
    this.msg.error(``);

}
```

### sm-form
```
this.form = this.fb.group({
   
});
```

### sm-get
```
get () {
   return this.form.controls.;
}
```

### sm-msg-success
```
this.msg.success(``);
``` 
***说明：sm-msg-error、sm-msg-warning、 sm-msg-info同上**

### sm-func-submit
```
submit() {
   
}
```

### sm-func-reload
```
reload() {
       
}
```

# Other
con  => console.log()

cons => constructor() { }

expcl => export class { }

expif => expor interface { }

jsons => JSON.stringify()

jsonp => JSON.parse()