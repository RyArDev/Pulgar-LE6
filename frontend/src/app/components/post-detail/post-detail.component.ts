import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  private routeSub: Subscription = new Subscription();
  private id: number = 0;

  post?: Post;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ){}

  ngOnInit(): void {
      this.routeSub = this.route.params.subscribe(params => {
        this.id = params['id'];
      })

      this.initData();
  }

  initData(): void {
    this.http.get<Post>("https://localhost:7176/api/post/" + this.id).subscribe({
      next: (data: Post) => {
        this.post = data;
        console.log(this.post);
      }
    })
  }

  formatDate(date: Date | undefined) {
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(date, 'MMM dd, yyyy \'at\' hh:mm:ss a');
    return formattedDate;
  }

}
