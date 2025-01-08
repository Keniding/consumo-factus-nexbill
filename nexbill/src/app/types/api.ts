export interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
    page?: number;
}

export interface Pagination {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    links: PaginationLink[];
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: Pagination;
}
