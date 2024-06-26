import { NgModule } from "@angular/core";
import { RouterModule, Routes} from "@angular/router";
import { PostListComponent } from "./post-list.component";
import { PostCreateComponent } from "./post-create.component";
import { LoginComponent } from "./login.component";


    const routes: Routes = [
        { path: '', component: PostListComponent },
        { path: 'create', component: PostCreateComponent },
        {path: 'edit/:postId', component: PostCreateComponent },
        {path: 'login', component: LoginComponent}
    ];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}