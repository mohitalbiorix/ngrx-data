import { Injectable } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Update } from '@ngrx/entity';

@Injectable({
  providedIn: 'root'
})
export class PostsDataService extends DefaultDataService<Post> {

  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Post', http, httpUrlGenerator);
  }

  // for get all post data
  // getAll(), add(), update(), delete() => dataService methods bydefault
  override getAll(): Observable<Post[]> {
    return this.http
      .get(`https://vue-completecourse.firebaseio.com/posts.json`)
      .pipe(
        map((data: any) => {
          const posts: Post[] = [];
          for (let key in data) {
            posts.push({ ...data[key], id: key });
          }
          return posts;
        })
      );
  }

   // add post action
  override add(post: Post): Observable<Post> {
    return this.http
      .post<{ name: string }>(
        `https://vue-completecourse.firebaseio.com/posts.json`,
        post
      )
      .pipe(
        map((data) => {
          return { ...post, id: data.name };
        })
      );
  }

  // update post action
  override update(post: Update<Post>): Observable<Post> {
    return this.http.put<Post>(
      `https://vue-completecourse.firebaseio.com/posts/${post.id}.json`,
      { ...post.changes }
    );
  }

  // delete post action
  override delete(id: string): Observable<string> {
    return this.http
      .delete(`https://vue-completecourse.firebaseio.com/posts/${id}.json`)
      .pipe(
        map((data) => {
          return id;
        })
      );
  }
}
