// import { HttpParams, HttpResponse } from "@angular/common/http";
// import { signal } from "@angular/core";
// import { PaginatedResult } from "../_models/pagination";


// export function setPaginatedResponse<T>(response: HttpResponse<T>,paginatedResultSignal: ReturnType<typeof signal<PaginatedResult<T> | null>>){
//     paginatedResultSignal.set({
//           items: response.body as T,
//           pagination: JSON.parse(response.headers.get('Pagination')!)
//         })
//   }


//  export function setPaginationHeaders(pageNumber: number,pageSize: number){
//     let params = new HttpParams();

//     if (pageNumber && pageSize){
//       params = params.append('pageNumber', pageNumber);
//       params = params.append('pageSize', pageSize);
//     }

//     return params;
//   }
import { HttpParams, HttpResponse } from "@angular/common/http";
import { signal } from "@angular/core";
import { PaginatedResult } from "../_models/pagination";

export function setPaginatedResponse<T>(
  response: HttpResponse<T>,
  paginatedResultSignal: ReturnType<typeof signal<PaginatedResult<T> | null>>
) {
  const paginationHeader = response.headers.get('Pagination');
  const pagination = paginationHeader ? JSON.parse(paginationHeader) : null;

  paginatedResultSignal.set({
    items: response.body as T,
    pagination: pagination,
  });
}

export function setPaginationHeaders(pageNumber: number, pageSize: number) {
  let params = new HttpParams();

  if (pageNumber && pageSize) {
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
  }

  return params;
}

