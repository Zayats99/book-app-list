import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components";
import { AddBook, Dashboard } from "./pages";

const App: FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/edit-book/:id" element={<AddBook />} />
      </Routes>
    </>
  );
};

export default App;
