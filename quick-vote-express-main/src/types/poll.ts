
export type PollOption = {
  id: string;
  text: string;
  votes: number;
};

export type PollSettings = {
  allowMultipleSelections: boolean;
  requireParticipantNames: boolean;
  votingSecurity: "ip" | "session";
  expiresIn: "1hour" | "1day" | "1week" | null;
};

export type Poll = {
  id: string;
  question: string;
  options: PollOption[];
  settings: PollSettings;
  createdAt: Date;
  isPublic: boolean;
  totalVotes: number;
  expiresAt: Date | null;
  isExpired?: boolean;
};

