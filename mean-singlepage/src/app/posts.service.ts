import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { response } from "express";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class PostsService{
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient, private router: Router){}

    getPosts(){
        this.http.get<{ message: string, posts: any }>('http://localhost:3000/api/posts')
        .pipe(map((postData) => {
                return postData.posts.map((post: { title: any; content: any; _id: any; }) => {
                    return {
                        title: post.title,
                        content: post.content,
                        id: post._id
                    };
                });
        }))
        .subscribe((convertedposts) =>{
            this.posts = convertedposts;
            this.postsUpdated.next([...this.posts]);
        });
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    getPost(id: string){
       //return {...this.posts.find(p => p.id === id)};
        return this.http.get<{_id: string, title: string, content: string}>('http://localhost:3000/api/posts' +id)
    }

    addPost(id: string, title: string, content: string){
        const post: Post = {id: id, title:title, content: content};
        this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/posts', post)
        .subscribe((responseData) => {
            const id = responseData.postId;
            post.id = id;
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
            this.router.navigate(["/"]);
        })
    }

    updatePost(id: string, title: string, content: string){
        const post: Post ={ id: id, title: title, content: content};
        this.http.put('http://localhost:3000/api/posts/' +id, post)
        .subscribe((response) => {
            const updatePost = [...this.posts];
            const oldPostIndex = updatePost.findIndex(p => p.id === post.id);
            updatePost[oldPostIndex] = post;
            this.posts = updatePost;
            this.postsUpdated.next([...this.posts]);
            this.router.navigate(["/"]);
        });
    }
    deletePost(postId: string){
        this.http.delete('http://localhost:3000/api/posts/' +postId)
        .subscribe(() => {
            const updatedPosts = this.posts.filter(post => post.id !== postId);
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts]);
        });
    }
}