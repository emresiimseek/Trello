import { Card } from './../models.d';
import store from '@/store/index.ts';
import { Module, VuexModule, Mutation, Action, MutationAction, getModule } from "vuex-module-decorators";
import { GetCards } from '../api';

@Module({
    name: 'cards',
    namespaced: true,
    store,
    dynamic: true
})
class CardsModule extends VuexModule {
    public cards: Card[] = [{}];

    @Mutation
    public setCard(cards: Card[]) { this.cards = cards; }

    @Action({ commit: 'setCard' })
    public async getCardByBoardId(boardId: number) {
        const boards = await GetCards(boardId);
        console.log(2,boards);
        
        return boards;
    }

}
export default getModule(CardsModule);