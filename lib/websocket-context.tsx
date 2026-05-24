"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

export type ConnectionStatus = "disconnected" | "connecting" | "connected" | "error"

type WebSocketMessage = {
  type: string
  data: unknown
}

interface WebSocketContextType {
  status: ConnectionStatus
  lastMessage: WebSocketMessage | null
  sendMessage: (message: unknown) => void
  connect: () => void
  disconnect: () => void
}

const WebSocketContext = createContext<WebSocketContextType | null>(null)

export function useWebSocket() {
  const context = useContext(WebSocketContext)
  if (!context) {
    throw new Error("useWebSocket must be used within WebSocketProvider")
  }
  return context
}

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<ConnectionStatus>("disconnected")
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null)

  const connect = useCallback(() => {
    // Simulated WebSocket connection for demo purposes
    // In production, this would connect to ESP32 WebSocket server
    console.log("[v0] Simulating WebSocket connection to hexapod...")
    setStatus("connecting")

    setTimeout(() => {
      setStatus("connected")
      console.log("[v0] WebSocket connected (simulated)")
    }, 1000)
  }, [])

  const disconnect = useCallback(() => {
    setStatus("disconnected")
    console.log("[v0] WebSocket disconnected")
  }, [])

  const sendMessage = useCallback(
    (message: unknown) => {
      if (status === "connected") {
        console.log("[v0] Sending message:", message)
        // Simulate response
        setTimeout(() => {
          setLastMessage({ type: "response", data: message })
        }, 100)
      } else {
        console.warn("[v0] Cannot send message: not connected")
      }
    },
    [status],
  )

  return (
    <WebSocketContext.Provider value={{ status, lastMessage, sendMessage, connect, disconnect }}>
      {children}
    </WebSocketContext.Provider>
  )
}
