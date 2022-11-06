interface I_API_URLS {
    full: string,
    raw: string,
    regular: string,
    small: string,
    thumb: string
}


 interface  I_API_User {
    id: string;
    updated_at: Date;
    username: string;
    name: string;
    first_name: string;
    last_name: string;
}

 interface I_API_Image {
    id: string;
    created_at: Date;
    updated_at: Date;
    promoted_at?: any;
    color: string;
    blur_hash: string;
    description?: any;
    alt_description?: any;
    urls: I_API_URLS;
    likes: number;
    user: I_API_User;
}

