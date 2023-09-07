import { createRoot } from "react-dom/client";

import App from "./App";
import store from "./stores";
import { Provider } from "react-redux";
import {
  CheckBoxProvider,
  ShowModelProvider,
  TodoSearchProvider,
} from "./useContext/apiContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <ShowModelProvider>
    <CheckBoxProvider>
      <TodoSearchProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </TodoSearchProvider>
    </CheckBoxProvider>
  </ShowModelProvider>
);
