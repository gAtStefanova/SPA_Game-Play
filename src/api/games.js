import { del, get, post, put } from "./api.js";


export async function getAllGames() {
    return get("/data/games?sortBy=_createdOn%20desc&distinct=category");
  }
  export async function createGame(game) {
    return post("/data/games", game);
  }

  export async function getGameById(id) {
    return get("/data/games/" + id);
  }
  export async function deleteGame(id){
    return del('/data/games/'+id)
}
export async function updateGame(id,game){
    return put('/data/games/'+id,game)
}
export async function loadAllCommentForGameById(gameId){
    return get(`/data/comments?where=gameId%3D%22${gameId}%22`)
}
export async function createNewComment(gameId,comment){
return post('/data/comments',{gameId,comment})
}
window.createNewComment=createNewComment
/*
export async function getBookByUser(userId){
    return get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}

export async function likeBook(bookId){
    return post('/data/likes',{
        bookId
    })
}
export async function getLikesByBooksId(bookId){
    return get(`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`)
}
export async function getMyLikeByBookId(bookId,userId){
    return get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}
export async function searchBooks(query){
return get('/data/books?where='+ encodeURIComponent(`title LIKE "${query}"`))
}
window.getMyLikeByBookId=getMyLikeByBookId
*/