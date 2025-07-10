export interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPage: number;
}

export class PaginatedResult<T> {
    items?: T;
    pagination?: Pagination
}