import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'code-editor-atom',
  templateUrl: 'code-editor.component.html',
})
export class CodeEditorAtom implements OnInit {
  editorOptions = { theme: 'vs-dark', language: 'javascript' };
  code: string = 'function x() {\nconsole.log("Hello world!");\n}';
  constructor() {}

  ngOnInit() {}
}
