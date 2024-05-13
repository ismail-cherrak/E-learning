 import React from 'react'
 import ReactDOM from 'react-dom/client'
 import App from './App.jsx'
 import { createBrowserRouter, RouterProvider, } from "react-router-dom";
 import Password from './password.jsx'
 import Codepin from './codepin.jsx'
 import New from './newpsw'
 import './index.css';
 import { AdminHome } from './AdminHome.jsx';
 import Carde from './carde.jsx';
 import { EtudiantHome } from './EtudiantHome.jsx';
 import { ProfHome } from './ProfHome.jsx';
import Pagedevoir from './devoir.jsx';
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
     path: "/AdminHome/:id",
     element: <AdminHome />,
   },
   {
     path: "/carde",
     element: <Carde/>,
   },
  { 
    path: "/devoir", 
    element: <Pagedevoir/>, 
  },
   {
     path: "/EtudiantHome/:id",
     element: <EtudiantHome/>,
   },
   {
     path: "/ProfHome/:id",
     element: <ProfHome />,
   },
  {
    path: "/EtudiantHome/:id/:idmod",
    element: <ModulePage />,
  },
  {
    path: "/chargeCour/:id/:idmod",
    element: <ChCours />,
  },
  {
    path: "/chargeTd/:id/:idmod",
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




