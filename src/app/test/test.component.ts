import { Component, OnInit } from '@angular/core';
import { FileUploader } from "ad-file-upload";
import { BehaviorSubject, Observable, Subject } from 'rxjs';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  private uploadProgressSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  uploadProgress = this.uploadProgressSubject.asObservable();
  constructor() {
    this.uploadProgress.subscribe(progress => console.log(progress));
  }

  // uploadFile(file: any) {
  //   this.uploadFileToBucket(file, URL, this.uploadProgressSubject);
  // }

  uploadFileToBucket(file: File, url: string, progressObservable: Subject<Number>): Observable<any> {
    progressObservable.next(0);
    const options = {
      url: URL,
      method: 'PUT',
      headers: [
        {
          name: 'Content-Type',
          value: file.type
        }
      ],
      disableMultipart: true,
      reportProgress: true
    };

    const uploader = this.createFileUploader(options);
    uploader.onAfterAddingFile = addedFile => {
      addedFile.withCredentials = false;
    };

    uploader.addToQueue([file]);
    uploader.uploadAll();

    return Observable.create(observer => {
      uploader.onProgressAll = function(progress: any): any {
        progressObservable.next(progress);
        return { progress };
      };
      uploader.onCompleteAll = function(): any {
        observer.next();
        observer.complete();
        return void 0;
      };
      uploader.onErrorItem = function(item: any, response: string, status: number): any {
        observer.error({ status: status });
        return void 0;
      };
    });
  }

  createFileUploader(options): FileUploader {
    return new FileUploader(options);
  }

  private getUrl(): string {
    return '';
  }
}
