import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from './posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from './post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html'
})
export class PostCreateComponent implements OnInit {

  enteredTitle = '';
  enteredContent = '';
  private mode = 'create';
  private postId: string | null = null;
  post: Post = { id: '', title: '', content: '' }; // Initialize with default values

  constructor(public postsService: PostsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId') || null; // Handle potential null
       // this.post = this.postsService.getPost(this.postId!); // Assert non-null
      } else {
        this.mode = 'create';
        this.postId = null;
        this.post = { id: '', title: '', content: '' }; // Initialize with appropriate default
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postsService.addPost(form.value.id, form.value.title, form.value.content);
    } else {
      this.postsService.updatePost(
        this.postId!,
        form.value.title,
        form.value.content
      );
    }
    form.resetForm();
  }
}
