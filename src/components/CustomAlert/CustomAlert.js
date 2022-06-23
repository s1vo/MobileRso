import React from "react";
import { Stack, Alert, IconButton, HStack, VStack, CloseIcon, Text, Center, NativeBaseProvider } from "native-base";


const CustomAlert = () => {
  const statusArray = [{
      status: "success",
      title: "Добро пожаловать"
    }];



  return <Center>
      <Stack space={3} w="100%" maxW="400">
        {statusArray.map(status => {
        return <Alert w="100%" status={status.status}>
              <VStack space={2} flexShrink={1} w="100%">
                <HStack flexShrink={1} space={2} justifyContent="space-between">
                  <HStack space={2} flexShrink={1}>
                    <Alert.Icon mt="1" />
                    <Text fontSize="md" color="coolGray.800">
                      {status.title}
                    </Text>
                  </HStack>
                  <IconButton variant="unstyled" _focus={{
                borderWidth: 0
              }} icon={<CloseIcon size="3" color="coolGray.600" />} />
                </HStack>
              </VStack>
            </Alert>;
      })}
      </Stack>
    </Center>;

    
}

export default CustomAlert;