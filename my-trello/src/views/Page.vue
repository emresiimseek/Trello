<template>
  <div>
    <div class="board-header"></div>
    <div class="card-container">
      <div class="Card" :key="card.id" v-for="card in cards">
        <div class="card-header">{{ card.title }}</div>
        <div class="card-body">
          <div class="comment-area">
            <div
              :key="comment.id"
              v-for="comment in card.comments"
              class="comment-item"
            >
              <input
                :id="comment.userId"
                type="text"
                :value="comment.text"
                :readonly="comment.userId != currentUser.id"
              />

              <div class="editable"></div>
              <i class="fas fa-user-edit"></i> {{ comment.user.userName }}
            </div>

            <div class="defualt-add">
              <input
                class="add-input"
                v-model="commentText"
                type="text"
                placeholder="Yorum ekle..."
              />

              <div class="add-button">
                <sui-button color="blue" inverted>Ekle</sui-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Card, Comment, User } from "../store/models";
import cards from "../store/modules/cards";

@Component
export default class Page extends Vue {
  private commentText: string;
  private cards: Card[];
  private currentUser: User;
  private comments: Comment[];
  private editableInput: boolean;
  /**
   *
   */
  constructor() {
    super();
    this.editableInput = false;
    this.commentText = "";
    this.cards = [
      { id: 0, title: "", description: "", boardId: 0, enumCardStatus: 0 },
    ];
    this.comments = [{ id: 0, cardId: 0, text: "" }];
    this.currentUser = JSON.parse(sessionStorage.getItem("currentUser") ?? "");
  }
  mounted() {
    this.getCards(parseInt(this.$route.params.id));
  }
  async getCards(boardId: number) {
    this.cards = await cards.getCardByBoardId(boardId);
    console.log(this.cards);
  }
}
</script>

<style scoped>
.fa-plus-square:hover {
  color: #56baed;
  cursor: pointer;
}
.add-area {
  padding-bottom: 5px;
  margin-left: 10px;
  display: flex;
  align-items: center;
}
.defualt-add {
  display: flex;
  margin-top: 10px;
  align-items: center;
}
.add-button {
  margin-left: 6px;
}
.add-input {
  width: 90%;
  border: none;
  height: 40px;
  border-radius: 6px;
  text-indent: 5px;
}
.add-input:focus {
  outline: none;
}
.Card {
  background-color: #ebecf0;
  color: black;
  width: 300px;
  min-height: 100px;
  border-radius: 4px;
  margin: 15px;
}
.card-container {
  display: flex;
}
.board-header {
  height: 50px;
  background-color: rgb(190, 184, 184);
  opacity: 0.2;
}
.comment-area {
  display: flex;
  flex-direction: column;
}
.comment-item {
  margin-top: 5px;
  height: 40px;
  width: 100%;
  border-radius: 5px;
  background-color: white;
  display: flex;
  /* justify-content: start; */
  align-items: center;
  text-indent: 20px;
}
.editable {
  flex: 20%;
  display: flex;
  justify-content: flex-end;
  margin-right: 5px;
  color: gray;
}
.editable :hover {
  color: black;
}
.comment-item input {
  border: none;
}
.comment-item input:focus {
  outline: none;
}
</style>