import { contacts as _contacts } from "./db.json";

import React, { createContext, useReducer, useState } from "react";

import { contacts } from "./db.json";

export const ACTIONS = {
  ADD_CONTACT: "ADD_CONTACT",
  EDIT_CONTACT: "EDIT_CONTACT",
  DELETE_CONTACT: "DELETE_CONTACT",
};

const INITIAL_STATE = [...contacts];

const _reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_CONTACT:
      state.push(action.payload);
      return state;

    case ACTIONS.EDIT_CONTACT:
      const { name, lastname, phone, notes, company } = action.payload;
      const contactFound = state.find((data) => data.name === name);

      if (contactFound) {
        contactFound.name = name;
        contactFound.phone = phone;
        contactFound.notes = notes;
        contactFound.company = company;
        contactFound.lastname = lastname;
      }
      return state;

    case ACTIONS.DELETE_CONTACT:
      return state.filter(
        (contact, index) =>
          `${contact.name} ${
            contact.lastname ? contact.lastname : ""
          }`.trim() !== action.payload
      );

    default:
      return state;
  }
};

export const ContactStore = createContext();

export const ContactProvidor = (properties) => {
  const [state, dispatch] = useReducer(_reducer, INITIAL_STATE);

  return (
    <ContactStore.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {properties.children}
    </ContactStore.Provider>
  );
};
