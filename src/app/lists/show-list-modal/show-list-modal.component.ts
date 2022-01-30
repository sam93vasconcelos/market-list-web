import {
  Component,
  OnInit,
  Inject,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/services/http-service';
import { CreateShareService } from 'src/app/services/create-share.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-show-list-modal',
  templateUrl: './show-list-modal.component.html',
  styleUrls: ['./show-list-modal.component.scss'],
})
export class ShowListModalComponent implements OnInit {
  @Input() listId: number;
  @Output() shareSaved = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
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
      .handle(this.shareForm.get('email').value, this.listId)
      .pipe(
        catchError((err) => {
          alert(err.message);
          return throwError(() => console.log(err));
        })
      )
      .subscribe((res) => {
        this.show = false;
        this.shareSaved.emit(res);
        this.shareForm.reset();
      });
  }
}
