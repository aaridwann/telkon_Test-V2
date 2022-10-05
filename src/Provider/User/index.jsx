import Store from "../../Redux/Store";
import { Provider } from "react-redux";

export default function ProviderUser({ children }) {
  return <Provider store={Store}>{children}</Provider>;
}
