import {
    createNewComment,
  deleteGame,
  getGameById,
  loadAllCommentForGameById,
} from "../api/games.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (game, isOwner, onDelete, comments,loggedIn,onComment) => html` <section
  id="game-details"
>
  <h1>Game Details</h1>
  <div class="info-section">
    <div class="game-header">
      <img class="game-img" src=${game.imageUrl} />
      <h1>${game.title}</h1>
      <span class="levels">MaxLevel: ${game.maxLevel}</span>
      <p class="type">${game.category}</p>
    </div>

    <p class="text">${game.summary}</p>

    <!-- Bonus ( for Guests and Users ) -->
    <div class="details-comments">
      ${comments.length == 0
        ? html`<p class="no-comment">No comments.</p>`
        : html` <h2>Comments:</h2>
            <ul>
              ${comments.map(commentCard)}
            </ul>`}
      <!-- Display paragraph: If there are no games in the database -->
    </div>

    <!-- Edit/Delete buttons ( Only for creator of this game )  -->
    ${isOwner
      ? html`<div class="buttons">
          <a href="/edit/${game._id}" class="button">Edit</a>
          <a href="javascript:void(0)" @click=${onDelete} class="button"
            >Delete</a
          >
        </div>`
      : ""}
  </div>

  <!-- Bonus -->
  <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
  ${loggedIn ?html `<article class="create-comment">
    <label>Add new comment:</label>
    <form @submit=${onComment} class="form">
      <textarea name="comment" placeholder="Comment......" id="comment"></textarea>
      <input class="btn submit" type="submit" value="Add Comment" />
    </form>
  </article>`:''}
  
</section>`;

const commentCard = (comment) => html` <li class="comment">
  <p>Content: ${comment.comment}</p>
</li>`;

export async function detailsView(ctx) {
  const userData = getUserData();

  const [game, comments] = await Promise.all([
    await getGameById(ctx.params.id),
    await loadAllCommentForGameById(ctx.params.id),
  ]);

  const isOwner = userData?.id == game._ownerId;
  const loggedIn = isOwner==false && userData != null;

  ctx.render(detailsTemplate(game, isOwner, onDelete, comments,loggedIn,onComment));

  async function onDelete() {
    const choice = confirm("Are you sure you want to delete this game?");

    if (choice) {
      await deleteGame(ctx.params.id);
      ctx.page.redirect("/");
    }
  }
  async function onComment(event){
    event.preventDefault()
    const formData=new FormData(event.target);
    const commentContent=formData.get('comment')
if(commentContent==''){
    return alert('Comment field is required to make a comment!')
}
     await createNewComment(ctx.params.id,commentContent)
    event.target.reset();
     ctx.page.redirect("/game/"+ctx.params.id);
    }
}
