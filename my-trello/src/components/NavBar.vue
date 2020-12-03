<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarTogglerDemo01"
      aria-controls="navbarTogglerDemo01"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
      <a class="navbar-brand" style="color: #56baed; font-weight: bold" href="#"
        >Trello</a
      >
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <router-link tag="li" class="nav-item active underlineHover" to="/"
          ><a class="nav-link">Home </a>
        </router-link>
      </ul>

      <button
        v-if="!user.id <= 0"
        type="button"
        @click="toggle = true"
        class="ui teal button"
      >
        <i class="far fa-user"></i>
        {{ user.userName }}
      </button>
      <button v-if="!user.id <= 0" class="ui red button" @click="logOut()">
        Çıkış
      </button>

      <router-link
        v-if="user.id == 0"
        to="/login"
        tag="button"
        class="ui green inverted button"
        ><i class="fas fa-sign-in-alt"></i> Giriş
      </router-link>

      <form class="form-inline my-2 my-lg-0">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    </div>

    <div>
      <transition v-if="toggle" name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="modal-header">
                <h4>Profile <i class="fas fa-user-friends"></i></h4>
                <img
                  class="profile-img"
                  src="https://randomuser.me/api/portraits/med/men/75.jpg"
                  alt=""
                />
              </div>

              <div class="modal-body">
                <form action="">
                  <div class="form-group">
                    <label>Adı</label>
                    <input
                      v-model="user.firstName"
                      type="text"
                      class="form-control"
                      placeholder="Adı"
                    />
                  </div>
                  <div class="form-group">
                    <label>Soyadı</label>
                    <input
                      v-model="user.lastName"
                      type="text"
                      class="form-control"
                      placeholder="Adı"
                    />
                  </div>
                  <div class="form-group">
                    <label>Kullanıcı Adı</label>
                    <input
                      v-model="user.userName"
                      type="text"
                      class="form-control"
                      placeholder="Kullanıcı Adı"
                    />
                  </div>
                </form>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                  <sui-button
                    color="teal"
                    @click="toggle = false"
                    content="Kapat"
                  />
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, Emit, Ref } from "vue-property-decorator";
import { User } from "../store/models";
import users from "../store/modules/users";
@Component
export default class NavBar extends Vue {
  private toggle: boolean;
  @Prop() user!: User;

  /**
   *
   */
  constructor() {
    super();
    this.toggle = false;
    // this.user = {
    //   id: 0,
    //   userName: "",
    //   firstName: "",
    //   lastName: "",
    //   isAccept: false,
    //   email: "",
    // };
  }

  logOut() {
    sessionStorage.clear();
    this.$router.push("/login");
  }
}
</script>
<style scoped>
.profile-img {
  border-radius: 50px;
  border: 1px solid gray;
  margin-right: 20px;
}
.button {
  text-transform: capitalize;
}

.form-control {
  text-transform: capitalize;
}

/* Simple CSS3 Fade-in Animation */
.underlineHover:after {
  display: block;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 2px;
  background-color: #56baed;
  content: "";
  transition: width 0.2s;
}

.underlineHover:hover {
  color: #0d0d0d;
}

.underlineHover:hover:after {
  width: 100%;
}
</style>