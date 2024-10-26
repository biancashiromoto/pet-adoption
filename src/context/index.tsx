import { createContext } from "react";
import { ContextProps } from "./index.types";

export const Context = createContext<ContextProps>({} as ContextProps);
