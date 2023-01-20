import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  constructor(
    private postService: PostService,
    private router: Router
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

  // go to add post page with action 'ADD'
  onAddPost(){
    this.router.navigate(['/post/add'], {
      queryParams:{
        action:'ADD',
      }
    })
  }

  // go to add post page with action 'EDT'
  onUpdatePost(postId:string){
    this.router.navigate(['/post/add'], {
      queryParams:{
        action:'EDIT',
        postId:postId
      }
    })
  }

  // delete post action
  onDeletePost(event: Event, id: string) {
    event.preventDefault();
    if (confirm('Are you sure you want to delete the post')) {
      this.postService.delete(id);
    }
  }

  // go to post details page with postId
  onPostDetals(postId: string){
    this.router.navigate(['/post/details', postId])
  }

}
