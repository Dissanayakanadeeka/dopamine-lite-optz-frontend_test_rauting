"use client";

import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  useToast,
} from "@chakra-ui/react";

export const toaster = {
  success: (title: string, description?: string) => {
    const toast = useToast();
    toast({
      title,
      description,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  },
  error: (title: string, description?: string) => {
    const toast = useToast();
    toast({
      title,
      description,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  },
};

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster placement="bottom-end">
        {(toastProps) => (
          <Toast.Root width={{ md: "sm" }}>
            {toastProps.type === "loading" ? (
              <Spinner size="sm" color="blue.solid" />
            ) : (
              <Toast.Indicator />
            )}
            <Stack gap="1" flex="1" maxWidth="100%">
              {toastProps.title && <Toast.Title>{toastProps.title}</Toast.Title>}
              {toastProps.description && (
                <Toast.Description>{toastProps.description}</Toast.Description>
              )}
            </Stack>
            {toastProps.action && (
              <Toast.ActionTrigger>{toastProps.action.label}</Toast.ActionTrigger>
            )}
            {toastProps.meta?.closable && <Toast.CloseTrigger />}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  );
};
