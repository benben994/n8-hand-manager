import { Routes, Route, Outlet } from 'react-router-dom';

import Home from 'views/Home';

import NavBar from 'components/NavBar';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div className="flex flex-col">
      <NavBar />
      <Outlet />
    </div>
  );
}
