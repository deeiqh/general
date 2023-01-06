import { PublishCommand } from "@aws-sdk/client-sns";
import { snsClient } from "./sns-client";

const params = {
  Message: "Hello",
  PhoneNumber: process.env.MY_PHONE_NUMBER,
};

export async function sendSMS(): Promise<void> {
  try {
    const data = await snsClient.send(new PublishCommand(params));
  } catch (error) {
    console.log(error);
  }
}