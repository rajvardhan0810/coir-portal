"use client";

import { useState } from "react";
import { sendOtp } from "@/services/auth.service";

export function useOtp() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [devOtp, setDevOtp] = useState("");

  async function requestOtp(mobileNumber: string) {
    setLoading(true);
    setMessage("");
    try {
      const response = await sendOtp(mobileNumber);
      setDevOtp(response.devOtp ?? "");
      setMessage(response.message);
    } finally {
      setLoading(false);
    }
  }

  return { loading, message, devOtp, requestOtp };
}
