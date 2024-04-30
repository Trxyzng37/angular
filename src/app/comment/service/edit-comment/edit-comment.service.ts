import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/shared/services/post/post.service';
import { StorageService } from 'src/app/shared/storage/storage.service';
import { Comment } from 'src/app/view-detail-post/view-detail-post/pojo/comment';
import { EditCommentRequest } from '../../pojo/edit-comment-request';

@Injectable({
  providedIn: 'root'
})
export class EditCommentService {

  constructor(
    private storageService: StorageService,
    private postService: PostService
  ) { }

  private endpoint: string = "/edit-comment";

  editComment(post_id: number, _id: number, edit_content: string): Observable<Comment> {
    const uid = parseInt(this.storageService.getItem("uid"));
    const request = new EditCommentRequest(post_id, uid, _id, edit_content);
    const body: string = JSON.stringify(request);
    let header: HttpHeaders = new HttpHeaders();
    header = header.append("Accept", 'application/json');
    header = header.append('Content-Type', 'application/json');
    return this.postService.post<Comment>(this.endpoint, header, body, false);
  }
}
