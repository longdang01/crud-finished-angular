import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from './../post';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  post?: Post;
  form?: FormGroup;
  constructor(
    public postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['postId'];
    this.postService.find(id).subscribe(data => this.post = data);
    
    this.form = new FormGroup( {
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required)
    });
  }
  get f() {
    return this.form?.controls;
  }
  submit() {
    this.postService.update(this.form?.value).subscribe(() => {
      this.router.navigateByUrl('/post/index');
    })
  }


}
