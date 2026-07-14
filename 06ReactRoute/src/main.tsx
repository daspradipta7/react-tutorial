import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router'
import About from './components/About.tsx'
import Contactus from './components/Contactus.tsx'
import Home from './components/Home.tsx'
import { RouterProvider } from 'react-router/dom'
import App from './App.tsx'
import GitHub from './components/GitHub.tsx'

/*   const router = createBrowserRouter([
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/contact-us",
        element: <Contactus />
      }
    ]) */

      const routes = createRoutesFromElements(
        <>
        <Route path="/" element={<App />} >
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<Contactus />} />
          <Route path="/github/:username" element={<GitHub username="daspradipta7" />} />
         </Route>
        </>
      )

      const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
