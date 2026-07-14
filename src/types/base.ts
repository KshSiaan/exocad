
export interface ApiResponse<T>{
    status:boolean,
    message:string,
    data:T
}

export interface PagedResponse<T> {
  code: number;
  message: string;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: T[];
}
export interface Paginator<T>{
    current_page: number
    data: T,
    next_page_url: any
    path: string
    per_page: number
    prev_page_url: any
    to: number
    total: number
  }