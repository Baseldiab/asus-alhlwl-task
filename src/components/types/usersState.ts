
import { UserDto } from "./UserDto";
import { UserModel } from "./userModel";
import { UserUpdateDto } from "./UserUpdateDto";

export type UserState = {
    usersList: UserModel[];
    item: UserModel | null;
    sendAddNewUser: (v: UserDto) => void;
    sendGetItem: (v: UserModel) => void;
    resetItem: () => void;
    sendUpdateUser: (v: UserUpdateDto) => void;
    sendDeleteItem: (id: string) => void;
    resetAllUsers: () => void;
 
  }