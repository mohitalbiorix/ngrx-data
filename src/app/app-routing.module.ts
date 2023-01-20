import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddPostComponent } from './posts/add-post/add-post.component';
import { PostDetailsComponent } from './posts/post-details/post-details.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostResolver } from './posts/services/resolver/post.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'posts',
    component: PostListComponent,
    resolve: { posts: PostResolver },
  },
  {
    path: 'post/add',
    component: AddPostComponent
  },
  {
    path: 'post/details/:id',
    component: PostDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
