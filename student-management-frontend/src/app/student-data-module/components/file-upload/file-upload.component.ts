import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  // public uploadForm!: FormGroup;
  uploadForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  constructor(private http: HttpClient) { }
  ngOnInit(): void {

    // let file = '';
    // let fileSource = '';

    // this.uploadForm = new FormGroup({
    //   file: new FormControl(file, [Validators.required]),
    //   fileSource: new FormControl(fileSource, [Validators.required])
    // });
  }

  get f() {
    return this.uploadForm.controls;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const csv = event.target.files[0];
      this.uploadForm.patchValue({ fileSource: csv });
    }
  }

  submit() {
    const formData = new FormData();
    formData.append('csv', this.uploadForm.get('fileSource')!.value);

    this.http.post('http://localhost:3000/upload', formData)
      .subscribe((data) => {
        alert("Data imported successfully")
      }
      )
  }
}