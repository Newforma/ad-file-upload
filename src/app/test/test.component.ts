import { Component, OnInit } from '@angular/core';
import { FileUploader } from "ad-file-upload";

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  public uploader:FileUploader = new FileUploader({url: URL});

  constructor() {}
}
