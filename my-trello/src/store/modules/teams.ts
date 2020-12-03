import store from '@/store/index.ts';
import { SumbitTeam, Team } from './../models.d';
import { Module, VuexModule, Mutation, Action, MutationAction, getModule } from "vuex-module-decorators";
import { AddTeam, GetTeams, setJWT } from '../api';

@Module({ name: 'teams', namespaced: true, store, dynamic: true })
class TeamsModule extends VuexModule {

    private teams: Team[] | null = null;

    @Mutation
    public setTeams(teams: Team[]) { this.teams = teams; }

    @Action({ commit: 'setTeams' })
    public async getTeams(userId: number) {
        const part = sessionStorage.getItem("token") ?? "";

        setJWT(part.substring(1, part.length - 1) ?? "");
        const teams = await GetTeams(userId);
        return teams;
    }

    @Action({ commit: 'setTeam' })
    public async addTeam(teamSumbit: SumbitTeam): Promise<Team> {
        const team = await AddTeam(teamSumbit);
        return team;
    }

}
export default getModule(TeamsModule);