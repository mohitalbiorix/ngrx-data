import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  constructor(
    private postService: PostService
  ) { }

  posts$!: any

  ngOnInit(): void {

    /* get data without using resolver 
      this.posts$ = this.postService.getAll();
    */

    // get data with using resolver 
    /** 
     * entities$:  Observable of all entities in the cached collection. 
     * */
    this.posts$ = this.postService.entities$;

  }

}
