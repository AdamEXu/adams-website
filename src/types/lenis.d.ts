declare module "lenis/react" {
  import { ReactNode } from "react";
  import Lenis from "@studio-freight/lenis";

  export interface ReactLenisProps {
    root?: boolean;
    options?: any;
    children: ReactNode;
  }

  export function ReactLenis(props: ReactLenisProps): JSX.Element;
  export function useLenis(callback?: (lenis: Lenis) => void): void;
}
