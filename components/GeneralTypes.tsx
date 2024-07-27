export interface postFC {
    likes: []
    postPhoto: string
    caption: string
    tag: string
    postPhot: string
    _id: string | number
    map: any
}

export interface creatorFC {
    email: string,
    clerkId: string,
    _id: string,
    creatorId: string,
    profilePhoto: string,
    firstName: string,
    lastName: string,
    username: string,
    following: [],
    posts: [],
    followers: [],
    savedPosts: []
    likedPosts: []
    map: any
};


export interface postFC {
    likes: []
    postPhoto: string
    caption: string
    tag: string
    postPhot: string
    _id: string | number
    map: any
}

export interface creatorAndPostFC {
    creator: {
        clerkId: string,
        _id: string,
        creatorId: string,
        profilePhoto: string,
        firstName: string,
        lastName: string,
        username: string,
        following: [],
        posts: [],
        followers: [],
        savedPosts: []
        likedPosts: []
        
    }
    likes: []
    postPhoto: string
    caption: string
    tag: string
    postPhot: string
    _id: string | number
    map: any
};