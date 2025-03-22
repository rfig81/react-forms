import Header from "./components/Header";
import Login from "./components/Login";
import StateLogin from "./components/StateLogin";
import Signup from "./components/Signup";

function App() {
  return (
    <>
      <Header />
      <main>
        <Login />
        <StateLogin />
        <Signup />
      </main>
    </>
  );
}

export default App;
