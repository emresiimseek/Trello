import { InvatedUser } from './models.d';
import axios from 'axios';
import { ComplexTeam, User, UserSubmit, UserResponse, Team, SumbitTeam, BoardModel } from './models';

export const conduitApi = axios.create({
    baseURL: 'http://localhost:62518/api/',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
    }
})

export function setJWT(jwt: string) {
    conduitApi.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
}

export function clearJWT() {

    delete conduitApi.defaults.headers.common['Authorization'];
}

export async function LoginUser(user: UserSubmit): Promise<User> {

    const response = await conduitApi.post('/login', user);
    if (!response) {
        throw ('Hata');
    }
    return response.data as User;

}

export async function AddTeam(team: SumbitTeam): Promise<Team> {
    const response = await conduitApi.post('/teams', team);
    if (!response) {
        throw ('');
    }
    
    
    return response.data as Team;

}
export async function GetTeams(id: number): Promise<ComplexTeam[]> {
    const response = await conduitApi.get(`/teams/${id}`);
    if (!response) {
        throw ('Hata');
    }
    return response.data as ComplexTeam[];

}

export async function GetBoards(teamId: number): Promise<BoardModel[]> {
    const response = await conduitApi.get(`/boards/${teamId}`);
    if (!response) {
        throw ('Hata');
    }
    return response.data as BoardModel[];

}

export async function AddBoard(boardSumbit: BoardModel): Promise<BoardModel> {
    const response = await conduitApi.post('/boards', boardSumbit);
    if (!response) {
        throw ('Hata');
    }
    return response.data as BoardModel;

}
export async function DeleteBoard(boardId: number) {
    const response = await conduitApi.delete(`/boards/${boardId}`);
    if (!response) {
        throw ('Hata');
    }
    return response;

}
export async function GetTeamUsers(teamId: number) {
    const response = await conduitApi.get(`/users/${teamId}`);
    if (!response) throw ('Hata');
    return response.data;

}

export async function InvateUser(invatedUser: InvatedUser) {
    const response = await conduitApi.post("/users/", invatedUser);
    if (!response) throw ('Hata');
    return response.data;

}


export async function GetCards(boardId: number) {
    const response = await conduitApi.get(`/cards/${boardId}`);
    if (!response) throw ('Hata');
    console.log(1,response.data);
    return response.data;

}

