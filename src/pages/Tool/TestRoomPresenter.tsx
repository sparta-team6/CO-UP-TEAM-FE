/* eslint-disable @typescript-eslint/ban-types */
import * as React from "react";
import { Button, Input } from "antd";
import { content } from "./TestRoom";
import "antd/dist/antd.css";

type ChatPresenterProps = {
  messages: Array<content>;
  content: string;
  senderLoginId: string;
  setContent: Function;
  setSenderLoginId: Function;
  handleEnter: Function;
};

export const ChatPresenter = ({
  messages,
  content,
  senderLoginId,
  setContent,
  setSenderLoginId,
  handleEnter,
}: ChatPresenterProps) => {
  return (
    <div className="w-[300px] border">
      <div className="p-[5px] flex flex-row h-[30px] border-b">
        유저이름 :
        <Input
          style={{ flex: 1 }}
          value={senderLoginId}
          onChange={(e) => setSenderLoginId(e.target.value)}
        />
      </div>
      <div className="h-[400px]">
        {messages.map((content, index) => (
          <div key={index}>
            {" "}
            {content.senderLoginId} : {content.message}{" "}
          </div>
        ))}
      </div>
      <div>
        <Input.Search
          placeholder="input your messages..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onSearch={(value) => handleEnter(senderLoginId, value)}
          enterButton={"Enter"}
        />
      </div>
    </div>
  );
};
