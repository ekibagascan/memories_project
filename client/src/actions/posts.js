import * as api from "../api";
import { CREATE, UPDATE, DELETE, FETCH_ALL } from "../constants/actionTypes";

// Actions Creators
export function getPosts() {
  return async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();

        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error.message);
    }

  };
}

 export function createPost(post) {
   return async (dispatch) => {
     try {
         const { data } = await api.createPost(post);

         dispatch({ type: CREATE, payload: data });
     } catch (error) {
        console.log(error.message);
     }
   }
 }

 export function updatePost(id, post) {
   return async (dispatch) => {
     try {
       const { data } = await api.updatePost(id, post);

       dispatch({ type: UPDATE, payload: data })
     } catch (error) {
       console.log(error);
     }
   }
 }

 export function deletePost(id) {
   return async (dispatch) => {
     try {
       await api.deletePost(id);

       dispatch({ type: DELETE, payload: id });
     } catch (error) {
       console.log(error); 
     }
   }
 }

 export function likePost(id) {
   return async (dispatch) => {
     try {
       const { data } = await api.likePost(id);

       dispatch({ type: UPDATE, payload: data })
     } catch (error) {
       console.log(error);
     }
   }
 }