// src/components/ChatApp.tsx
import React, { useState } from "react";
import { Input, Button, List } from "antd";
import { OpenAIApi, Configuration } from "openai";

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [inputValue, setInputValue] = useState("");

  const configuration = new Configuration({
    apiKey: "YOUR_API_KEY", // You'll get this after contacting via email
  });
  const openai = new OpenAIApi(configuration);

  const handleSend = async () => {
    const userMessage = { role: "user", content: inputValue };
    setMessages([...messages, userMessage]);

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [...messages, userMessage],
    });

    const aiMessage = {
      role: "assistant",
      content: response.data.choices[0].message.content,
    };
    setMessages([...messages, userMessage, aiMessage]);
    setInputValue("");
  };

  return (
    <div>
      <List
        dataSource={messages}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta description={item.content} />
          </List.Item>
        )}
      />
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onPressEnter={handleSend}
      />
      <Button onClick={handleSend}>Send</Button>
    </div>
  );
};

export default ChatApp;
