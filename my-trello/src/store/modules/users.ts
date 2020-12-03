import { TeamUser, UserSubmit, InvatedUser } from './../models.d';
import { Module, VuexModule, Mutation, Action, getModule } from "vuex-module-decorators";
import store from "@/store/index.ts";
import { User } from '../models';
import { GetTeamUsers, InvateUser, LoginUser, setJWT } from '../api';

@Module({
    namespaced: true,
    name: 'users',
    store,
    dynamic: true,
})
class UsersModule extends VuexModule {
    public user: User = { id: 0, isAccept: false, email: '' };
    public teamUsers: TeamUser[] = [{ userId: 0, teamId: 0, userName: '', firstName: '', lastName: '', email: '', gender: '' }]

    /**
     *
     */

    get userName(): string {
        return this.user?.userName ?? "";
    }

    get userFull(): User {
        return this.user;
    }

    @Mutation
    public setUser(user: User) { this.user = user; }

    @Mutation
    public setTeamUsers(teamUsers: TeamUser[]) { this.teamUsers = teamUsers; }

    @Action({ commit: 'setUser' })
    public async login(userSubmit: UserSubmit) {
        const user = await LoginUser(userSubmit);
        setJWT(user.token ?? "");
        sessionStorage.setItem('token', JSON.stringify(user.token));
        return user;
    }

    @Action({ commit: 'setTeamUsers' })
    public async getTeamUsers(teamId: number) {
        const teamUsers = await GetTeamUsers(teamId);
        return teamUsers;
    }

    @Action
    public async invateUser(invatedUser: InvatedUser) {
        const addedUser = await InvateUser(invatedUser);
        return addedUser;
    }




}
export default getModule(UsersModule);
