import { createContext, useContext, useState } from "react";

export type FruitContextType = {
  fruits: string[];
  addFruit: (fruit: string) => void;
};

const FruitContext = createContext<FruitContextType>({
  fruits: [],
  addFruit: (_fruit: string) => {},
});

export default function FruitProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [fruits, setFruits] = useState<string[]>([]);

  const addFruit = (fruit: string) => {
    setFruits([...fruits, fruit]);
  };

  const contextValue: FruitContextType = {
    fruits,
    addFruit,
  };
  return (
    <FruitContext.Provider value={contextValue}>
      {children}
    </FruitContext.Provider>
  );
}

export function useFruitContext() {
  return useContext(FruitContext);
}
