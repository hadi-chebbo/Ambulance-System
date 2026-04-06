export interface Center {
    id : number;
    name : string;
    address : string;
    phone : string;
    email : string;
    is_active : boolean;
    created_at ?: string;
    updated_at ?: string;
}

export interface PaginationLinks {
    first : string | null;
    last : string | null;
    prev : string | null;
    next : string | null;
}

export interface PaginationMetaLink {
    url : string | null;
    label : string;
    page : number | null;
    active : boolean;
}

export interface PaginationMeta {
    current_page : number;
    from : number;
    last_page : number;
    links : PaginationMetaLink[];
    path : string;
    per_page : number;
    to : number | null;
    total : number;
}

export interface CenterResponse {
    data : Center[];
    links : PaginationLinks;
    meta : PaginationMeta;
}