import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PostService } from './../post.service';
import { Post } from './../post';
import { Location } from '@angular/common';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  post?: Post;

  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.find();
  }
  find() {
    const id = Number(this.route.snapshot.paramMap.get('postId'));
    this.postService.find(id).subscribe(post => 
      this.post = post);
      console.log(this.post);
  } 
  goBack(): void{
    this.location.back();
  }
}
