import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { UserState } from "../components/types/usersState";
import { UserModel } from "../components/types/userModel";
import { errorNotification, successNotification } from "../components/notifications/notifications";
import { UserDto } from "../components/types/UserDto";
import { UserUpdateDto } from "../components/types/UserUpdateDto";

export const useUserStore = create<UserState>()(
  devtools((set, get) => ({
    usersList: JSON.parse(localStorage.getItem("users") ?? '[]') ,
    // usersList: [{
    //   name: "John Doe",
    //   phone: "1234567890",
    //   email: "john.doe@example.com",
    //   date_of_birth: "1990-01-01",
    //   address: "123 Main St"
    // }] ,
    item: null,

    sendAddNewUser: async (v: UserDto) => {
      const newUser: UserModel = {
        id: String(Date.now()),
        ...v,
      };
  
      const updatedUsers = [...get().usersList, newUser];

    set({ usersList: updatedUsers });

      localStorage.setItem("users", JSON.stringify(updatedUsers));
      successNotification("successfully Add New User")
  
    },

    sendGetItem: async (v: UserModel) => {
    set({ item: v });
    },
    resetItem: async () => {
    set({ item: null });
    },

    sendUpdateUser: async (v: UserUpdateDto) => {
      const { usersList } = get();
    
      const foundIndex = usersList.findIndex((user: UserModel) => user.id === v.id);
    
      if (foundIndex !== -1) {
        const updatedUsers = usersList.map((user: UserModel) =>
          user.id === v.id ? { ...user, ...v } : user
        );
    
        set({ usersList: updatedUsers });
    
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        successNotification(`Successfully updated user ${v.name}`);
      } else {
        errorNotification(`User with ID ${v.id} not found.`);
        console.error(`User with ID ${v.id} not found.`);
      }
    },
    

    sendDeleteItem: async (id: string) => {
      const { usersList } = get();

      const updatedList = usersList.filter((user: UserModel) => user.id !== id);
        set({ usersList: [...updatedList] });
      localStorage.setItem("users", JSON.stringify(updatedList));

    },
       
    resetAllUsers: () => {
      localStorage.removeItem("users")
      set({
        usersList: [],
        item: null,
      });
    },
  }))
);
