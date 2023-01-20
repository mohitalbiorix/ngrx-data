import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  post: any

  constructor(
    private route: ActivatedRoute,
    private PostService: PostService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    // findout single posyt based on post id.
    this.PostService.entities$.subscribe((posts) => {
      this.post = posts.find((post) => post.id === id);
    });
  }

}
