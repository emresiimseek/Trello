import store from '@/store/index.ts';
import { BoardModel } from './../models.d';
import { Module, VuexModule, Mutation, Action, MutationAction, getModule } from "vuex-module-decorators";
import { AddBoard, DeleteBoard, GetBoards } from '../api';

@Module({ namespaced: true, dynamic: true, name: 'boards', store })
class BoardsModule extends VuexModule {
    private boards: BoardModel[] = [{}];

    get currentBoards() {
        return this.boards;
    }

    @Mutation
    public setBoards(boards: BoardModel[]) { this.boards = boards; }

    @Action({ commit: 'setBoards' })
    public async getBoards(teamId: number) {
        const boards = GetBoards(teamId);
        return boards;
    }

    @Action
    public async deleteBoard(boardId: number) {
        return await DeleteBoard(boardId);
    }

    @Action
    public async addBoard(sumbitBoard: BoardModel): Promise<BoardModel> {
        const board = await AddBoard(sumbitBoard);

        return board;
    }

}
export default getModule(BoardsModule);