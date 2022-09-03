import { createContext } from "react";

interface IArtContextProps {
  headerViewSwitch: (bool: boolean) => void
}

const ArtContext = createContext({} as IArtContextProps)

export default ArtContext