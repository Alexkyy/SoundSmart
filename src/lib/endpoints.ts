import { api } from "./api";

export const getHealth   = () => api.get("/health");
export const getPerks    = () => api.get("/perks");
export const getAlerts   = () => api.get("/alerts");
export const getInsights = () => api.get("/insights");

export const getSoundScore = (memberId: string) =>
  api.get(`/members/${memberId}/soundscore`);
