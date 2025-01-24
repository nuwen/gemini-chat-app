import {useState} from "react";
import {
    Flex,
    Text,
    Button,
    Container,
    Box,
    TextField,
    Card,
} from "@radix-ui/themes";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ChatItem = {
    role: "user" | "model";
    parts: [{text: string}];
};

function App() {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [chatHistory, setChatHistory] = useState<ChatItem[]>([]);
    const [loading, setLoading] = useState(false);

    const getResponse = async () => {
        if (!value) {
            setError("Error: Enter a prompt");
        }
        setLoading(true);
        try {
            const options = {
                method: "POST",
                body: JSON.stringify({
                    history: chatHistory,
                    message: value,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const response = await fetch(
                "http://localhost:8000/gemini",
                options
            );
            const data = await response.text();
            console.log(data);

            setChatHistory((oldChatHistory) => [
                ...oldChatHistory,
                {
                    role: "user",
                    parts: [{text: value}],
                },
                {
                    role: "model",
                    parts: [{text: data}],
                },
            ]);
            setValue("");
        } catch (error) {
            console.error(error);
            setError("Error: Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

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
                                disabled={loading}
                                radius="full"
                                placeholder="Ask a question"
                                variant="soft"
                                size="3"
                                onChange={(e) => setValue(e.target.value)}
                                onKeyUp={(e) => {
                                    e.key === "Enter" && getResponse();
                                }}
                                value={value}
                            >
                                <TextField.Slot />
                                <TextField.Slot pr="0">
                                    <Button
                                        size="3"
                                        onClick={getResponse}
                                        loading={loading}
                                    >
                                        Let's go
                                    </Button>
                                </TextField.Slot>
                            </TextField.Root>
                        </Box>
                    </Flex>
                </Container>
            </Box>
            <Flex width="100vw" p="5" direction="column" gap="3">
                {[...chatHistory].reverse().map((chatItem, _index) => {
                    return (
                        <Flex
                            key={_index}
                            gap="2"
                            direction={
                                chatItem.role === "user" ? "row-reverse" : "row"
                            }
                        >
                            <Box flexShrink="0">
                                <Card variant="classic" size="2">
                                    <Flex
                                        gap="2"
                                        align="center"
                                        direction="column"
                                    >
                                        {chatItem.role === "user" ? "🐶" : "🤖"}

                                        <Box flexGrow="1">
                                            <Text
                                                as="div"
                                                size="2"
                                                weight="bold"
                                            >
                                                {chatItem.role === "user"
                                                    ? "User"
                                                    : "Jarvis"}
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Card>
                            </Box>
                            <Box
                                p="2"
                                style={
                                    chatItem.role === "model"
                                        ? {
                                              background: "var(--gray-a2)",
                                              borderRadius: "var(--radius-3)",
                                          }
                                        : undefined
                                }
                            >
                                <Text as="div" size="2" color="gray">
                                    {chatItem.parts.map((part) => (
                                        <Markdown remarkPlugins={[remarkGfm]}>
                                            {part.text}
                                        </Markdown>
                                    ))}
                                </Text>
                            </Box>
                        </Flex>
                    );
                })}
            </Flex>
        </Flex>
    );
}

export default App;
