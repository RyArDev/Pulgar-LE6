import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  form: any = {
    title: null,
    body: null
  }

  constructor(private http: HttpClient, private route: Router, private tokenStorage: TokenStorageService){}

  ngOnInit(): void {
      
  }

  onSubmit(): void {

    const {title, body} = this.form;

    this.http.post("https://localhost:7176/api/Post/add", this.form, {responseType: 'text', headers: {Authorization: `Bearer ${this.tokenStorage.getToken()}`} }).subscribe(data => {
      this.route.navigate(['/']);
    })

  }

}
