import axios from 'axios';

// Walk fixture for nark launch-readiness verification 2026-06-09.
// Initial commit deliberately omitted error handling; this version applies
// the fix per the bot's handoff manifest.

export async function fetchExternalProfile(userId: number): Promise<unknown> {
  try {
    const response = await axios.get(`https://api.example.com/profiles/${userId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`fetchExternalProfile failed (status=${error.response?.status ?? 'network'}): ${error.message}`);
    }
    throw error;
  }
}

export async function pushExternalEvent(payload: object): Promise<void> {
  try {
    await axios.post('https://api.example.com/events', payload);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`pushExternalEvent failed (status=${error.response?.status ?? 'network'}): ${error.message}`);
    }
    throw error;
  }
}
