 import React from 'react'
 import ReactDOM from 'react-dom/client'
 import App from './App.jsx'
 import { createBrowserRouter, RouterProvider, } from "react-router-dom";
 import Password from './password.jsx'
 import Codepin from './codepin.jsx'
 import New from './newpsw'
 import './index.css';
 import { AdminHome } from './AdminHome.jsx';
 import { EtudiantHome } from './EtudiantHome.jsx';
 import { ProfHome } from './ProfHome.jsx';
import { ModulePage } from './ModulePage.jsx';
import {ChCours} from './ChCours.jsx'
import { ChTd } from './ChTd.jsx';


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
     path: "/AdminHome/:idAuth/:id",
     element: <AdminHome />,
   },
   {
     path: "/EtudiantHome/:idAuth/:id",
     element: <EtudiantHome/>,
   },
   {
     path: "/ProfHome/:idAuth/:id",
     element: <ProfHome />,
   },
  {
    path: "/EtudiantHome/:idAuth/:id/:idmod",
    element: <ModulePage />,
  },
  {
    path: "/chargeCour/:idAuth/:id/:idmod",
    element: <ChCours />,
  },
  {
    path: "/chargeTd/:idAuth/:id/:idmod",
    element: <ChTd />,
  },
 ]);

 ReactDOM.createRoot(document.getElementById('root')).render(

   <React.StrictMode>
     {/* <App /> */}
     {/* <Provider store={store}> */}
     <RouterProvider router={router} >
       {/* <App/> */}
     </RouterProvider>
     {/* </Provider> */}
   </React.StrictMode>,
 )




