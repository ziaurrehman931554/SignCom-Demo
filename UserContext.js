import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [usersData, setUsersData] = useState([
    { email: 'zr931554@gmail.com', password: '123', Name: 'Zia ur Rehman', type: 'normal', profile: '../assets/profile.png', 
      favorites: [
        { Name: 'Name A', profile: '../assets/profile.png'}, 
        { Name: 'Name B', profile: '../assets/profile.png'}, 
        { Name: 'Name C', profile: '../assets/profile.png'}, 
        { Name: 'Name D', profile: '../assets/profile.png'}
      ], 
      recent: [
        { Name: 'Name', last_call: 'Today at 11:11', profile: '../assets/profile.png'}, 
        { Name: 'Name B', last_call: 'yesterday at 9:41', profile: '../assets/profile.png'}, 
        { Name: 'Name C', last_call: 'Sunday', profile: '../assets/profile.png'}, 
        { Name: 'Name D', last_call: '1M Ago', profile: '../assets/profile.png'}
      ],
      setting: []
    },
    { email: 'zia@gmail.com', password: '456', Name: 'Zia', type: 'normal' , profile: '../assets/profile.png', 
      favorites: [
        { Name: 'Name A', profile: '../assets/profile.png'}, 
        { Name: 'Name B', profile: '../assets/profile.png'}, 
        { Name: 'Name C', profile: '../assets/profile.png'}
      ], 
      recent: [
        { Name: 'Name', last_call: 'Today at 11:11', profile: '../assets/profile.png'}, 
        { Name: 'Name B', last_call: 'yesterday at 9:41', profile: '../assets/profile.png'}, 
        { Name: 'Name C', last_call: 'Sunday', profile: '../assets/profile.png'}
      ]
    },
    { email: 'abc@gmail.com', password: '123', Name: 'abc', type: 'special' , profile: '../assets/profile.png', 
      favorites: [
        { Name: 'Name A', profile: '../assets/profile.png'}, 
        { Name: 'Name B', profile: '../assets/profile.png'}, 
        { Name: 'Name C', profile: '../assets/profile.png'}
      ], 
      recent: [
        { Name: 'Name', last_call: 'Today at 11:11', profile: '../assets/profile.png'}, 
        { Name: 'Name B', last_call: 'yesterday at 9:41', profile: '../assets/profile.png'}, 
        { Name: 'Name C', last_call: 'Sunday', profile: '../assets/profile.png'}
      ]
    },
    { email: 'a', password: '1', Name: 'a', type: 'special' , profile: '../assets/profile.png', 
      favorites: [
        { Name: 'Name A', profile: '../assets/profile.png'}, 
        { Name: 'Name B', profile: '../assets/profile.png'}, 
        { Name: 'Name C', profile: '../assets/profile.png'}
      ], 
      recent: [
        { Name: 'Name', last_call: 'Today at 11:11', profile: '../assets/profile.png'}, 
        { Name: 'Name B', last_call: 'yesterday at 9:41', profile: '../assets/profile.png'}, 
        { Name: 'Name C', last_call: 'Sunday', profile: '../assets/profile.png'}
      ]
    },
    { email: 'ushnashiekh454@gmail.com', password: 'ushna123', Name: 'Ushna Shehzad', type: 'normal' , profile: '../assets/profile.png', 
      favorites: [
        { Name: 'Name A', profile: '../assets/profile.png'}, 
        { Name: 'Name B', profile: '../assets/profile.png'}, 
        { Name: 'Name C', profile: '../assets/profile.png'}
      ], 
      recent: [
        { Name: 'Name', last_call: 'Today at 11:11', profile: '../assets/profile.png'}, 
        { Name: 'Name B', last_call: 'yesterday at 9:41', profile: '../assets/profile.png'}, 
        { Name: 'Name C', last_call: 'Sunday', profile: '../assets/profile.png'}
      ]
    },
    { email: 'manahil45@gmail.com', password: 'manahil123', Name: 'Manahil Shahdab', type: 'normal' , profile: '../assets/profile.png', 
      favorites: [
        { Name: 'Name A', profile: '../assets/profile.png'}, 
        { Name: 'Name B', profile: '../assets/profile.png'}, 
        { Name: 'Name C', profile: '../assets/profile.png'}
      ], 
      recent: [
        { Name: 'Name', last_call: 'Today at 11:11', profile: '../assets/profile.png'}, 
        { Name: 'Name B', last_call: 'yesterday at 9:41', profile: '../assets/profile.png'}, 
        { Name: 'Name C', last_call: 'Sunday', profile: '../assets/profile.png'}
      ]
    },
  ]);

  const getUserData = () => {
    return usersData;
  }
  const addUserToData = (userData) => {
    setUsersData([...usersData, userData]);
  };

  const findUserByEmail = (email) => {
    return usersData.find((user) => user.email === email);
  };

  const updateUserByEmail = (email, updatedUserData) => {
    setUsersData((prevUsersData) => {
      return prevUsersData.map((user) =>
        user.email === email ? { ...user, ...updatedUserData } : user
      );
    });
  };

  return (
    <UserContext.Provider value={{ usersData, addUserToData, findUserByEmail, updateUserByEmail, getUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}