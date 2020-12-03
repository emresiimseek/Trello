<template>
  <div class="custom-container">
    <div class="right-side">
      <side-bar
        @modal="showTeamModal = $event"
        @selected="selectedOptions = $event"
      ></side-bar>
    </div>
    <div class="main-content">
      <board
        v-if="selectedOptions.for == 'board'"
        :selected="selectedOptions.teamId"
      ></board>
      <member
        :teamId="selectedOptions.teamId"
        v-if="selectedOptions.for == 'member'"
      >
      </member>
    </div>

    <!-- Add Team Modal -->
    <div>
      <transition v-if="showTeamModal" name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="modal-header">
                <h4>
                  Hadi bir Takım Kuralım! <i class="fas fa-user-friends"></i>
                </h4>
              </div>

              <div class="modal-body">
                <form action="">
                  <div class="form-group">
                    <label for="">Takım Adı</label>
                    <input
                      v-model="submitTeam.team.title"
                      type="text"
                      class="form-control"
                      placeholder="Takım Adı"
                    />
                    <div class="form-group">
                      <label for="">Açıklama</label>
                      <textarea
                        v-model="submitTeam.team.description"
                        class="form-control"
                        rows="5"
                      ></textarea>
                    </div>
                  </div>
                  <div class="form-group custom-group">
                    <label>Davet Et <i class="far fa-paper-plane"></i></label>
                    <input
                      v-model="submitTeam.users[0].email"
                      type="text"
                      class="form-control"
                      placeholder="Devam istediğiniz kişinin e-postasını giriniz."
                    />
                  </div>
                </form>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                  <!-- default footer -->
                  <button
                    @click="showTeamModal = false"
                    class="btn btn-warning"
                  >
                    Kapat
                  </button>
                  <button
                    @click="addTeam"
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
import { Component, Vue } from "vue-property-decorator";
import SideBar from "../components/SideBar.vue";
import { ComplexTeam, SelectOption, SumbitTeam } from "../store/models";
import teams from "../store/modules/teams";
import users from "../store/modules/users";
import Board from "./Board.vue";
import Member from "../components/Member.vue";

@Component({
  components: { SideBar, Board, Member },
})
export default class Home extends Vue {
  public selectedOptions: SelectOption;
  public showTeamModal: boolean;
  private teamsResponse: ComplexTeam[] = [];
  private submitTeam: SumbitTeam = {
    team: { title: "", description: "" },
    users: [{ id: 0, email: "", isAccept: false }],
  };
  /**
   *
   */
  constructor() {
    super();
    this.selectedOptions = { for: "", teamId: 0 };
    this.showTeamModal = false;
    this.submitTeam.users.push(users.user);
    
  }

  private async addTeam() {
    const team = await teams.addTeam(this.submitTeam);
    if (team != null) {
      alert("Başarılı!");
      this.showTeamModal = false;
      if (users.user.id != null)
        this.teamsResponse = await teams.getTeams(users.user.id);
    } else alert("Hata!");
  }
}
</script>
<style scoped>
.main-content {
  flex: 5;
  background-color: #fafafa;
  border-radius: 5px;
}
.right-side {
  flex: 1;
  height: 750px;
  background-color: #fafafa;
  border-radius: 5px;
  margin-right: 10px;
}
.custom-container {
  display: flex;
  width: 80%;
  margin: auto;
  margin-top: 40px;
}
@media only screen and (max-width: 1100px) {
  .main-content {
    flex: 3;
  }
  .custom-container {
    width: 100%;
  }
}
</style>
