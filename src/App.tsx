import {useState} from "react";
import {
    Flex,
    Text,
    Button,
    Container,
    Box,
    TextField,
    Card,
    Avatar,
} from "@radix-ui/themes";

function App() {
    const [count, setCount] = useState(0);

    return (
        <Flex
            height="100vh"
            // justify='center'
            align="center"
            direction="column"
            gap="5"
            pt="5"
        >
            <Box
                style={{
                    background: "var(--gray-a2)",
                    borderRadius: "var(--radius-3)",
                }}
            >
                <Container size="4" p="5" minWidth="75vw">
                    <Flex
                        direction="row"
                        gap="2"
                        align="center"
                        justify="center"
                    >
                        <Box width="100%">
                            <TextField.Root
                                radius="full"
                                placeholder="Ask a question"
                                variant="soft"
                                size="3"
                            >
                                <TextField.Slot />
                                <TextField.Slot pr='0'>
                                    <Button size='3'>Let's go</Button>
                                </TextField.Slot>
                            </TextField.Root>
                        </Box>
                    </Flex>
                </Container>
            </Box>
            <Flex width="100vw" p="5" direction="column" gap="3">
                <Flex gap="2">
                    <Box flexShrink="0">
                        <Card variant="classic" size="2">
                            <Flex gap="2" align="center" direction="column">
                                <Avatar
                                    size="3"
                                    src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                                    radius="full"
                                    fallback="T"
                                />
                                <Box>
                                    <Text as="div" size="2" weight="bold">
                                        Jarvis
                                    </Text>
                                </Box>
                            </Flex>
                        </Card>
                    </Box>
                    <Box p="2">
                        <Text as="div" size="2" color="gray">
                            Sed aliquet lacus nunc, quis pulvinar nulla
                            ultricies in. Vestibulum sed odio scelerisque,
                            iaculis nunc eget, rhoncus risus. Donec pellentesque
                            pellentesque est et sodales. Etiam ac ornare lorem.
                            Suspendisse malesuada suscipit eros, at commodo
                            neque.
                        </Text>
                    </Box>
                </Flex>
                <Flex gap="2" direction="row-reverse">
                    <Box flexShrink="0">
                        <Card variant="classic" size="2">
                            <Flex gap="2" align="center" direction="column">
                                <Avatar
                                    size="3"
                                    src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                                    radius="full"
                                    fallback="T"
                                />
                                <Box>
                                    <Text as="div" size="2" weight="bold">
                                        Jarvis
                                    </Text>
                                </Box>
                            </Flex>
                        </Card>
                    </Box>
                    <Box
                        p="2"
                        style={{
                            background: "var(--gray-a2)",
                            borderRadius: "var(--radius-3)",
                        }}
                    >
                        <Text as="div" size="2" color="gray">
                            Sed aliquet lacus nunc, quis pulvinar nulla
                            ultricies in. Vestibulum sed odio scelerisque,
                            iaculis nunc eget, rhoncus risus. Donec pellentesque
                            pellentesque est et sodales. Etiam ac ornare lorem.
                            Suspendisse malesuada suscipit eros, at commodo
                            neque.
                        </Text>
                    </Box>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default App;
