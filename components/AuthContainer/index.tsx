import React from "react";

import useLoggedInUser from "../../state/loggedInUser";
import { useAuthSubscription } from "../../effects";

import LoadingSpinner from "../LoadingSpinner";
import Login from "./Login";

export function AuthContainer({ children }) {
  const [loggedInUser] = useLoggedInUser();
  useAuthSubscription();

  if (loggedInUser === null) {
    return <LoadingSpinner />;
  }

  if (loggedInUser === false) {
    return <Login />;
  }

  return <>{children}</>;
}

export default function withAuthContainer(Component) {
  const componentName = Component.name;

  const ComponentWithAuthContainer = ({ children, ...props }) => {
    return (
      <AuthContainer>
        <Component {...props}>{children}</Component>
      </AuthContainer>
    );
  };

  ComponentWithAuthContainer.displayName = `withAuthContainer(${componentName})`;

  return ComponentWithAuthContainer;
}
