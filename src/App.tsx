import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Form } from "./Form"
import { Form2 } from "./Form2"
import { Readme } from "./Readme"

const router = createBrowserRouter([
  {
    index: true,
    path: "/",
    element: <Readme />,
  },
  {
    path: "/form",
    element: <Form />,
  },
  {
    path: "/form2",
    element: <Form2 />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />
}
