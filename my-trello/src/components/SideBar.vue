<template>
  <div class="side-container">
    <div>
      <div class="header">
        <span>Teams</span>
        <i @click="showTeamModal()" class="fas fa-plus fa-lg"></i>
      </div>
      <div :key="team.id" v-for="team in currentTeam">
        <div
          id="team.id"
          @click="selectOption.teamId = team.id"
          v-bind:class="{ active: selectOption.teamId == team.id }"
          class="child"
        >
          <i class="fas fa-user-friends"></i> {{ team.teamName }}
          <span class="collaps"><i class="fas fa-angle-down"></i></span>
        </div>
        <div class="content">
          <ul>
            <li
              id="1"
              :class="{
                activeli: selectedChild == 1 && selectOption.teamId == team.id,
              }"
              @click="liset(1, { teamId: team.id, for: 'board' })"
            >
              <p>Şablonlar</p>
            </li>
            <li
              id="2"
              :class="{
                activeli: selectedChild == 2 && selectOption.teamId == team.id,
              }"
              @click="liset(2, { teamId: team.id, for: 'member' })"
            >
              Üyeler
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";
import { ComplexTeam, SelectOption, User } from "../store/models";
import teams from "../store/modules/teams";
import users from "../store/modules/users";

@Component
export default class SideBar extends Vue {
  private currentTeam: ComplexTeam[];
  private currentUser: Partial<User>;
  private selectOption: SelectOption;

  private selectedChild: number;
  /**
   *
   */
  constructor() {
    super();
    this.selectOption = { teamId: 0, for: "" };
    this.selectedChild = 0;

    this.currentUser = { id: 0, isAccept: false, email: "" };
    this.currentTeam = [
      { id: 0, userId: 0, userName: "", teamName: "", teamDescription: "" },
    ];
  }
  showTeamModal() {
    this.modal(true);
  }

  async mounted() {
   

    this.currentUser = users.userFull;
    this.currentTeam = await teams.getTeams(
      JSON.parse(sessionStorage.getItem("currentUser")).id
    );
  }
  liset(selectedChild, selectOption: SelectOption) {
    this.selectedChild = selectedChild;
    this.selectOption.teamId = selectOption.teamId;
    this.selectOption.for = selectOption.for;

    this.selected(selectOption);
  }

  @Emit()
  selected(selectedTeam: SelectOption) {
    this.selectOption;
  }
  @Emit()
  modal(showModal: boolean) {
    showModal;
  }
}
</script>
<style scoped>
.header i:hover {
  color: rgb(174, 220, 243);
}
.child {
  display: flex;
  align-items: center;
  margin-top: 5px;
  width: 100%;
  height: 30px;
  border-radius: 10px;
  text-indent: 20px;
  font-weight: bold;
  flex: 1;
}
.child:hover {
  background-color: #e2eaf8;
}

.content ul li {
  list-style-type: none;
  margin: 0;
}

li:hover {
  cursor: pointer;
  color: #737881;
  font-weight: bold;
}
.activeli {
  color: rgb(100, 178, 218);
  font-weight: bold;
}

li {
  margin: 0;
}
hr {
  margin: 0;
  padding: 0;
}
.active {
  background-color: rgb(174, 220, 243);
}
.collaps {
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
  flex: 1;
}
.header {
  display: flex;
  align-items: center;
  color: #5e6c84;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.04em;
  line-height: 16px;
  margin-top: 16px;
  text-transform: uppercase;
  margin: 0;
  padding: 8px 0;
}
.header i {
  display: flex;
  flex: 1;
  justify-content: flex-end;
  margin-right: 10px;
}
.header span {
  flex: 1;
}
</style>