import { StyleProvider } from './AppStyle';
import { UserProvider } from './UserContext';
import AppContainer from './AppContainer';

export default function App() {
  return (
    <StyleProvider>
      <UserProvider>
        <AppContainer />
      </UserProvider>
    </StyleProvider>
  );
}