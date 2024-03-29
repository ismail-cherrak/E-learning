import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Password from './password.jsx'
import Codepin from './codepin.jsx'
import New from './newpsw'
import './index.css'
import { EtudiantHome } from './EtudiantHome.jsx';
import { ProfHome } from './ProfHome.jsx';
import { AdminHome } from './AdminHome.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Codepin",
    element: <Codepin />,
  },
  {
    path: "/newpsw",
    element: <New />,
  },
  {
    path: "/password",
    element: <Password />,
  },
  {
    path: "/EtudiantHome",
    element: <EtudiantHome />,
  },
  {
    path: "/ProfHome",
    element: <ProfHome />,
  },{
    path: "/AdminHome",
    element: <AdminHome />,
  },
]);



ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)