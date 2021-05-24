import { reactive, provide, inject } from 'vue';

export const stateSymbol = Symbol('state');
export const createState = () => reactive({
  access_token: '',
  Id: '',
  visitorsEnabled: false,
  packagesEnabled: false,
  announcementsEnabled: false,
  serviceRequestsEnabled: false
});

export const useState = () => inject(stateSymbol);
export const provideState = () => provide(
  stateSymbol, 
  createState()
);