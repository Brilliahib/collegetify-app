"use client"; // Tambahkan ini di bagian paling atas

import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import app from "@/lib/firebase/firebase";

interface Message {
  id: string;
  text: string;
  timestamp?: {
    seconds: number;
    nanoseconds: number;
  };
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    const firestore = getFirestore(app);
    const messagesCollection = collection(firestore, "message");
    const messagesQuery = query(
      messagesCollection,
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];
      setMessages(messagesData.reverse());
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (newMessage.trim() === "") {
      return;
    }

    try {
      const firestore = getFirestore(app);
      const messagesCollection = collection(firestore, "message");

      await addDoc(messagesCollection, {
        text: newMessage,
        timestamp: serverTimestamp(),
      });

      setNewMessage(""); // Clear input field after sending the message
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="mx-auto max-w-screen-lg px-4 sm:px-24 lg:px-8 mb-24">
      <section className="">
        <div className="heading mt-4">
          <h1 className="lg:text-3xl text-xl font-bold text-slate-900 text-center mb-4">
            Ceritakan Keluh Kesah Kuliahmu!
          </h1>
        </div>
        <div
          className="overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 200px)" }}
        >
          {messages.map((message) => {
            const date = message.timestamp
              ? new Date(message.timestamp.seconds * 1000)
              : null;
            return (
              <div
                key={message.id}
                className="card border border-gray-300 rounded p-4 bg-white text-gray-600 mb-4"
              >
                <p className="text-lg font-semibold text-slate-900 mb-2">
                  {message.text}
                </p>
                {date && (
                  <p className="text-xs text-gray-500">
                    {date.toLocaleString()}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <div className="w-full">
          <div className="relative bg-white">
            <div className="mb-4 fixed bottom-0 d-flex w-full justify-center">
              <div className="flex gap-4 w-full max-w-max lg:max-w-screen-lg h-full items-center">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="border rounded p-2 w-full"
                  placeholder="Type your message"
                />
                <button
                  onClick={sendMessage}
                  className="bg-slate-900 text-white rounded-lg p-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
