import { Component, inject, input, OnInit, output } from '@angular/core';
import { Member } from '../../_models/member';
import { DecimalPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import {FileUploader, FileUploadModule} from 'ng2-file-upload';
import { Account } from '../../_service/account';
import { environment } from '../../../environments/environment';
import { Photo } from '../../_models/photo';
import { Members } from '../../_service/members';

@Component({
  selector: 'app-photo-editor',
  imports: [NgIf,NgFor,NgStyle,NgClass, FileUploadModule,DecimalPipe],
  templateUrl: './photo-editor.html',
  styleUrl: './photo-editor.css'
})
export class PhotoEditor implements OnInit {
  private accountService = inject(Account);
  private memberService = inject(Members);
  member = input.required<Member>();
  uploader?: FileUploader;
  hasBaseDropzone = false;
  baseUrl = environment.apiUrl;
  memberChange = output<Member>();

  ngOnInit(): void {
    this.initilizeUploader();
  }

  fileOverBase(e:any){
    this.hasBaseDropzone = e;
  }

  deletePhoto(photo: Photo){
    this.memberService.deletePhoto(photo).subscribe({
      next: _ => {
        const updatedMember = {...this.member()};
        updatedMember.photos = updatedMember.photos.filter(x => x.id !== photo.id);
        this.memberChange.emit(updatedMember);
      }
    })
  }

  setMainPhoto(photo: Photo){
    this.memberService.setMainPhoto(photo).subscribe({
      next: _ => {
        const user = this.accountService.currentUser();
        if(user){
          user.photoUrl = photo.url;
          this.accountService.setCurrentUser(user)
        }
        const updateMember = {...this.member()}
        updateMember.photoUrl = photo.url;
        updateMember.photos.forEach(p => {
          if(p.isMain) p.isMain = false;
          if(p.id === photo.id) p.isMain = true;
        });
        this.memberChange.emit(updateMember);
      }
    })
  }

  initilizeUploader(){
    this.uploader = new FileUploader({
      url:this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.accountService.currentUser()?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false
    }

    this.uploader.onSuccessItem = (item,response,status,headers) => {
      const photo = JSON.parse(response);
      const updatedMember = {...this.member()}
      updatedMember.photos.push(photo);
      this.memberChange.emit(updatedMember);
      if(photo.isMain){
        const user = this.accountService.currentUser();
        if(user){
          user.photoUrl = photo.url;
          this.accountService.setCurrentUser(user)
        }
        updatedMember.photoUrl = photo.url;
        updatedMember.photos.forEach(p => {
          if(p.isMain) p.isMain = false;
          if(p.id === photo.id) p.isMain = true;
        });
        this.memberChange.emit(updatedMember);
      }
    }
  }
}
