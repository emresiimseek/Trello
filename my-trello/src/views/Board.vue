<template>
  <div>
    <div class="header">
      <h3 style="margin-top: 15px; margin-left: 25px">
        <i class="far fa-clipboard"></i>Boards
      </h3>
      <i
        @click="showAddBoard = true"
        style="
          display: flex;
          flex: 1;
          justify-content: flex-end;
          margin-right: 10px;
        "
        class="fas fa-plus-circle fa-2x"
      ></i>
    </div>
    <hr />
    <div class="boards-container">
      <div :key="board.id" v-for="board in boards" class="board-item">
        <div class="delete">
          <i
            @click="deleteBoard($event)"
            :id="board.id"
            class="far fa-trash-alt"
          ></i>
        </div>
        <div style="flex: 25%">{{ board.title }}</div>
        <div style="flex: 25%">
          <i
            :id="board.id"
            @click="openBoard($event)"
            class="fas fa-arrow-circle-right"
          ></i>
        </div>
      </div>
    </div>
    <!-- Add Board Modal -->
    <div>
      <transition v-if="showAddBoard" name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="modal-header">
                <h4>Boad Ekle <i class="far fa-clipboard"></i></h4>
              </div>

              <div class="modal-body">
                <form action="">
                  <div class="form-group">
                    <label for="">Board Adı</label>
                    <input
                      v-model="sumbitBoard.title"
                      class="form-control"
                      placeholder="Board Adı"
                    />
                  </div>
                </form>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                  <!-- default footer -->
                  <button @click="showAddBoard = false" class="btn btn-warning">
                    Kapat
                  </button>
                  <button
                    @click="addBoard()"
                    class="modal-default-button btn btn-primary"
                  >
                    Kaydet
                  </button>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { BoardModel } from "../store/models";
import boards from "../store/modules/boards";
@Component({})
export default class Board extends Vue {
  public boards: BoardModel[];
  private showAddBoard: boolean;
  private sumbitBoard: BoardModel = { title: "", status: 1 };

  @Prop() selected!: number;

  /**
   *
   */
  constructor() {
    super();
    this.boards = [{}];
    this.showAddBoard = false;
  }
  @Watch("selected")
  async onChildChanged(val: number) {
    await this.getBoards(val);
  }

  async created() {
    await this.getBoards(this.selected);
  }
  private async getBoards(teamId: number) {
    this.boards = await boards.getBoards(teamId);
  }
  private async deleteBoard(event) {
    await boards.deleteBoard(event.target.id);
    this.getBoards(this.selected);
  }
  private async addBoard() {
    this.sumbitBoard.teamId = this.selected;
    const res = await boards.addBoard(this.sumbitBoard);
    if (res != null) {
      this.sumbitBoard.title = "";
      this.showAddBoard = false;
      this.getBoards(this.selected);
    }
  }
  openBoard(event) {
    const boardId = event.target.id;
    alert(boardId);
    this.$router.push({ name: "Page", params: { id: boardId } });
  }
}
</script>
<style scoped>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.board-item:hover .delete {
  flex: 20%;
  display: flex;
  visibility: visible;
  justify-content: flex-end;
  width: 100%;
  margin-right: 7px;
  margin-top: 5px;
  color: red;
}

.delete {
  visibility: hidden;
  flex: 20%;
  margin-right: 7px;
  margin-top: 5px;
}
.boards-container {
  display: flex;
  /* justify-content: start; */
  flex-wrap: wrap;
  flex-direction: row;
}
.boards-container > .board-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  width: 190px;
  height: 100px;
  background-color: #98c6f3;
  border-radius: 10px;
  margin: 10px;
  opacity: 0.7;
}
.board-item:hover {
  opacity: 1;
}
.page-header {
  display: flex;
  align-items: center;
}
.foot {
  display: flex;
  flex: 10%;
  justify-content: flex-end;
}
.foot:hover {
  color: #286fb4;
}
hr {
  margin: 0;
}
.fa-plus-circle:hover {
  color: #286fb4;
  cursor: pointer;
}
.fa-arrow-circle-right {
  cursor: pointer;
}
.fa-arrow-circle-right:hover {
  cursor: pointer;
  font-size: x-large;
}
.fa-trash-alt {
  cursor: pointer;
}
</style>