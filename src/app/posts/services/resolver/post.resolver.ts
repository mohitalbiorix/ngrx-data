import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { PostService } from '../post.service';
import { mergeMap, map, first, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostResolver implements Resolve<boolean> {
  constructor(private postService: PostService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.postService.loaded$.pipe(
      tap((loaded) => {
        console.log(loaded)
        if (!loaded) {
          this.postService.getAll();
        }
      }),
      first()
    )
  }
}
