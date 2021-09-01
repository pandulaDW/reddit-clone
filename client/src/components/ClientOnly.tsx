import React, { useEffect, useState } from "react";

const ClientOnly: React.FC = (props) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return <React.Fragment>{props.children}</React.Fragment>;
};

export default ClientOnly;
