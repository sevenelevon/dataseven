import api from "./axios";

const sendMessage = async (email, phone, message) => {
  const botApiKey = "5997392690:AAGHgSnxz4hDYV470Y6pDOawbtCZuiwfPUE";
  const chatId = "-1001843161056";
  const text = `Phone :  ${phone}\nEmail :  ${email}\nMessage :  ${message}`;
  const url = `https://api.telegram.org/bot${botApiKey}/sendMessage?chat_id=${chatId}`;
  const data = {
    text: text
  };

  try {
    const response = await api.post(url, data);
    console.log("Status 200");
  } catch (error) {
    console.error(error);
  }
};
export default sendMessage;
