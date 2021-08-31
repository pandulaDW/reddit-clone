import React from "react";
import { Box } from "@chakra-ui/react";

interface Props {
  variant?: "small" | "regular";
}

const Wrapper: React.FC<Props> = ({ variant, children }) => {
  return (
    <Box
      maxW={variant === "regular" ? "800px" : "400px"}
      w="100%"
      mt={8}
      mx="auto"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
