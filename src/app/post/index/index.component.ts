import { PostService } from './../post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../post';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  posts: Post[] = [];

  constructor(public postService: PostService) { }

  ngOnInit(): void {
    this.postService.getAll().subscribe(data => {
      console.log(data);

      this.posts = data});  
  }

  deletePost(id: number) {
    this.postService.delete(id).subscribe(() => {
      this.posts = this.posts.filter((item) => item.id !== id)
    });
  }

}
