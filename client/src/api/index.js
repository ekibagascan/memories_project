import axios from 'axios';

// const url = 'https://oyeeahmemories.herokuapp.com/posts';

const API = axios.create({ baseURL: 'http://localhost:5000' })

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})

export function fetchPosts(){return API.get('/posts')};
export function createPost(newPost){return API.post('posts', newPost)};
export function updatePost(id, updatedPost){return (API.patch(`/posts/${id}`, updatedPost));};
export function deletePost(id){return (API.delete(`/posts/${id}`))}
export function likePost(id){return (API.patch(`/posts/${id}/likePost`));};

export function signIn(formData){return (API.post('/user/signin', formData))}
export function signUp(formData){return (API.post('/user/signup', formData))}
