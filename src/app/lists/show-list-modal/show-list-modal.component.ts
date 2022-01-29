import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { CreateShareService } from 'src/app/services/create-share.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-show-list-modal',
  templateUrl: './show-list-modal.component.html',
  styleUrls: ['./show-list-modal.component.scss'],
})
export class ShowListModalComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpServiceService,
    private createShareService: CreateShareService
  ) {}
  ngOnInit(): void {}

  shareForm = this.formBuilder.group({
    email: [''],
  });

  show = false;

  toggleShare() {
    this.show = !this.show;
  }

  handleShare() {
    this.createShareService
      .handle(this.shareForm.get('email').value, 1)
      .pipe(
        catchError((err) => {
          alert(err.message);
          return throwError(() => console.log(err));
        })
      )
      .subscribe((res) => {
        console.log(res);
        alert('Salvo');
      });
  }
}
