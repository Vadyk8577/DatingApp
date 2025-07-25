
import { HttpInterceptorFn } from "@angular/common/http";


export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const userJson = localStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : null;

  if (user && user.token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.token}`
      }
    });
  }

  return next(req);
};




