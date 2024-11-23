import { createBrowserRouter } from "react-router-dom";
import Home from "./screen/Home";
import StepTwo from "./screen/StepTwo";
import Final from "./screen/Final";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/steptwo",
    element: <StepTwo />,
  },
  {
    path:'/finishUp',
    element:<Final/>
  }
]);
