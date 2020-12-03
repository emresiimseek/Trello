<template>
  <div>
    <div class="header">
      <h3 style="margin-top: 15px; margin-left: 25px">
        <i class="fas fa-users"></i>Üyeler
      </h3>
      <i
        @click="showAddMember = true"
        style="
          display: flex;
          flex: 1;
          justify-content: flex-end;
          margin-right: 20px;
          margin-top: 15px;
        "
        class="far fa-paper-plane fa-2x"
      ></i>
    </div>

    <sui-grid style="margin-left: 10px" class="card-container" :columns="6">
      <sui-grid-column
        class="grid-column"
        :key="user.id"
        v-for="user in teamUsers"
      >
        <sui-card class="fluid">
          <sui-image
            src="https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255634-stock-illustration-avatar-icon-male-profile-gray.jpg"
          />
          <sui-card-content>
            <sui-card-header
              style="text-transform: capitalize"
              v-if="user.userName == '' || user.userName != null"
              >{{ user.firstName + " " + user.lastName }}</sui-card-header
            >
            <sui-card-header
              v-if="user.userName == '' || user.userName == null"
            >
              <p style="font-size: x-small">Bekleniyor....</p>
              <p style="font-size: medium">{{ user.email }}</p></sui-card-header
            >
          </sui-card-content>
        </sui-card>
      </sui-grid-column>
    </sui-grid>
    <!-- Add Member Modal -->
    <div>
      <transition v-if="showAddMember" name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="modal-header">
                <h4>Davet Yolla <i class="far fa-paper-plane"></i></h4>
              </div>

              <div class="modal-body">
                <form action="">
                  <div class="form-group">
                    <label for="">Davetli E-Posta</label>
                    <input
                      v-model="invatedUser.userDto.email"
                      class="form-control"
                      placeholder="E-Posta"
                      type="email"
                    />
                  </div>
                </form>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                  <!-- default footer -->
                  <button
                    @click="showAddMember = false"
                    class="btn btn-warning"
                  >
                    Kapat
                  </button>
                  <button
                    @click="InvateUser()"
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
import { Vue, Component, Prop, Watch, Emit, Ref } from "vue-property-decorator";
import users from "../store/modules/users";
import { InvatedUser, TeamUser } from "../store/models";

@Component({ name: "member" })
export default class Member extends Vue {
  public teamUsers: TeamUser[];
  public invatedUser: InvatedUser;
  public showAddMember: boolean;
  /**
   *
   */
  constructor() {
    super();
    this.invatedUser = {
      teamId: 0,
      userDto: {
        isAccept: false,
        email: "",
        userName: "",
        firstName: "",
        lastName: "",
        gender: "",
      },
    };
    this.showAddMember = false;
    this.teamUsers = [
      {
        userId: 0,
        teamId: 0,
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
      },
    ];
  }
  @Prop() teamId!: number;
  @Watch("teamId")
  async onChildChanged(val: number) {
    this.getTeams(val);
  }
  async created() {
    this.getTeams(this.teamId);
  }

  async getTeams(teamId: number) {
    this.teamUsers = await users.getTeamUsers(this.teamId);
  }
  async InvateUser() {
    this.invatedUser.teamId = await this.teamId;
    const res = await users.invateUser(this.invatedUser);
    if (res) {
      this.showAddMember = false;
      this.getTeams(this.teamId);
    }
  }
}
</script>
<style scoped>
.grid-column {
  margin-left: 10px;
  margin-top: 20px;
}
.content {
  height: 70px;
}
hr {
  margin: 0;
}
.fa-paper-plane:hover {
  color: #286fb4;
  cursor: pointer;
}
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.fluid:hover {
  box-shadow: 0 2px 8px 0;
}
</style>