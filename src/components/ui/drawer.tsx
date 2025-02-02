import {
  Drawer as ChakraDrawer,
  DrawerContent as ChakraDrawerContent,
  DrawerHeader as ChakraDrawerHeader,
  DrawerBody as ChakraDrawerBody,
  DrawerFooter as ChakraDrawerFooter,
  DrawerOverlay as ChakraDrawerOverlay,
  Button,
  Portal,
} from "@chakra-ui/react";
import * as React from "react";
import { CloseButton } from "./close-button";

interface DrawerContentProps extends React.ComponentProps<typeof ChakraDrawerContent> {
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement>;
  offset?: React.CSSProperties["padding"];
}

export const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  function DrawerContent(props, ref) {
    const { children, portalled = true, portalRef, offset, ...rest } = props;
    return (
      <Portal disabled={!portalled} container={portalRef}>
        <ChakraDrawerContent ref={ref} {...rest}>
          {children}
        </ChakraDrawerContent>
      </Portal>
    );
  }
);

export const DrawerTrigger = Button;
export const DrawerRoot = ChakraDrawer;
export const DrawerFooter = ChakraDrawerFooter;
export const DrawerHeader = ChakraDrawerHeader;
export const DrawerBody = ChakraDrawerBody;
export const DrawerBackdrop = ChakraDrawerOverlay;

export const DrawerCloseTrigger = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  function DrawerCloseTrigger(props, ref) {
    return (
      <Button position="absolute" top="2" right="2" {...props} ref={ref}>
        <CloseButton size="sm" />
      </Button>
    );
  }
);