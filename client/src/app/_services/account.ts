// import { HttpClient } from '@angular/common/http';
// import { inject, Injectable, signal } from '@angular/core';
// import { User } from '../_models/user';
// import { map } from 'rxjs';
// import { environment } from '../../environments/environment';
// import { Likes } from '../_services/likes';

// @Injectable({
//   providedIn: 'root'
// })
// export class Account {
//   private http = inject(HttpClient);
//   private likeService = inject(Likes);
//   baseUrl = environment.apiUrl;
//   currentUser = signal<User | null>(null);

//   login(model: any){
//     return this.http.post<User>(this.baseUrl + 'account/login',model).pipe(
//       map(user => {
//         if(user){
//           // localStorage.setItem('user', JSON.stringify(user));
//           // this.currentUser.set(user);
//           this.setCurrentUser(user);
//         }
//       })
//     )
//   }

//   register(model: any){
//     return this.http.post<User>(this.baseUrl + 'account/register',model).pipe(
//       map(user => {
//         if(user){
//           this.setCurrentUser(user); 
//         }
//         return user;
//       })
//     )
//   }

//   // setCurrentUser(user: User){
//   //   localStorage.setItem('user',JSON.stringify(user));
//   //   this.likeService.getLikeIds();
//   //   this.currentUser.set(user);
//   // }
//   setCurrentUser(user: User){
//   if (!user.photoUrl) {
//     user.photoUrl = '';  // make sure this path is accessible
//   }
//   localStorage.setItem('user', JSON.stringify(user));
//   this.likeService.getLikeIds();
//   this.currentUser.set(user);
// }


//   logout(){
//     localStorage.removeItem('user');
//     this.currentUser.set(null);
//   }
// }
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../_models/user';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Likes } from '../_services/likes';

@Injectable({
  providedIn: 'root'
})
export class Account {
  private http = inject(HttpClient);
  private likeService = inject(Likes);
  baseUrl = environment.apiUrl;
  currentUser = signal<User | null>(null);

  constructor() {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user: User = JSON.parse(userJson);
      this.currentUser.set(user);
      this.likeService.getLikeIds();
    }
  }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map(user => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        if (user) {
          this.setCurrentUser(user);
        }
        return user;
      })
    );
  }

  setCurrentUser(user: User) {
    if (!user.photoUrl) {
      user.photoUrl = ''; // default or blank photo URL
    }
    localStorage.setItem('user', JSON.stringify(user));
    this.likeService.getLikeIds();
    this.currentUser.set(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
