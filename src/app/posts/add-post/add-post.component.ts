import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostService } from '../services/post.service';
import { PostsDataService } from '../services/posts-data.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  postForm!: FormGroup;
  action: string = 'ADD';
  postId!: string;

  constructor(
    private postDataService: PostsDataService,
    private postService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initPostForm();
    this.activatedRoute.queryParams.subscribe((query) => {
      this.action = query['action'];
      this.postId = query['postId'];
    })
    if (this.action === 'EDIT') {
      this.postService.entities$.subscribe(
        (posts) => {
          const post = posts.find((post) => post.id === this.postId);
          this.postForm.patchValue({
            title: post?.title,
            description: post?.description,
          })

        }
      )
    }
  }

  // initalization PostForm
  initPostForm() {
    this.postForm = new FormGroup({
      title: new FormControl(null),
      description: new FormControl(null),
    });
  }

  // call add and edit post actions based on it's conditions
  onAddPost() {
    if (this.postForm.value.title && this.postForm.value.description) {
      const post: Post = this.postForm.value;
      if (this.action === 'ADD') {
        this.postDataService.add(post).subscribe(
          (data) => {
            if (data) {
              this.router.navigate(['/posts']);
            }
          }
        )
      }
      if (this.action === 'EDIT') {
        const postData = {
          ...this.postForm.value,
          id: this.postId,
        };
        this.postDataService.update(postData);
        this.router.navigate(['/posts']);
      }
    }
  }

}
