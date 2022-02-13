import {CommonActions, StackActions} from '@react-navigation/native';

import React from 'react';

export const isReadyRef = React.createRef();

export const navigationRef = React.createRef();

async function navigate(name, params) {
  if (!!isReadyRef?.current && !!navigationRef?.current) {
    navigationRef.current.dispatch(CommonActions.navigate(name, params));
  } else {
    throw new Error('Não foi possível realizar a navegação');
  }
}

function getActiveRouteName(route) {
  let currentRoute;

  if (!isReadyRef.current || !navigationRef.current) {
    throw new Error('Não foi possível realizar a navegação');
  }

  if (!route) {
    currentRoute = navigationRef.current.state.nav;
  } else {
    currentRoute = route;
  }

  if (
    !currentRoute.routes ||
    currentRoute.routes.length === 0 ||
    currentRoute.index >= currentRoute.routes.length
  ) {
    return currentRoute.routeName;
  }

  const childActiveRoute = currentRoute.routes[currentRoute.index];
  return getActiveRouteName(childActiveRoute);
}

async function goBack() {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.dispatch(CommonActions.goBack());
  } else {
    throw new Error('Não foi possível realizar a navegação');
  }
}

function goPop(screens) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.dispatch(StackActions.pop(screens));
  } else {
    throw new Error('Não foi possível realizar a navegação');
  }
}

async function dispatch(param) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.dispatch(param);
  } else {
    throw new Error('Não foi possível realizar a navegação');
  }
}

function getParams() {
  return navigationRef.current.getCurrentRoute().params || {};
}

export default {
  navigate,
  getActiveRouteName,
  goBack,
  goPop,
  getParams,
  dispatch,
};
