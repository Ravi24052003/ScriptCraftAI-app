import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {store} from "./app/store.js"
import { Provider } from 'react-redux'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromChildren } from 'react-router-dom'
import Login from "./features/login/Login.jsx"
import Signup from "./features/signup/Signup.jsx"
import ErrorPage from "./ErrorPage.jsx"
import CreateScript from './features/script/CreateScript.jsx'
import Dashboard from './features/script/Dashboard.jsx'
import ViewScript from './features/script/ViewScript.jsx'
import EditScript from "./features/script/EditScript.jsx"


const router = createBrowserRouter(
  createRoutesFromChildren(
   <Route path='/' element={<App />} errorElement={<ErrorPage />}>
   <Route path='' element={<Login />}/>
   <Route path='signup' element={<Signup />} />
   <Route path='create-script' element={<CreateScript />} />
   <Route path='dashboard' element={<Dashboard />} />
   <Route path='view-script' element={<ViewScript />} />
   <Route path='edit-script' element={<EditScript />} />
   </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
