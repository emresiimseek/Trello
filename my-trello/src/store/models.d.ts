export interface User {
    id?: number;
    userName?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    userId?:number
    gender?: string;
    password?: string;
    token?: string;
    isAccept: boolean;
    teams?: Team[]


}

export interface UserSubmit {
    username: string,
    password: string,

}
export interface SelectOption {
    teamId: number,
    for: string,

}


export interface UserResponse {
    userName: string,
    password: string,
    token: string

}
export interface Team {
    id?: number,
    title: string,
    description: string,
    users?: User[],
    boards?: Board[]

}

export interface ComplexTeam {
    id: number;
    userId: number;
    userName: string;
    teamName: string;
    teamDescription: string;
}
export interface SumbitTeam {
    users: User[],
    team?: Team
}


export interface BoardModel {

    id?: number,
    title?: string,
    status?: number,
    team?: Team,
    cards?: Card[],
    teamId?: number
}

export interface Card {

    id?: number,
    title?: string,
    description?: string,
    boardId?: number,
    enumCardStatus?: number,
    comments?: Comment[]
}
export interface Comment {
    id?: number;
    text?: string;
    UserId?: any;
    cardId?: number;
    user?: any;
}

export interface TeamUser {
    userId: number;
    teamId: number;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
}



export interface InvatedUser {
   userDto:User,
   teamId:number
}
