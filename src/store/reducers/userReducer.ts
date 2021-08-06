const initState = {};

interface Action {
  type?: string;
  user?: Record<string, unknown>;
}

export const userReducer = (state = initState, action: Action): Record<string, unknown> => {
  switch (action.type) {
  default:
    return initState;
  }
};
