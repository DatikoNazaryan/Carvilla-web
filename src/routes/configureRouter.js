import { createBrowserRouter } from 'react-router-dom';

import Welcome from 'components/common/Welcome/Welcome';
import Login from 'components/features/Login/Login';
import SignUp from 'components/features/SignUp/SignUp';
import Profile from 'components/features/Profile/Profile';
import NotFound from 'components/common/NotFound/NotFound';
import Cars from 'components/features/Cars/Cars';
import Feed from 'components/features/Feed/Feed';

import { PublicRouterLayout } from 'RouterLayouts/PublicRouteLayout';
import { ProutectedRouterLayout } from 'RouterLayouts/ProtectedRouteLayout';


function configureRouter () {
  const router = createBrowserRouter([
    {
        element: <PublicRouterLayout />,
        children: [
          {
            path: "/",
            element: <Welcome/>
          },
          {
            path: "/login",
            element: <Login/>
          },
          {
            path: "/signup",
            element: <SignUp/>
          }
        ]
    },
    {
      element: <ProutectedRouterLayout />,
      children: [
        {
          path: "/feed",
          element: <Feed />
        },
        {
          path: "/profile",
          element: <Profile />,
          children: [
            {
              path: ":userId",
              element:  <Cars />
            }
          ]
        }
      ]   
    },
    {
      path: '*',
      element: <NotFound />
    }
  ]);

    return router;
}

export default configureRouter;
