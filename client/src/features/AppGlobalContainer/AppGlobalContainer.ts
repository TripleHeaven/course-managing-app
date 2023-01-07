import { createContainer } from 'unstated-next';

type AppGlobalContainerState = {
  jwtToken?: string;
  setJwtToken: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const AppGlobalContainer = createContainer(
  (initialState?: AppGlobalContainerState) => {
    if (!initialState) {
      throw new Error('no initial state provided');
    }

    return initialState;
  }
);
