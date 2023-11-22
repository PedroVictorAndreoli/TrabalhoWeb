import { BaseRoutes } from "@/routes/BaseRoutes";
import { ChakraProvider } from "@chakra-ui/react";
import './App.css'
export function App() {
  return (
    <>
      <ChakraProvider>
        <BaseRoutes />
      </ChakraProvider>
    </>
  );
}