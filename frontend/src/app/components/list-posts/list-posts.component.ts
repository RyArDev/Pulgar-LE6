import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss']
})
export class ListPostsComponent implements OnInit {

  posts?: Post[] = [];
  displayedPosts: Post[] = [];
  pageSize: number = 3;
  currentPage: number = 1;
  pages: number[] = [];

  constructor(private http: HttpClient) {}

  calculatePages() {
    this.pages = [];
    const totalPages = Math.ceil(this.posts!.length / this.pageSize);
    for (let i = 1; i <= totalPages; i++) {
      this.pages.push(i);
    }
    this.setCurrentPage(1);
  }

  setCurrentPage(pageNumber: number) {
    this.currentPage = pageNumber;
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedPosts = this.posts!.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.setCurrentPage(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.pages.length) {
      this.setCurrentPage(this.currentPage + 1);
    }
  }

  ngOnInit(): void {
      this.initData();
  }

  initData(): void {
    this.http.get<Post[]>("https://localhost:7176/api/post/all").subscribe({
      next: async (data: Post[]) => {
        this.posts = data;
        this.calculatePages();
        console.log(this.posts);
      }
    })
  }

}
