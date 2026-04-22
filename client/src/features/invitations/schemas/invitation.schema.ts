export interface InvitationItem {
  id: number;
  status: string;
  createdAt: Date;
  room: {
    id: number;
    name: string;
  };
}

export interface GetMyInvitationsResponse {
  invitations: InvitationItem[];
}

export interface AcceptInvitationResponse {
  success: boolean;
  roomId: number;
}

export interface DeclineInvitationResponse {
  success: boolean;
  invitationId: number;
}
