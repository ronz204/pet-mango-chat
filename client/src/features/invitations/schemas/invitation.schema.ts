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

export interface EligibleUser {
  id: number;
  name: string;
  email: string;
}

export interface GetEligibleInviteesResponse {
  users: EligibleUser[];
}

export interface CreateInvitationBody {
  roomId: number;
  inviteeId: number;
}

export interface CreateInvitationResponse {
  success: boolean;
  invitationId: number;
}
